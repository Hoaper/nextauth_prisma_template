import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export const authOptions  = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || "",
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
        CredentialsProvider({
            name: "login",
            credentials: {
                username: { label: "Почта", type: "email", placeholder: "Введите почту"},
                password: { label: "Пароль", type: "password", placeholder: "Введите пароль"},
            },
            async authorize(credentials, req) {
                // Какая та логика тут
                return null
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    adapter: PrismaAdapter(prisma)

}