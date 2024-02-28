import { useMemo } from 'react';

import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

import { firebaseConfig } from '@/utils/config';

interface UseFirebaseHook {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}

export function useFirebase(): UseFirebaseHook {
  const app: FirebaseApp = useMemo(
    () =>
      getApps().length ? getApp(firebaseConfig.projectId) : initializeApp(firebaseConfig, firebaseConfig.projectId),
    [],
  );

  const auth: Auth = useMemo(() => getAuth(app), [app]);

  const firestore: Firestore = useMemo(() => getFirestore(app), [app]);

  return {
    app,
    auth,
    firestore,
  };
}
