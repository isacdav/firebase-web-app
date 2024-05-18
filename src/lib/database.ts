import { schema } from 'typesaurus';

import { firebaseConfig } from '@/lib/config';

/**
 * Database schema for the whole application
 */
export const database = schema(
  s => ({
    users: s.collection<UserSchema, string>(),
  }),
  { app: firebaseConfig.projectId },
);
