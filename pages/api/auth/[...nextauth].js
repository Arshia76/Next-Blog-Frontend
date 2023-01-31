import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { localLogin } from '../../../lib/api/Auth';

export const authOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token to the token right after signin
      console.log(token);
      console.log(account);
      console.log(user);
      token.access_token = user.data.access_token;
      token.userId = user.data.id;

      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.access_token = token.access_token;
      session.userId = token.userId;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const body = req.body;

        const data = await localLogin(body);
        console.log(data);
        return {
          data,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
