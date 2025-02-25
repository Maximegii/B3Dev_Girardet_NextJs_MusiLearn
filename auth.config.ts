import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET, // Vérifie que cette variable est bien définie dans .env.local
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        // ⚡ Simule une authentification de test ⚡
        if (credentials.email === "admin@test.com" && credentials.password === "password") {
          return { id: "1", email: "admin@test.com", role: "admin", emailVerified: null };
        }

        throw new Error("Invalid email or password");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          email: user.email,
          role: user.role || "user",
          emailVerified: user.emailVerified || null,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = {
          id: token.user.id as string,
          email: token.user.email as string,
          role: token.user.role as string,
          emailVerified: token.user.emailVerified ? new Date(token.user.emailVerified as string) : null,
        };
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
