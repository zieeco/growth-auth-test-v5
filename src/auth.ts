import { MongoDBAdapter} from '@auth/mongodb-adapter';
import NextAuth from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import clientPromise from './lib/mongo';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import Twitter from 'next-auth/providers/twitter';
import User from './models/User';

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true, // Temporal fix the next-auth beta error. This issue is under fixing by next-auth-beta.
  theme: {
    logo: '/favicon.png',
  },
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: 'select_account',
        },
      },
      // Customize Google provider options if needed
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: null,
          accounts: [],
        };
      },
    }),
    GitHub,
    Twitter,
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Update user with account information
      await User.findByIdAndUpdate(
        user.id,
        {
          $set: {
            accounts: [
              {
                accessToken: account?.access_token,
                refreshToken: account?.refresh_token,
                expiresAt: account?.expires_at,
                scope: account?.scope,
                tokenType: account?.token_type,
                providerAccountId: account?.providerAccountId,
                provider: account?.provider,
              },
            ],
          },
        },
        { new: true },
      );

      return true; // This will allow sign in
    },
    async session({ session, user }) {
      session.user.id = user.id; // Add user ID to session
      const userData = await User.findById(user.id).select('accounts');
      if (userData) {
        session.user.accounts = userData.accounts || []; // Add accounts to session
      } else {
        session.user.accounts = []; // Ensure accounts is an empty array if userData is null
      }

      return session;
    },
  },
});
