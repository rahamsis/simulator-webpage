import mysql, { Connection } from 'mysql2/promise';
import { User } from './definitions';
import bcrypt from 'bcrypt';

// Create the connection to database
export default async function connection(): Promise<Connection> {
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: 'root',
        database: 'desarrollo',
        port: Number(process.env.MYSQL_PORT),
    });
    return connection;
}

//consultas a la base de datos
export async function getUser(email: string, password: string): Promise<User> {

    let sql = null;
    try {
        sql = await connection();
        const [user] = await sql.query<User[]>(`SELECT * FROM users WHERE email=?`, [email]);

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
    } finally {
        sql?.end()
    }
}