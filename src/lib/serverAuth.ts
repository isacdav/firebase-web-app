import 'server-only';

import { getAuth, type UserRecord } from 'firebase-admin/auth';
import { cookies } from 'next/headers';

import { adminApp } from '@/firebase/firebaseAdmin';
import { COOKIE_SESSION } from '@/utils/constants';

const auth = getAuth(adminApp);

/**
 * Get session cookie
 * @returns {string | undefined}
 */
async function getSession(): Promise<string | undefined> {
  try {
    return cookies().get(COOKIE_SESSION as string)?.value;
  } catch (error) {
    return undefined;
  }
}

/**
 * Check if user is authenticated
 * @param session
 * @returns {boolean}
 */
export async function isUserAuthenticated(session?: string): Promise<boolean> {
  const currentSession = session ?? (await getSession());
  if (!currentSession) return false;

  try {
    const isValid = !(await auth.verifySessionCookie(currentSession, true));
    return !!isValid;
  } catch (error) {
    return false;
  }
}

/**
 * Get current user
 * @returns {UserRecord | undefined}
 */
export async function getCurrentUser(): Promise<UserRecord | undefined> {
  const session = await getSession();

  if (!(await isUserAuthenticated(session)) || !session) {
    return undefined;
  }

  const decodedIdToken = await auth.verifySessionCookie(session);
  const currentUser = await auth.getUser(decodedIdToken.uid);

  return currentUser;
}
