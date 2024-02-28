'use server';

import { database } from '@/lib/database';
import { getCurrentUser } from '@/lib/serverAuth';
import { validateAction } from '@/lib/validateAction';

import { userUpdateSchema, type ActionInput, type ActionOutput } from './definitions';

const handler: ServerAction<ActionInput, ActionOutput> = async data => {
  const user = await getCurrentUser();

  const userId = user?.uid;
  if (!userId) {
    return {
      error: 'User not found',
    };
  }

  const userBd = await database.users.get(userId);
  if (!userBd) {
    return {
      error: 'User not found',
    };
  }

  const updatedInformation = {
    ...userBd.data.information,
    ...data,
  };

  const dbResult = await userBd.update((op: any) => op.field('information').set(updatedInformation));
  const updatedUser = await dbResult?.get();

  return { data: updatedUser?.data };
};

export const userUpdate = validateAction(userUpdateSchema, handler);
