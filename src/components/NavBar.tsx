import { auth } from '@/auth';
import Link from 'next/link';
import { signIn } from '@/auth';
import { Button } from './ui/button';
import UserButton from './UserButton';

function SignInButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn();
      }}
    >
      <Button type="submit">Sign In</Button>
    </form>
  );
}

export default async function NavBar() {
  const session = await auth();
  const user = session?.user;
  return (
    <header className="sticky top-0 bg-background px-3 shadow-sm">
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3">
        <Link href="/" className="font-bold">
          {`Growth-${new Date().getFullYear()} Auth Demo`}
        </Link>
        {user ? <UserButton user={user} /> : <SignInButton />}
      </nav>
    </header>
  );
}
