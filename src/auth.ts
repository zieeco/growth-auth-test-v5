// import { MongoDBAdapter} from '@auth/mongodb-adapter';
import NextAuth from 'next-auth';
import { Adapter} from 'next-auth/adapters';
// import client from './lib/mongo';

export const {handlers, auth, signIn, signOut} = NextAuth({
	// adapter: MongoDBAdapter(client) as Adapter,
	providers: [],
});
