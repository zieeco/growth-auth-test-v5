import { MongoDBAdapter} from '@auth/mongodb-adapter';
import NextAuth from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import clientPromise from './lib/mongo';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import Twitter from 'next-auth/providers/twitter';

export const { handlers, auth, signIn, signOut } = NextAuth({
  theme: {
    logo: '/favicon.png',
  },
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [Google, GitHub, Twitter],
});
