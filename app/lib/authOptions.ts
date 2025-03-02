import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, Session } from "next-auth";
import { getUser, createSession, getActiveSession } from "./data";
import { v4 as uuidv4 } from 'uuid';

type User = {
    id: string;
    email: string | null | undefined;
    name: string | null | undefined;
    providerId: string | null | undefined;
    userDevice: string | null | undefined;
    userIp: string | null | undefined;
    sessionToken?: string | null | undefined;
};

declare module "next-auth" {
    interface Session {
        activeSession?: boolean;
        sessionToken?: string;
    }
}

const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials: any) => {
                const { email, password, device, ip } = credentials;

                try {
                    const user = await getUser(email as string, password as string);
                    if (!user) return null;

                    // Verificar que `device` e `ip` existen
                    if (!device || !ip) {
                        throw new Error("Device or IP information is missing.");
                    }

                    const sessionToken = uuidv4(); // Token seguro
                    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 días

                    await createSession(user.userId, device, ip, sessionToken, expires);

                    return { ...user, sessionToken }; // Pasar el token en el usuario
                } catch (error) {
                    console.error("Authorization error:", error);
                    throw new Error("Invalid credentials.");
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.sessionToken = (user as User).sessionToken; // Guardar token en el JWT
            }

            // Verificar en la BD si la sesión sigue activa usando sessionToken
            const activeSession = token.sessionToken
                ? await getActiveSession(token.sessionToken as string)
                : null;

            token.activeSession = !!activeSession;

            return token;
        },
        async session({ session, token }) {            
            session.activeSession = token.activeSession as boolean | undefined;
            session.sessionToken = token.sessionToken as string | undefined;
            return session;

        },
    },
};

export default authOptions;
