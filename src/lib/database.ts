import { schema } from 'typesaurus';

import { firebaseConfig } from '@/utils/config';

export const database = schema(
  s => ({
    users: s.collection<UserSchema, string>(),
  }),
  { app: firebaseConfig.projectId },
);
