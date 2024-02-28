'use client';

import { useEffect, type ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import { useAuthContext } from '@/context/authContext';

interface Props {
  children: ReactNode;
}

/**
 * This component is used to protect pages from unauthenticated users
 * Can protect pages and layouts
 */
export const Protected = ({ children }: Props): ReactNode => {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  return <>{user ? children : null}</>;
};
