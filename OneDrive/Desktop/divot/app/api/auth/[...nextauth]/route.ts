import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }

      // Check if user exists in database
      let existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        // Create new user if they don't exist
        existingUser = await prisma.user.create({
          data: {
            email: user.email,
            name: user.name || 'Google User',
            password: '', // No password for OAuth users
            role: 'user',
          },
        });
      }

      // Return true and attach user id to the user object
      user.id = existingUser.id;
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
