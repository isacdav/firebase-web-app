import { z } from 'zod';

export const userCreateSchema = z.object({
  uid: z.string().min(1, {
    message: 'Invalid uid',
  }),
  email: z.string().email({
    message: 'Invalid email',
  }),
});

export type ActionInput = z.infer<typeof userCreateSchema>;
export type ActionOutput = DatabaseSchema['users']['Data'] | undefined;
