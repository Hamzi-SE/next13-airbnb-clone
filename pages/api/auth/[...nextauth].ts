import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import bcrypt from "bcrypt";
import type { Adapter } from "next-auth/adapters";
import prisma from "../../../app/libs/prismadb";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any){
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required")
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!user || !user.hashedPassword) {
                    throw new Error("Invalid email or password")
                }

                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)

                if (!isCorrectPassword) {
                    throw new Error("Invalid email or password")
                }

                return user
            }
        }),
        ],
        pages: {
            signIn: "/",
        },
        debug: process.env.NODE_ENV === "development",
        session: {
            strategy: "jwt",
        },
        secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)