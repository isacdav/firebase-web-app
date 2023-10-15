'use client';

import { useEffect, type ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import { useAuthContext } from '@/context/auth-context';

interface Props {
  children: ReactNode;
}

/**
 * This component is used to protect pages from unauthenticated users
 * Can protect pages and layouts
 */
export const Protected = ({ children }: Props): ReactNode => {
  const router = useRouter();
  const { user, loading } = useAuthContext();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      router.push('/login');
    }
  }, [loading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};
