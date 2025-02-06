"use server";

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs'; 
import postgres from 'postgres';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


async function getUser(email: string): Promise<User | null> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user.length > 0 ? user[0] : null; 
  } catch (error) {
    console.error(' Failed to fetch user:', error);
    return null;
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
      
      authorize: async (credentials): Promise<{ id: string; email: string; name: string; role: "admin" | "teacher" | "student" } | null> => {
        if (!credentials) {
          throw new Error('No credentials provided');
        }
      
        const { email, password } = credentials as { email: string; password: string };
        const user = await getUser(email);
      
        if (!user) {
          throw new Error('No user found with the given email');
        }
      
        const isValidPassword = await bcrypt.compare(password, user.password!);
        if (!isValidPassword) {
          throw new Error('Invalid password');
        }
      
        
        const { password: _, ...userWithoutPassword } = user;
      
        return {
          id: userWithoutPassword.id,
          email: userWithoutPassword.email,
          name: userWithoutPassword.name,
          role: userWithoutPassword.role as "admin" | "teacher" | "student", 
        };
      }   
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string; 
        token.role = user.role as "admin" | "teacher" | "student"; 
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string, 
          role: token.role as "admin" | "teacher" | "student", 
        };
      }
      return session;
    },
  }
  
});
