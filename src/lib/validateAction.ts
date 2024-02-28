import { ZodError, type z } from 'zod';

/**
 * Validates the input data against a given schema and executes a server action.
 * @template T The type of the input data.
 * @template U The type of the output data.
 * @param {z.Schema<T>} schema The schema to validate the input data against.
 * @param {ServerAction<T, U>} handler The server action to execute.
 * @returns {ServerAction<T, U>} The wrapped server action that performs input validation.
 */
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
