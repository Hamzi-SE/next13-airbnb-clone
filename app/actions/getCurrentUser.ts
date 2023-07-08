import { getServerSession } from "next-auth/next";

import { authOptions } from "../../pages/api/auth/[...nextauth]";
import prisma from "../libs/prismadb";

export async function getSession() {
    return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
    try {
        const session = await getSession()

        if (!session?.user?.email) return null

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        if (!user) return null

        return {
            ...user,
            // convert dates to ISO string to avoid warning in console
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            emailVerified: user.emailVerified?.toISOString() || null
        }
        
    } catch (error : any) {
        return null
    }
}