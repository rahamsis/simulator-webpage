import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { getUser } from "./data";

type User = {
    id: string,
    email: string | null | undefined,
    name: string | null | undefined,
    providerId: string | null | undefined
}

const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    // pages: {
    //     // signIn: "/login",
    //     // error: '/auth/auth/error',
    // },
    // session: {
    //     strategy: 'jwt',
    // },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials: any) => {
                console.log(credentials)

                const { email, password } = credentials;
                // console.log(user)
                try {
                    const user = await getUser(email as string, password as string);
                    
                    return {
                        id: user.id,
                        name: user.name,
                        email: email,
                        providerId: "valor_unico_de_la_db",
                        message: user.message
                    } as User;
                } catch (error) {
                    const message = (error && (error as Error).message) as string || "Intente nuevamente.";
                    throw new Error(message);

                }
            }
        })
    ],    
    callbacks: {
        // signIn: async ({ user, account, profile, email, credentials }) =>{
        //     console.log("signIn")
        //     return true;
        // },
        async signIn({ user, account, profile }) {
            console.log('----------signIn----------')
            // Aquí puedes guardar el usuario en tu base de datos
            console.log('Datos de usuario:', user)
            return true
        },
        async jwt ({ token, user }) {
            if (user) {
                console.log('----------jwt----------')
                token.userId = user.id;
                token.email = user.email;
                token.name = user.name;
                token.providerId = user.providerId;
            }
            return token;
        },
        async session ({ session, token }) {
            if (session.user) {
                console.log('----------session----------')
                const user: User = {
                    id: token.userId as string,
                    email: token.email,
                    name: token.name,

                    providerId: token.providerId as string,
                }

                session.user = user;
            }
            return session;
        },
        // redirect: async ({ url, baseUrl}) =>{
        //     console.log("redirect")
        //     console.log(url, baseUrl)
        //     return baseUrl;
        // }
    },
}

export default authOptions;