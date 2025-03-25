
export const fetchUser = async (email: string, password: string): Promise<any> => {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({
                email,
                password
            }),
            next: { revalidate: 0 }
        });
        
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return null;
    }
};

export const fetchCreateSession = async (userId: string, userDevice: string, userIp: string, sessionToken: string, sessionExpires: Date): Promise<any> => {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/create-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({
                userId,
                userDevice,
                userIp,
                sessionToken,
                sessionExpires
            }),
            next: { revalidate: 0 }
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al crear sesión:', error);
        return null;
    }
}

export const fetchActiveSession = async (sessionToken: string): Promise<any> => {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/active-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({
                sessionToken
            }),
            next: { revalidate: 0 }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener sesión activa:', error);
        return null;
    }
}

export const saveVerificationToken = async (userId: string, token: string): Promise<any> => {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/save-verification-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({
                userId,
                token,
                expires
            }),
            next: { revalidate: 0 }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al guardar o actualizar veirificacion del token:', error);
        return null;
    }
}

export const fetchEmailVerification = async (sessionToken: string): Promise<any> => {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/email-verification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({
                sessionToken
            }),
            next: { revalidate: 0 }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al verificar el email:', error);
        return null;
    }
}

export const updateUserDeleteEmailVerification = async (userId: string, token: string): Promise<any> => {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/update-user-verification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({
                userId,
                token,
            }),
            next: { revalidate: 0 }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al actualizar user del token:', error);
        return null;
    }
}

// antigua integracion con mysql

// export async function getUser(email: string, password: string): Promise<User> {
//     try {
//         const [user] = await connection.query<User[]>(`SELECT u.*, s.userIp, s.userDevice
//             FROM users u
//             LEFT JOIN sessions s ON s.userId = u.userId
//             WHERE u.email=?`, [email]);

//         if (user.length === 0) {
//             throw new Error('El email no es válido.');
//         }

//         const passwordsMatch = await bcrypt.compare(password, user[0].password);
//         if (!passwordsMatch) {
//             throw new Error('tu contraseña no es válida.');
//         }

//         return user[0];
//     } catch (error) {
//         throw error;
//     }
// }

// export async function createSession(userId: string, userDevice: string, userIp: string, sessionToken: string, sessionExpires: Date) {
//     try {

//         await connection.query<User[]>(`DELETE FROM sessions WHERE userId = ?`, [userId]);

//         const sessionId = uuidv4();
//         await connection.query<User[]>(`INSERT INTO sessions (sessionId, userId, userDevice, userIp, sessionToken, sessionExpires, createdAt) 
//             VALUES (?, ?, ?, ?, ?, ?, NOW())`,
//             [sessionId, userId, userDevice, userIp, sessionToken, sessionExpires]);

//         return sessionId;
//     } catch (error) {
//         console.error("Error al crear sesión: ", error);
//         throw new Error("Error al crear la sesión");
//     }
// }

// export async function getActiveSession(sessionToken: string) {
//     try {

//         const [session] = await connection.query<User[]>(`SELECT * FROM sessions 
//             WHERE sessionToken = ? AND sessionExpires > NOW()
//             ORDER BY createdAt DESC LIMIT 1`
//             , [sessionToken]);

//         return session[0] || null;
//     } catch (error) {
//         console.error("Error al obtener la sesión: ", error);
//         throw new Error("Error al obtener la sesión");
//     }
// }