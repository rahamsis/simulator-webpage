'use server';

import { z } from 'zod';
import connection from './data';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { redirect } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { User } from './definitions';

export async function createAccount(prevState: {
    errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
    };
    message?: string | null;
}, formData: FormData) {

    const schema = z.object({
        username: z.string().trim().min(4, 'Nombre de usuario es requerido'),
        email: z.string().trim().email().min(1, 'Email es requerido.'),
        password: z.string().trim().min(6, 'Password es requerido')
    })

    const validatedFields = schema.safeParse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
    })


    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    type Form = z.infer<typeof schema>;

    const { username, email, password }: Form = validatedFields.data;

    let sql = null;
    try {
        sql = await connection();

        const [existUser] = await sql.query<any[]>(`SELECT id FROM users WHERE email = ?`, [email]);

        if (existUser.length > 0) {
            return { message: "El email ya está en uso." };
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await sql.query(`
        INSERT INTO users (id, name, email, password)
        VALUES (?,?,?,?)
    `, [
            uuidv4(),
            username,
            email,
            hashedPassword
        ]);
    } catch (error: unknown) {
        return {
            message: (error as any).sqlMessage || 'Database Error: Fallo al crear el usuario - createAccount().',
        }
    } finally {
        sql?.end()
    }

    // redirect('/login');
}

// export async function loginAccount(prevState: {
//     errors?: {
//         email?: string[];
//         password?: string[];
//     };
//     message?: string | null;
// }, formData: FormData) {

//     const schema = z.object({
//         email: z.string().trim().email().min(1, 'Email es requerido.'),
//         password: z.string().trim().min(6, 'Password es requerido')
//     })

//     const validatedFields = schema.safeParse({
//         email: formData.get('email'),
//         password: formData.get('password'),
//     })

//     if (!validatedFields.success) {
//         return {
//             errors: validatedFields.error.flatten().fieldErrors,
//         };
//     }

//     type Form = z.infer<typeof schema>;

//     const { email, password }: Form = validatedFields.data;

//     let sql = null;
//     try {

//         // await new Promise((resolve) => setTimeout(resolve, 5000));
//         // await signIn("Credentials", {
//         //   email: email,
//         //   password: password,
//         //   callbackUrl: "/dashboard",
//         //   redirect: true,
//         // });
//         sql = await connection();

//         const [user] = await sql.query<User[]>(`SELECT * FROM users WHERE email=?`, [email]);

//         if (user.length === 0) {
//             // user[0].message = 'El email no es válido.';
//             // return user[0];
//             return { message: 'El email no es válido.' };
//         }

//         const passwordsMatch = await bcrypt.compare(password, user[0].password);
//         if (!passwordsMatch) {
//             // user[0].message = 'tu contraseña no es válida.';
//             // return user[0];
//             return { message: 'tu contraseña no es válida.' };
//         }

//         return user[0] ;

//     } catch (error) {
//         return {
//             message: (error as any).sqlMessage || 'Database Error: Fallo al validar las credenciales - loginAccount().',
//         }
//         // throw new Error((error as any).sqlMessage || (error as any).message || 'Database Error');
//     } finally {
//         sql?.end()
//     }
// }