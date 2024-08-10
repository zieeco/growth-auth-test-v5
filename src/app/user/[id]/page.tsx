import connectDB from '@/lib/db';
import User from '@/models/User';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { Types } from 'mongoose';
import { ObjectId } from 'mongodb';

interface PageProps {
  params: { id: string };
}

const getUser = cache(async (id: string) => {
  await connectDB();

  if (!Types.ObjectId.isValid(id)) return null;

  const user = await User.findById(id, 'id name image createdAt');
  console.log('date created', user?.createdAt?.toLocaleDateString());

  return user ? user : null;
});

export async function generateStaticParams() {
  await connectDB();
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
  console.log('checking the user', user);

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
