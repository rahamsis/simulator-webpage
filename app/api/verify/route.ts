import { NextApiRequest, NextApiResponse } from 'next';
import { fetchActiveSession } from '@/app/lib/data';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ message: "Token inválido" });
    }

    const user = await fetchActiveSession(token as string);

    if (!user || user.length === 0) {
        return res.status(400).json({ message: "Token no válido o expirado." });
    }

    res.redirect('/login?verified=true'); // Redirige a login después de verificar
}
