import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { SESSION_COOKIE } from '@/constants/cookies';
import { revokeAllSessions } from '@/lib/firebase/auth';

/**
 * Clears user session cookie
 */
export async function GET(): Promise<NextResponse> {
  try {
    const sessionCookie = cookies().get(SESSION_COOKIE)?.value;

    if (!sessionCookie) {
      return NextResponse.json({ success: false, error: 'Session not found.' }, { status: 400 });
    }

    cookies().delete(SESSION_COOKIE);

    await revokeAllSessions(sessionCookie);

    return NextResponse.json({ success: true, data: 'Signed out successfully.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
