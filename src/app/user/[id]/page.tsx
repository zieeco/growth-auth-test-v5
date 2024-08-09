import connectDB from '@/lib/db';
import User from '@/models/User';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { Types } from 'mongoose';

interface PageProps {
  params: { id: string };
}

await connectDB();

const getUser = cache(async (id: string) => {
  if (!Types.ObjectId.isValid(id)) return null;

  const user = await User.findById(id, 'id name image createdAt');

  return user ? user.toObject() : null;
});

export async function generateStaticParams() {
  const allUsers = await User.find({}, '_id').lean();

  return allUsers.map(({ _id }) => ({ id: _id.toString() }));
}

export async function generateMetadata({ params: { id } }: PageProps) {
  const user = await getUser(id);

  return {
    title: user?.name || `User ${id}`,
  };
}

export default async function Page({ params: { id } }: PageProps) {
  // Artificial delay to showcase static caching
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const user = await getUser(id);

  if (!user) notFound();

  return (
    <div className="mx-3 my-10 flex flex-col items-center gap-3">
      {user.image && (
        <Image
          src={user.image}
          width={100}
          alt="User profile picture"
          height={100}
          className="rounded-full"
        />
      )}
      <h1 className="text-center text-xl font-bold">
        {user?.name || `User ${id}`}
      </h1>
      <p className="text-muted-foreground">
        User since {new Date(user.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
