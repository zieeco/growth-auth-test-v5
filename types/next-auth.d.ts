import { Account } from '@/models/User';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: User & DefaultSession['user'];
  }

  interface User {
    role: String | null;
    accounts: Account[];
  }
}
