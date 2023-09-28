import admin from 'firebase-admin';

/**
 * Initialize Firebase Admin for server-side rendering
 */
export const initFirebaseAdmin = (): void => {
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
