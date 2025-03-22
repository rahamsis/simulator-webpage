import { NextResponse } from "next/server";
import connection from "@/app/lib/connection"; // Asegúrate de que el path sea correcto
import { RowDataPacket } from "mysql2";
import { fetchActiveSession } from "@/app/lib/data";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const sessionToken = url.searchParams.get("sessionToken");

    if (!sessionToken) return NextResponse.json({ error: "No session token" }, { status: 401 });

    try {
        // const [rows] = await connection.query<RowDataPacket[]>(
        //     "SELECT * FROM sessions WHERE sessionToken = ?",
        //     [sessionToken]
        // );
        const [rows] = await fetchActiveSession(sessionToken as string)

        if (rows.length === 0) {
            return NextResponse.json({ active: false }, { status: 401 });
        }

        return NextResponse.json({ active: true });
    } catch (error) {
        console.error("Error al obtener la sesión:", error);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}
