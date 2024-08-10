// import Image from 'next/image';
import Link from 'next/link';
import User from '@/models/User';
import connectDB from '@/lib/db';

export default async function Home() {
  await connectDB();
  const users = await User.find({}).lean();
  console.log('all the users', users)

  console.log('Hey users:', users);
  const currentYear = new Date().getFullYear();
  return (
    <main className="flex flex-col items-center gap-6 px-3 py-10">
      <h1 className="text-center text-4xl font-bold">{`Growth-${currentYear} Auth Dem`}</h1>
      <h2 className="text-center text-2xl font-semibold">Users</h2>
      <ul className="list-inside list-disc">
        {users.map((user) => (
          <li key={user._id.toString()}>
            <Link href={`/user/${user._id}`} className="hover:underline">
              {user.name || `User ${user._id.toString()}`}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
