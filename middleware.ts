import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const { pathname } = req.nextUrl;

    // Allow the requests if the following is true...
    // 1) It's a request for next-auth session & provider fetching
    // 2) the token exists
    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    // Redirect them to login if they don't have token AND are requesting a protected route
    if (!token && pathname !== '/') {
        const url = req.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: ['/simulator', '/practica'],
};