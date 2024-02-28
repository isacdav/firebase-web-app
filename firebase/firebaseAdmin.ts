import { cert, getApp, initializeApp, getApps } from 'firebase-admin/app';

import { emulatorConfig, firebaseConfig, serviceAccount } from '@/utils/config';

/**
 * Set environment variables for the Firestore and Auth emulators if enabled
 */
if (emulatorConfig.enabled) {
  process.env.FIRESTORE_EMULATOR_HOST = `${emulatorConfig.host}:${emulatorConfig.firestorePort}`;
  process.env.FIREBASE_AUTH_EMULATOR_HOST = `${emulatorConfig.host}:${emulatorConfig.authPort}`;
}

/**
 * Initialize Firebase Admin
 * And get Admin instance
 */
export const adminApp = getApps().length
  ? getApp(firebaseConfig.projectId)
  : initializeApp({ credential: cert(serviceAccount) }, firebaseConfig.projectId);
