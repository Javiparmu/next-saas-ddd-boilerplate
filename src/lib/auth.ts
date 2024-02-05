import { UserFinder } from '@/modules/User/application/UserFinder';
import { MongoUserRepository } from '@/modules/User/infrastructure/persistence/MongoUserRepository';
import NextAuth from 'next-auth';
import { MongooseAdapter } from '../app/adapters/mongoose-adapter';
import authConfig from './auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  session: {
    strategy: 'jwt',
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user?.email) return false;
      if (account?.provider !== 'credentials') return true;

      const userFinder = new UserFinder(new MongoUserRepository());
      const foundUser = await userFinder.run(user.email);

      if (!foundUser?.emailVerified) return false;

      return true;
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.userId = token.id as string;
        session.user.plan = token.plan as string;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      } else if (token) {
        const userFinder = new UserFinder(new MongoUserRepository());
        const foundUser = await userFinder.run(token.email!);

        if (foundUser) {
          token.id = foundUser.id.value;
          token.plan = foundUser.plan?.value;
        }
      }

      return token;
    },
  },
  adapter: MongooseAdapter(),
});
