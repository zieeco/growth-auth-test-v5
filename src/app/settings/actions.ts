'use server';

import { auth } from '@/auth';
import connectDB from '@/lib/db';
import { UpdateProfileValues, updateProfileSchema } from '@/lib/validation';
import { revalidatePath } from 'next/cache';
import User from '@/models/User';

export async function updateProfile(values: UpdateProfileValues) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw Error('Unauthorized');
  }

  const { name } = updateProfileSchema.parse(values);

  await connectDB();
  await User.findByIdAndUpdate(userId, { name }, { new: true });

  revalidatePath('/');
}
