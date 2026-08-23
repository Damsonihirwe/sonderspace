import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import type { JWT } from 'next-auth/jwt';
import type { Session } from 'next-auth';
import '@/app/api/auth/types';

export const authConfig = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const validUsername = credentials.username === process.env.ADMIN_USERNAME;
        const validPassword = await bcrypt.compare(
          credentials.password,
          process.env.ADMIN_PASSWORD_HASH || ''
        );

        if (!validUsername || !validPassword) {
          return null;
        }

        return {
          id: '1',
          name: 'Admin',
          email: 'admin@sonderspace.com',
        };
      },
    }),
  ],
  pages: {
    signIn: '/admin',
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token }: { token: JWT }) {
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.sub || '1';
      }
      return session;
    },
  },
};
