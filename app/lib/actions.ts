'use server';

import { z } from 'zod';
import connection from './connection';
import bcrypt from "bcryptjs";
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

    try {

        const [existUser] = await connection.query<any[]>(`SELECT userId FROM users WHERE email = ?`, [email]);

        if (existUser.length > 0) {
            return { message: "El email ya está en uso." };
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await connection.query(`
        INSERT INTO users (userId, name, email, password)
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
    }

    // redirect('/login');
}


export async function getQuestion(idTema: string) {
    try {
        const [questions] = await connection.query<User[]>(`SELECT p.idPregunta AS id, p.pregunta AS question, 
            GROUP_CONCAT(CONCAT(a.idAlternativa,"-", a.alternativa) ORDER BY a.idAlternativa SEPARATOR '||') AS options, 
            (SELECT a2.idAlternativa 
                FROM alternativas a2 
                WHERE a2.idPregunta = p.idPregunta AND a2.respuesta = 1 LIMIT 1
            ) AS correctAnswer 
            FROM preguntas p 
            INNER JOIN alternativas a ON a.idPregunta = p.idPregunta 
            WHERE p.idTema = ?
            GROUP BY p.idPregunta`,[idTema]);

        // return questions[0] || null;
        return questions.map(row => ({
            id: row.id,
            question: row.question,
            options: row.options.split("||"), // Convertir string a array
            correctAnswer: row.correctAnswer
        }));
    

    } catch (error) {
        console.error("Error al obtener las preguntas: ", error);
        throw new Error("Error al obtener las preguntas");
    }
}

export async function getTemas() {
    try {
        const [temas] = await connection.query<User[]>(`SELECT * FROM temas`);

        // return questions[0] || null;
        return temas.map(row => ({
            idTema: row.idTema,
            tema: row.tema,
        }));
    

    } catch (error) {
        console.error("Error al obtener las preguntas: ", error);
        throw new Error("Error al obtener las preguntas");
    }
}

// export async function getQuestionSimulacro() {
//     try {
//         // Genera un "seed" aleatorio para evitar que los mismos 10 siempre aparezcan juntos
//         const randomSeed = Math.floor(Math.random() * 1000); 

//         const [questions] = await connection.query<User[]>(`
//             SELECT p.idPregunta AS id, p.pregunta AS question, 
//             GROUP_CONCAT(CONCAT(a.idAlternativa, "-", a.alternativa) ORDER BY a.idAlternativa SEPARATOR '||') AS options, 
//             (SELECT a2.idAlternativa 
//                 FROM alternativas a2 
//                 WHERE a2.idPregunta = p.idPregunta AND a2.respuesta = 1 LIMIT 1
//             ) AS correctAnswer 
//             FROM preguntas p 
//             INNER JOIN alternativas a ON a.idPregunta = p.idPregunta
//             GROUP BY p.idPregunta
//             ORDER BY RAND(${randomSeed})
//             LIMIT 10
//         `);

//         return questions.map(row => ({
//             id: row.id,
//             question: row.question,
//             options: row.options.split("||"), // Convertir string a array
//             correctAnswer: row.correctAnswer
//         }));

//     } catch (error) {
//         console.error("Error al obtener las preguntas: ", error);
//         throw new Error("Error al obtener las preguntas");
//     }
// }

export async function getQuestionSimulacro() {
    try {
        // Obtener 10 preguntas aleatorias de manera eficiente
        const [randomQuestions] = await connection.query<any[]>(`
            SELECT idPregunta FROM preguntas ORDER BY RAND() LIMIT 10;
        `);

        const questionIds = randomQuestions.map((q: { idPregunta: string }) => q.idPregunta);

        // Traer los detalles de esas preguntas y sus respuestas
        const [questions] = await connection.query<User[]>(`
            SELECT p.idPregunta AS id, p.pregunta AS question, 
            GROUP_CONCAT(CONCAT(a.idAlternativa, "-", a.alternativa) ORDER BY a.idAlternativa SEPARATOR '||') AS options, 
            (SELECT a2.idAlternativa 
                FROM alternativas a2 
                WHERE a2.idPregunta = p.idPregunta AND a2.respuesta = 1 LIMIT 1
            ) AS correctAnswer 
            FROM preguntas p 
            INNER JOIN alternativas a ON a.idPregunta = p.idPregunta
            WHERE p.idPregunta IN (?)
            GROUP BY p.idPregunta
        `, [questionIds]);

        return questions.map(row => ({
            id: row.id,
            question: row.question,
            options: row.options.split("||"), // Convertir string a array
            correctAnswer: row.correctAnswer
        }));

    } catch (error) {
        console.error("Error al obtener las preguntas: ", error);
        throw new Error("Error al obtener las preguntas");
    }
}
