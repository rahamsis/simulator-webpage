'use server';

import { number, string, z } from 'zod';

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
        // email: z.string().trim().email().min(1, 'Email es requerido.'),
        email: z.string().trim().min(1, 'Email es requerido.'),
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

        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/create-account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ username, email, password }),
            next: { revalidate: 0 }
        })

        const data = await response.json();

        return data;

    } catch (error: unknown) {
        return {
            message: (error as any).sqlMessage || 'Database Error: Fallo al crear el usuario - createAccount().',
        }
    }

    // redirect('/login');
}

export async function fetchQuestionHabilidades(idTema: string, limit: number) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/questions-habilidades`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ idTema, limit }),
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data.map((row: any) => ({
            id: row.id,
            question: row.question,
            tema: row.tema,
            options: row.options.split("||"), // Convertir string a array
            correctAnswer: row.correctAnswer
        }));

        // return data;
    } catch (error) {
        console.error('Error al obtener las preguntas:', error);
        throw new Error("Error al obtener las preguntas");
    }
}

export async function fetchQuestionAndAnswer(idTema: string) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/questions-and-answer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ idTema }),
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data.map((row: any) => ({
            id: row.id,
            question: row.question,
            idTema: idTema,
            tema: row.tema,
            claves: row.claves,
            correctAnswer: row.correctAnswer
        }));

        // return data;
    } catch (error) {
        console.error('Error al obtener las preguntas y respuestas:', error);
        throw new Error("Error al obtener las preguntas y respuestas");
    }
}

export async function fetchQuestionByIdTema(idTema: string, limit: number) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/questions-by-idtema`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ idTema, limit }),
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data.map((row: any) => ({
            id: row.id,
            question: row.question,
            tema: row.tema,
            options: row.options.split("||"), // Convertir string a array
            correctAnswer: row.correctAnswer
        }));

        // return data;
    } catch (error) {
        console.error('Error al obtener las preguntas:', error);
        throw new Error("Error al obtener las preguntas");
    }
}

export async function fetchTemas() {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/temas`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            next: { revalidate: 0 }
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error al obtener los temas:', error);
        throw new Error("Error al obtener los temas");
    }
}

export async function fetchQuestionRamdonWithLimit(limit: number) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/questions-random-with-limit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ limit }),
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data.map((row: any) => ({
            id: row.id,
            question: row.question,
            tema: row.tema,
            options: row.options.split("||"), // Convertir string a array
            correctAnswer: row.correctAnswer
        }));

    } catch (error) {
        console.error('Error al obtener las preguntas:', error);
        throw new Error("Error al obtener las preguntas");
    }
}

export async function fetchQuestionSiecopol(limit: number) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/questions-siecopol`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ limit }),
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data.map((row: any) => ({
            id: row.id,
            question: row.question,
            tema: row.tema,
            options: row.options.split("||"), // Convertir string a array
            correctAnswer: row.correctAnswer
        }));

    } catch (error) {
        console.error('Error al obtener las preguntas (fetchQuestionSiecopol):', error);
        throw new Error("Error al obtener las preguntas (fetchQuestionSiecopol");
    }
}

export async function fetchValidatePersonByCipAndDni(email: any, cip: string, dni: string) {
    try {
        if (email === null || email === undefined) {
            return false
        }

        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/validate-person-by-cipdni`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ email, cip, dni }),
            next: { revalidate: 0 }
        });

        const data = await response.json();

        if (data.length === 0) {
            return false;
        }

        return data.map((row: any) => ({
            userId: row.userId,
        }));

    } catch (error) {
        console.error('Error al validar persona por CIP y DNI:', error);
        throw new Error("Error al validar persona por CIP y DNI");
    }
}

export async function fetchTableExams() {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/table-exams`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            next: { revalidate: 0 }
        });

        const data = await response.json();

        return data.map((row: any) => ({
            id: row.idExamen,
            titulo: row.titulo,
            descripcion: row.descripcion
        }));
    } catch (error) {
        console.error('Error al obtener los examenes (fetchTableExams):', error);
        throw new Error("Error al obtener los examenes (fetchTableExams");
    }
}

