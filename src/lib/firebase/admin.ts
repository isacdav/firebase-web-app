import admin from 'firebase-admin';

import { emulatorConfig } from '@/lib/firebase/firebase-config';

/**
 * Initialize Firebase Admin for server-side rendering
 */
export const initFirebaseAdmin = (): void => {
  // Setting environment variables just if is 'enabled' in .env*
  // Otherwise, it will use the emulator always
  if (emulatorConfig.enabled) {
    process.env.FIRESTORE_EMULATOR_HOST = `${emulatorConfig.host}:${emulatorConfig.firestorePort}`;
    process.env.FIREBASE_AUTH_EMULATOR_HOST = `${emulatorConfig.host}:${emulatorConfig.authPort}`;
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      }),
    });
  }
};
