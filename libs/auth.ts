import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from "@auth/prisma-adapter"
import {AuthOptions} from "next-auth";
import {prisma} from "@/libs/prisma";
import bcrypt from "bcrypt";
import {redirect} from "next/navigation";

export const authOptions: AuthOptions  = {
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
            name: "credentials",
            credentials: {
                email: { label: "Почта", type: "email", placeholder: "Введите почту"},
                password: { label: "Пароль", type: "password", placeholder: "Введите пароль"},
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!user) {
                    const hashedPassword = await bcrypt.hash(credentials.password, 10);

                    return await prisma.user.create({
                        data: {
                            email: credentials?.email,
                            password: hashedPassword,
                        },
                    })
                }
                const passwordMatch = await bcrypt.compare(credentials.password, user.password || "");

                if (!passwordMatch) {
                    return null;
                }

                return user
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    jwt: {
        maxAge: 24 * 60 * 60,
    },
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: "/login",
        signOut: "/signout",
        newUser: "/firststeps"
    },
    events: {
        signIn(message) {
            console.log(message.user, message.account)
        }
    }

}