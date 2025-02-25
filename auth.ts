import NextAuth, { Session, JWT, DefaultSession } from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { User as OriginalUser } from '@/app/lib/definitions';

interface User extends OriginalUser {
    role: string;
}
import bcrypt from 'bcryptjs';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User[]>`
            SELECT * FROM users WHERE email=${email}
        `;
        
        return user[0];
        
        
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

declare module 'next-auth' {
    interface Session {
        user: {
            role: string;
        } & DefaultSession['user'];
    }

    interface JWT {
        role: string;
    }
}

console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET);

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (!passwordsMatch) return null;

                    return {
                        id: user.id,
                        email: user.email,
                        role: user.role,
                        name: user.name
                    };
                }

                console.log('Invalid credentials');
               
                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user && 'role' in user) {
                token.role = user.role; 
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string; 
            }
            return session;
            
        },
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET
});