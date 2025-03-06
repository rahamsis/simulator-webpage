import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) return NextResponse.redirect(new URL("/", req.url));

    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/session?sessionToken=${token.sessionToken}`);
        const data = await res.json();

        if (!data.active) {
            return NextResponse.redirect(new URL("/", req.url));
        }

    } catch (error) {
        console.error("Error en el middleware:", error);
        return NextResponse.redirect(new URL("/error", req.url));
    }

    return NextResponse.next();
}

export const config = {
    runtime: "nodejs",
    matcher: ['/main', '/simulator', '/cursos', '/practica', '/generador', '/simulacro', '/examenes', '/libros'],
};
