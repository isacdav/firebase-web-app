import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sleep(seconds: number): Promise<any> {
  return await new Promise(resolve => setTimeout(resolve, seconds * 1000));
}
