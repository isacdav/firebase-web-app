import { ZodError, type z } from 'zod';

export function validateAction<T, U>(schema: z.Schema<T>, handler: ServerAction<T, U>): ServerAction<T, U> {
  return async (data?: T) => {
    const validationResults = schema.safeParse(data);
    if (!validationResults.success) {
      return {
        validationError: new ZodError(validationResults.error.errors),
      };
    }

    return await handler(data);
  };
}
