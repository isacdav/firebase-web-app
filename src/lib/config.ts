/**
 * Configuration for the application from the environment variable
 */

// Client-side firebase configuration
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
};

// Server-side firebase configuration
export const serviceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL ?? '',
  privateKey: process.env.FIREBASE_PRIVATE_KEY ?? '',
};

// Emulator configuration
export const emulatorConfig = {
  enabled: process.env.NEXT_PUBLIC_EMULATOR === 'true',
  host: process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST ?? '',
  authPort: process.env.NEXT_PUBLIC_AUTH_EMULATOR_PORT ?? '',
  firestorePort: Number(process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_PORT ?? 0),
};

export function getAuthEmulatorHost(): string {
  return `http://${emulatorConfig.host}:${emulatorConfig.authPort}`;
}

// Env config values
export const envSecureCookie = process.env.NEXT_PUBLIC_SECURE_COOKIE === 'true';
export const forgotPasswordURL = process.env.NEXT_PUBLIC_URL_FORGOT_PASSWORD ?? '';
