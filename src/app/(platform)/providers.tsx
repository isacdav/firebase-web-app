'use client';

import { FC, PropsWithChildren, useCallback, useEffect } from 'react';

import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { usePathname } from 'next/navigation';
import { CookiesProvider } from 'react-cookie';

import { RouteProtector } from '@/components';
import { AuthContextProvider } from '@/context/authContext';
import { useFirebase } from '@/hooks';
import { emulatorConfig, getAuthEmulatorHost } from '@/lib/config';
import { ROUTES_PUBLIC } from '@/lib/constants';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const { auth, firestore } = useFirebase();

  const isPublic = ROUTES_PUBLIC.includes(pathname);

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
        <RouteProtector isPublic={isPublic} redirectPath={isPublic ? '/profile' : '/login'}>
          {children}
        </RouteProtector>
      </AuthContextProvider>
    </CookiesProvider>
  );
};

export default Providers;