export async function fetchQuestionSiecopolWhitOffset(index: number) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/questions-siecopol-with-offset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ index }),
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data.map((row: any) => ({
            id: row.id,
            question: row.question,
            tema: row.tema,
            options: row.options.split("||"), // Convertir string a array
            correctAnswer: row.correctAnswer
        }));

    } catch (error) {
        console.error('Error al obtener las preguntas (fetchQuestionSiecopolWhitOffset):', error);
        throw new Error("Error al obtener las preguntas (fetchQuestionSiecopolWhitOffset");
    }
}

export async function fetchSaveIncorrectQuestions(userId: string, correctQuestionsIds: string[]) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/save-incorrect-questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ userId, correctQuestionsIds }),
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error al guardar las preguntas fallidas (fetchSaveIncorrectQuestions):', error);
        throw new Error("Error al guardar las preguntas fallidas (fetchSaveIncorrectQuestions");
    }
}

export async function fetchQuantityQuestions(userId: string, tableName: string) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/quantity-questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ userId, tableName }),
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener la cantidad de preguntas (fetchQuantityQuestions):', error);
        throw new Error("Error al obtener la cantidad de preguntas (fetchQuantityQuestions");
    }
}

export async function fetchIncorrectQuestions(userId: string, quantity: number) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/incorrect-questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ userId, quantity }),
            next: { revalidate: 0 }
        });

        const data = await response.json();

        return data.map((row: any) => ({
            id: row.id,
            question: row.question,
            tema: row.tema,
            options: row.options.split("||"), // Convertir string a array
            correctAnswer: row.correctAnswer,
            intentos: row.intentos
        }));
    } catch (error) {
        console.error('Error al obtener las preguntas fallidas (fetchGetIncorrectQuestions):', error);
        throw new Error("Error al obtener las preguntas fallidas (fetchGetIncorrectQuestions");
    }
}

export async function updateIncorrectQuestions(userId: string, correctQuestionsIds: string[], incorrectQuestionIds: string[]) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/update-incorrect-questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ userId, correctQuestionsIds, incorrectQuestionIds }),
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error al actualizar las preguntas fallidas (updateIncorrectQuestions):', error);
    }
}

export async function getUserdata(userId: string) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/user-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ userId, }),
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data.map((row: any) => ({
            userId: row.userId,
            profile: row.profile,
            nombre: row.nombre,
            apellidos: row.apellidos,
            email: row.email,
            grupo: row.grupo,
            grado: row.grado,
            dni: row.dni,
            cip: row.cip,
            fechaNacimiento: row.fechaNacimiento,
            genero: row.genero,
            username: row.username,
            password: row.password,
            telefono: row.telefono,
            direccion: row.direccion,
            ciudad: row.ciudad,
            codigoPostal: row.codigoPostal,
            provincia: row.provincia,
            terminosCondiciones: row.terminosCondiciones
        }));

    } catch (error) {
        console.error('Error al traer los datos del usuario (getUserdata):', error);
    }
}

export async function updatetUserdata(userId: string, data: any) {
    try {
        const bodyData = { userId, ...data }

        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/user-update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify(bodyData),
            next: { revalidate: 0 }
        });

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('Error al actualizar los datos del usuario (updatetUserdata):', error);
    }
}

export async function getSignature(userId: string) {
    const response = await fetch(`${process.env.APP_BACK_END}/cloudinary/signature?public_id=${userId}`);
    const data = await response.json();
    return data;
}

export async function fetchQuestionToTaller(index: number, limit: number, offset: number) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/questions-taller`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ index, limit, offset }),
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data.map((row: any) => ({
            id: row.id,
            question: row.question,
            tema: row.tema,
            options: row.options.split("||"), // Convertir string a array
            correctAnswer: row.correctAnswer
        }));

    } catch (error) {
        console.error('Error al obtener las preguntas (fetchQuestionToTaller):', error);
        throw new Error("Error al obtener las preguntas (fetchQuestionToTaller");
    }
}

export async function getFormToken(amount: number, orderId: string) {
    try {
        console.log('Creating payment intent with amount:', amount, 'and orderId:', orderId);
        const response = await fetch(`${process.env.APP_BACK_END}/payment/form-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount, orderId }),
        });

        if (!response.ok) throw new Error('No se pudo obtener el form token');

        const data = await response.json();
        console.log('Payment Intent:', data);
        return data;

    } catch (error) {
        console.error('Error al crear el pago (createPaymentIntent):', error);
    }
}

