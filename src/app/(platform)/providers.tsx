'use client';

import { useCallback, useEffect, type ReactNode } from 'react';

import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { usePathname } from 'next/navigation';
import { CookiesProvider } from 'react-cookie';

import { Protected } from '@/components';
import { AuthContextProvider } from '@/context/authContext';
import { useFirebase } from '@/hooks';
import { emulatorConfig, getAuthEmulatorHost } from '@/lib/config';
import { ROUTES_PUBLIC } from '@/lib/constants';

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props): JSX.Element => {
  const pathname = usePathname();
  const { auth, firestore } = useFirebase();

  const connectEmulators = useCallback(() => {
    if (emulatorConfig.enabled) {
      try {
        connectAuthEmulator(auth, getAuthEmulatorHost());
        connectFirestoreEmulator(firestore, emulatorConfig.host, emulatorConfig.firestorePort);
      } catch (error) {
        // Catch to avoid re-rendering error
      }
    }
  }, []);

  useEffect(() => {
    connectEmulators();
  }, []);

  return (
    <CookiesProvider>
      <AuthContextProvider>
        {ROUTES_PUBLIC.includes(pathname) ? children : <Protected>{children}</Protected>}
      </AuthContextProvider>
    </CookiesProvider>
  );
};

export default Providers;
