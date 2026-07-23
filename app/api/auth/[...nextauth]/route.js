import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }
                
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });
                
                if (!user || !user.password) {
                    throw new Error("No user found with this email");
                }
                
                const isValid = await bcrypt.compare(credentials.password, user.password);
                
                if (!isValid) {
                    throw new Error("Invalid password");
                }
                
                return user;
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development",
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login', // Redirect unauthenticated users to the login page
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
