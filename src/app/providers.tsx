'use client';

import { type ReactNode } from 'react';

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {
  AuthProvider,
  FirebaseAppProvider,
  FirestoreProvider,
  useFirebaseApp,
} from 'reactfire';

import { firebaseConfig } from '@/constants/firebaseConfig';

interface Props {
  children: ReactNode;
}

const FirebaseProviders = ({ children }: Props): JSX.Element => {
  const firestore = getFirestore(useFirebaseApp());
  const auth = getAuth(useFirebaseApp());

  return (
    <FirestoreProvider sdk={firestore}>
      <AuthProvider sdk={auth}>{children}</AuthProvider>
    </FirestoreProvider>
  );
};

const Providers = ({ children }: Props): JSX.Element => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseProviders>{children}</FirebaseProviders>
    </FirebaseAppProvider>
  );
};

export default Providers;
