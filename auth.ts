"use server";
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs'; // Remplacer bcrypt par bcryptjs
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          throw new Error('No credentials provided');
        }

        const { email, password } = credentials as { email: string; password: string };
    
        const user = await getUser(email as string);

        if (!user) {
          throw new Error('No user found with the given email');
        }

        const isValidPassword = await bcrypt.compare(password, user.password!);

        if (!isValidPassword) {
          throw new Error('Invalid password');
        }

        return user;
      },
    }),
  ],
});