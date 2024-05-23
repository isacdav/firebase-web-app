import { z } from 'zod';

const passwordSchema = z.string().min(6, { message: 'Password must be at least 6 characters' });

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: passwordSchema,
});

export const registerSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });
