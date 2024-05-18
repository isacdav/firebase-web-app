import { useMemo } from 'react';

import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

import { firebaseConfig } from '@/lib/config';

interface UseFirebaseHook {
  /**
   * Firestore instance for emulators purposes — to query data use `@/lib/database`
   */
  firestore: Firestore;
  app: FirebaseApp;
  auth: Auth;
}

/**
 * Hook to get the Firebase app, auth, and firestore instances already initialized
 * @returns The Firebase `app`, `auth`, and `firestore` instances
 */
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
