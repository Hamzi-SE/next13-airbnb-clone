import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

// Best practice: https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices

if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = client;
}

export default client;