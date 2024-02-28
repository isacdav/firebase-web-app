import { z } from 'zod';

export const userUpdateSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
    })
    .min(2, {
      message: 'Name too short',
    })
    .nullish(),
  lastName: z
    .string({
      invalid_type_error: 'Last name must be a string',
    })
    .min(2, {
      message: 'Last name too short',
    })
    .nullish(),
  email: z
    .string()
    .email({
      message: 'Invalid email',
    })
    .nullish(),
});

export type ActionInput = z.infer<typeof userUpdateSchema>;
export type ActionOutput = DatabaseSchema['users']['Data'] | undefined;
