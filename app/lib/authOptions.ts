import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { getUser } from "./data";

type User = {
    id: string,
    email: string | null | undefined,
    name: string | null | undefined,
    token: string | null | undefined
}

const authOptions: NextAuthOptions = {
    
    pages: {
        // signIn: "/login",
        // error: '/auth/auth/error',
    },
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                
                const user = await getUser(credentials?.email as string, credentials?.password as string);
                // console.log(user)
                if (user) {
                    return user;
                }
                
                throw new Error("Usuario o contraseña incorrectos");
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        // signIn: async ({ user, account, profile, email, credentials }) =>{
        //     console.log("signIn")
        //     return true;
        // },
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (token) {
                const user: User = {
                    id: token.id as string,
                    email: token.email,
                    name: token.name,
                    token: ""
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