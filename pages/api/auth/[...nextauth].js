import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { localLogin } from '../../../lib/api/Auth';

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  // callbacks: {
  //   async jwt({ token, account, user }) {
  //     // Persist the OAuth access_token to the token right after signin
  //     if (account) {
  //       token.id = user.id;
  //       token.username = user.username;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     // Send properties to the client, like an access_token from a provider.
  //     session.id = token.id;
  //     session.username = token.username;
  //     return session;
  //   },
  // },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const body = req.body;

        const access_token = await localLogin(body);
        return {
          access_token,
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
