export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

export const emulatorConfig = {
  enabled: process.env.NEXT_PUBLIC_EMULATOR === 'true',
  host: process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST ?? '',
  authPort: process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_PORT ?? '',
  firestorePort: Number(process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_PORT ?? 0),
};

export function getAuthEmulatorHost(): string {
  return `http://${emulatorConfig.host}:${emulatorConfig.authPort}`;
}
