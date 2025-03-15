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
            GROUP BY p.idPregunta`, [idTema]);

        // return questions[0] || null;
        return questions.map(row => ({
            id: row.id,
            question: row.question,
            options: row.options.split("||"), // Convertir string a array
            correctAnswer: row.correctAnswer
        }));


    } catch (error) {
        console.error("Error al obtener las preguntas (getQuestion): ", error);
        throw new Error("Error al obtener las preguntas (getQuestion)");
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

export async function getQuestionRamdonWithLimit(limite: number) {
    try {
        let questionIds
        if (limite === 100 || limite === 50) {
            const temas = [
                { idTema: 'T00001', limit: (limite === 100) ? 8 : 4 },
                { idTema: 'T00002', limit: (limite === 100) ? 4 : 2 },
                { idTema: 'T00003', limit: (limite === 100) ? 8 : 4 },
                { idTema: 'T00004', limit: (limite === 100) ? 8 : 4 },
                { idTema: 'T00005', limit: (limite === 100) ? 6 : 3 },
                { idTema: 'T00006', limit: (limite === 100) ? 3 : 2 },
                { idTema: 'T00007', limit: (limite === 100) ? 8 : 4 },
                { idTema: 'T00008', limit: (limite === 100) ? 3 : 2 },
                { idTema: 'T00009', limit: (limite === 100) ? 4 : 2 },
                { idTema: 'T00010', limit: (limite === 100) ? 4 : 2 },
                { idTema: 'T00011', limit: (limite === 100) ? 3 : 2 },
                { idTema: 'T00012', limit: (limite === 100) ? 3 : 2 },
                { idTema: 'T00013', limit: (limite === 100) ? 12 : 5 },
                { idTema: 'T00014', limit: (limite === 100) ? 14 : 6 },
                { idTema: 'T00015', limit: (limite === 100) ? 2 : 1 },
                { idTema: 'T00016', limit: (limite === 100) ? 3 : 2 },
                { idTema: 'T00017', limit: (limite === 100) ? 5 : 2 },
                { idTema: 'T00018', limit: (limite === 100) ? 2 : 1 },
            ];

            // Ejecutar todas las consultas en paralelo
            const queries = temas.map(({ idTema, limit }) =>
                connection.query<any[]>(`SELECT idPregunta FROM preguntas WHERE idTema = ? 
                    ORDER BY RAND() LIMIT ?`, [idTema, limit])
            );

            // Esperar a que todas las consultas terminen
            const results = await Promise.all(queries);

            // Extraer los IDs de todas las preguntas seleccionadas
            questionIds = results.flatMap(([rows]) =>
                rows.map((q: { idPregunta: string }) => q.idPregunta));
        } else {
            // Obtener preguntas aleatorias de manera eficiente, según la cantidad solicitada
            const [randomQuestions] = await connection.query<any[]>(`
            SELECT idPregunta FROM preguntas ORDER BY RAND() LIMIT ?;
        `, [limite]);

            questionIds = randomQuestions.map((q: { idPregunta: string }) => q.idPregunta);
        }

        // Traer los detalles de esas preguntas y sus respuestas
        const [questions] = await connection.query<User[]>(`
            SELECT p.idPregunta AS id, p.pregunta AS question, p.idTema, t.tema,
            GROUP_CONCAT(CONCAT(a.idAlternativa, "-", a.alternativa) ORDER BY a.idAlternativa SEPARATOR '||') AS options, 
            (SELECT a2.idAlternativa 
                FROM alternativas a2 
                WHERE a2.idPregunta = p.idPregunta AND a2.respuesta = 1 LIMIT 1
            ) AS correctAnswer 
            FROM preguntas p 
            INNER JOIN alternativas a ON a.idPregunta = p.idPregunta
            INNER JOIN temas t ON t.idTema = p.idTema
            WHERE p.idPregunta IN (?)
            GROUP BY p.idPregunta
            ORDER BY p.idTema
        `, [questionIds]);

        return questions.map(row => ({
            id: row.id,
            question: row.question,
            tema: row.tema,
            options: row.options.split("||"), // Convertir string a array
            correctAnswer: row.correctAnswer
        }));
    } catch (error) {
        console.error("Error al obtener las preguntas (getQuestionRamdonWithLimit): ", error);
        throw new Error("Error al obtener las preguntas (getQuestionRamdonWithLimit");
    }
}

export async function getQuestionSiecopol(limite: number) {
    try {
        const temas = [
            { idTema: 'T00001', limit: (limite === 100) ? 8 : 4 },
            { idTema: 'T00002', limit: (limite === 100) ? 4 : 2 },
            { idTema: 'T00003', limit: (limite === 100) ? 8 : 4 },
            { idTema: 'T00004', limit: (limite === 100) ? 8 : 4 },
            { idTema: 'T00005', limit: (limite === 100) ? 6 : 3 },
            { idTema: 'T00006', limit: (limite === 100) ? 3 : 2 },
            { idTema: 'T00007', limit: (limite === 100) ? 8 : 4 },
            { idTema: 'T00008', limit: (limite === 100) ? 3 : 2 },
            { idTema: 'T00009', limit: (limite === 100) ? 4 : 2 },
            { idTema: 'T00010', limit: (limite === 100) ? 4 : 2 },
            { idTema: 'T00011', limit: (limite === 100) ? 3 : 2 },
            { idTema: 'T00012', limit: (limite === 100) ? 3 : 2 },
            { idTema: 'T00013', limit: (limite === 100) ? 12 : 5 },
            { idTema: 'T00014', limit: (limite === 100) ? 14 : 6 },
            { idTema: 'T00015', limit: (limite === 100) ? 2 : 1 },
            { idTema: 'T00016', limit: (limite === 100) ? 3 : 2 },
            { idTema: 'T00017', limit: (limite === 100) ? 5 : 2 },
            { idTema: 'T00018', limit: (limite === 100) ? 2 : 1 },
        ];

        // Ejecutar todas las consultas en paralelo
        const queries = temas.map(({ idTema, limit }) =>
            connection.query<any[]>(`SELECT idPregunta FROM preguntas WHERE idTema = ? 
                ORDER BY RAND() LIMIT ?`, [idTema, limit])
        );

        // Esperar a que todas las consultas terminen
        const results = await Promise.all(queries);

        // Extraer los IDs de todas las preguntas seleccionadas
        const questionIds = results.flatMap(([rows]) =>
            rows.map((q: { idPregunta: string }) => q.idPregunta));

        // Traer los detalles de esas preguntas y sus respuestas
        const [questions] = await connection.query<User[]>(`
            SELECT p.idPregunta AS id, p.pregunta AS question, p.idTema, t.tema,
            GROUP_CONCAT(CONCAT(a.idAlternativa, "-", a.alternativa) ORDER BY a.idAlternativa SEPARATOR '||') AS options, 
            (SELECT a2.idAlternativa 
                FROM alternativas a2 
                WHERE a2.idPregunta = p.idPregunta AND a2.respuesta = 1 LIMIT 1
            ) AS correctAnswer 
            FROM preguntas p 
            INNER JOIN alternativas a ON a.idPregunta = p.idPregunta
            INNER JOIN temas t ON t.idTema = p.idTema
            WHERE p.idPregunta IN (?)
            GROUP BY p.idPregunta
            ORDER BY  p.idTema`, [questionIds]);

        return questions.map(row => ({
            id: row.id,
            question: row.question,
            tema: row.tema,
            options: row.options.split("||"), // Convertir string a array
            correctAnswer: row.correctAnswer
        }));
    } catch (error) {
        console.error("Error al obtener las preguntas (getQuestionSiecopol): ", error);
        throw new Error("Error al obtener las preguntas (getQuestionSiecopol");
    }
}

export async function getTableExams() {
    try {
        const [questions] = await connection.query<User[]>(`
            SELECT * from examenes
        `, []);

        return questions.map(row => ({
            id: row.idExamen,
            titulo: row.titulo,
            descripcion: row.descripcion
        }));

    } catch (error) {
        console.error("Error al obtener los examenes (getTableExams): ", error);
        throw new Error("Error al obtener los examenes (getTableExams)");
    }
}

export async function validatePersonByCipAndDni(email: any, cip: string, dni: string) {
    try {
        if (email === null || email === undefined) {
            return false
        }

        const [person] = await connection.query<User[]>(`
            SELECT * FROM users WHERE email = ? AND cip = ? AND dni = ?
        `, [email, cip, dni]);

        if (person.length === 0) {
            return false;
        }

        return person.map(row => ({
            userId: row.userId,
        }));

    } catch (error) {
        console.error("Error al validar persona por CIP y DNI: ", error);
        throw new Error("Error al validar persona por CIP y DNI (validatePersonByCipAndDni)");
    }
}

export async function getQuestionSiecopolWhitOffset(index: number) {
    try {
        const temas = [
            { idTema: 'T00001', limit: 9, offset: 9 * index },
            { idTema: 'T00002', limit: 5, offset: 5 * index },
            { idTema: 'T00003', limit: 9, offset: 9 * index },
            { idTema: 'T00004', limit: 10, offset: 10 * index },
            { idTema: 'T00005', limit: 6, offset: 6 * index },
            { idTema: 'T00006', limit: 2, offset: 2 * index },
            index === 24 ? { idTema: 'T00007', limit: 12, offset: (10 * index) }
                : index >= 25 ? { idTema: 'T00007', limit: 12, offset: (10 * index) + 2 }
                    : { idTema: 'T00007', limit: 10, offset: 10 * index },
            { idTema: 'T00008', limit: 5, offset: 5 * index },
            { idTema: 'T00009', limit: 6, offset: 6 * index },
            { idTema: 'T00010', limit: 14, offset: 14 * index },
            { idTema: 'T00011', limit: 3, offset: 3 * index },
            { idTema: 'T00012', limit: 5, offset: 5 * index },
            { idTema: 'T00013', limit: 4, offset: 4 * index },
            index === 24 ? { idTema: 'T00014', limit: 17, offset: (2 * index) }
                : index >= 25 ? { idTema: 'T00014', limit: 17, offset: (2 * index) + 42 }
                    : { idTema: 'T00014', limit: 2, offset: 2 * index },
            index >= 25 ? { idTema: 'T00015', limit: 8, offset: 5 * index }
                : { idTema: 'T00015', limit: 5, offset: 5 * index },
            { idTema: 'T00016', limit: 3, offset: 3 * index },
            index === 22 ? { idTema: 'T00017', limit: 5, offset: 1 * index }
                : index === 23 ? { idTema: 'T00017', limit: 14, offset: (1 * index) + 4 }
                    : index === 24 ? { idTema: 'T00017', limit: 19, offset: (1 * index) + 17 }
                        : index >= 25 ? { idTema: 'T00017', limit: 19, offset: (1 * index) + 36 }
                            : { idTema: 'T00017', limit: 1, offset: 1 * index },
            index === 21 ? { idTema: 'T00018', limit: 3, offset: 1 * index }
                : index === 22 ? { idTema: 'T00018', limit: 3, offset: (1 * index) + 2 }
                    : index === 23 ? { idTema: 'T00018', limit: 3, offset: (1 * index) + 4 }
                        : index === 24 ? { idTema: 'T00018', limit: 3, offset: (1 * index) + 6 }
                            : index >= 25 ? { idTema: 'T00018', limit: 5, offset: (1 * index) + 8 }
                                : { idTema: 'T00018', limit: 1, offset: 1 * index },
        ];

        console.log(index)

        // Ejecutar todas las consultas en paralelo
        const queries = temas.map(({ idTema, limit, offset }) =>
            connection.query<any[]>(`SELECT idPregunta FROM preguntas 
                WHERE idTema = ? order by CAST(idPregunta AS UNSIGNED) LIMIT ? OFFSET ?`, [idTema, limit, offset])
        );

        // Esperar a que todas las consultas terminen
        const results = await Promise.all(queries);

        // Extraer los IDs de todas las preguntas seleccionadas
        const questionIds = results.flatMap(([rows]) =>
            rows.map((q: { idPregunta: string }) => q.idPregunta));

        console.log(questionIds)

        // Traer los detalles de esas preguntas y sus respuestas
        const [questions] = await connection.query<User[]>(`
            SELECT p.idPregunta AS id, p.pregunta AS question, p.idTema, t.tema,
            GROUP_CONCAT(CONCAT(a.idAlternativa, "@", a.alternativa) ORDER BY a.idAlternativa SEPARATOR '||') AS options, 
            (SELECT a2.idAlternativa 
                FROM alternativas a2 
                WHERE a2.idPregunta = p.idPregunta AND a2.respuesta = 1 LIMIT 1
            ) AS correctAnswer 
            FROM preguntas p 
            INNER JOIN alternativas a ON a.idPregunta = p.idPregunta
            INNER JOIN temas t ON t.idTema = p.idTema
            WHERE p.idPregunta IN (?)
            GROUP BY p.idPregunta
            ORDER BY p.idTema, CAST(p.idPregunta AS UNSIGNED) `, [questionIds]);

        return questions.map(row => ({
            id: row.id,
            question: row.question,
            tema: row.tema,
            options: row.options.split("||"), // Convertir string a array
            correctAnswer: row.correctAnswer
        }));
    } catch (error) {
        console.error("Error al obtener las preguntas (getQuestionSiecopolWhitOffset): ", error);
        throw new Error("Error al obtener las preguntas (getQuestionSiecopolWhitOffset");
    }
}