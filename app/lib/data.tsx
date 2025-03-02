
import mysql, { Connection } from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';
import { User } from './definitions';
import bcrypt from "bcryptjs";
import connection from './connection';

export async function getUser(email: string, password: string): Promise<User> {
    try {
        const [user] = await connection.query<User[]>(`SELECT u.*, s.userIp, s.userDevice
            FROM users u
            LEFT JOIN sessions s ON s.userId = u.userId
            WHERE u.email=?`, [email]);

        if (user.length === 0) {
            throw new Error('El email no es válido.');
        }

        const passwordsMatch = await bcrypt.compare(password, user[0].password);
        if (!passwordsMatch) {
            throw new Error('tu contraseña no es válida.');
        }

        return user[0];
    } catch (error) {
        throw error;
    }
}

export async function createSession(userId: string, userDevice: string, userIp: string, sessionToken: string, sessionExpires: Date) {
    try {

        await connection.query<User[]>(`DELETE FROM sessions WHERE userId = ?`, [userId]);

        const sessionId = uuidv4();
        await connection.query<User[]>(`INSERT INTO sessions (sessionId, userId, userDevice, userIp, sessionToken, sessionExpires, createdAt) 
            VALUES (?, ?, ?, ?, ?, ?, NOW())`,
            [sessionId, userId, userDevice, userIp, sessionToken, sessionExpires]);

        return sessionId;
    } catch (error) {
        console.error("Error al crear sesión: ", error);
        throw new Error("Error al crear la sesión");
    }
}

export async function getActiveSession(sessionToken: string) {
    try {

        const [session] = await connection.query<User[]>(`SELECT * FROM sessions 
            WHERE sessionToken = ? AND sessionExpires > NOW()
            ORDER BY createdAt DESC LIMIT 1`
            , [sessionToken]);

        return session[0] || null;
    } catch (error) {
        console.error("Error al obtener la sesión: ", error);
        throw new Error("Error al obtener la sesión");
    }
}