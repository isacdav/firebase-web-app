'use client';

import { type ReactNode } from 'react';

import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { AuthProvider, FirebaseAppProvider, FirestoreProvider, useFirebaseApp } from 'reactfire';

import { AuthContextProvider } from '@/context/auth-context';
import { firebaseConfig, emulatorConfig, getAuthEmulatorHost } from '@/lib/firebase/firebase-config';

interface Props {
  children: ReactNode;
}

const FirebaseProviders = ({ children }: Props): JSX.Element => {
  const firestore = getFirestore(useFirebaseApp());
  const auth = getAuth(useFirebaseApp());

  if (emulatorConfig.enabled) {
    try {
      connectAuthEmulator(auth, getAuthEmulatorHost());
      connectFirestoreEmulator(firestore, emulatorConfig.host, emulatorConfig.firestorePort);
    } catch (error) {
      // Catch for re-rendering error
    }
  }

  return (
    <FirestoreProvider sdk={firestore}>
      <AuthProvider sdk={auth}>{children}</AuthProvider>
    </FirestoreProvider>
  );
};

const Providers = ({ children }: Props): JSX.Element => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseProviders>
        <AuthContextProvider>{children}</AuthContextProvider>
      </FirebaseProviders>
    </FirebaseAppProvider>
  );
};

export default Providers;
