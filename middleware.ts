import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("auth_token")?.value; // Obtener token de autenticación

    // Rutas que queremos proteger
    const protectedRoutes = ["/simulator",];

    // Si el usuario intenta acceder a una ruta protegida sin estar autenticado
    if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
        return NextResponse.redirect(new URL("/", req.url)); // Redirigir a login
    }

    return NextResponse.next(); // Permitir la navegación si está autenticado
}

// Configurar para qué rutas se aplica el middleware
export const config = {
    matcher: ["/simulator",], // Solo afecta estas rutas
};