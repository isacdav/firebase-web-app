import { database } from '@/lib/database';
import { validateAction } from '@/lib/validateAction';

import { userCreateSchema, type ActionInput, type ActionOutput } from './definitions';

const handler: ServerAction<ActionInput, ActionOutput> = async data => {
  if (!data?.uid) {
    return {
      error: 'User data missing',
    };
  }

  const userExists = await database.users.get(data.uid);
  if (userExists) {
    return {
      error: 'User already exists',
    };
  }

  const dbResult = await database.users.set(data.uid, op => ({
    information: {
      name: '',
      lastName: '',
      email: data.email ?? '',
    },
    created: op.serverDate(),
  }));

  const createdUser = await dbResult.get();

  return { data: createdUser?.data };
};

export const userCreate = validateAction(userCreateSchema, handler);
