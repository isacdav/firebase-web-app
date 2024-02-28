import { type ZodError } from 'zod';

declare global {
  interface ServerActionResult<T, U> {
    data?: U | null;
    error?: string | null;
    validationError?: ZodError<T> | null;
  }

  type ServerAction<T, U> = (data?: T) => Promise<ServerActionResult<T, U>>;
}
