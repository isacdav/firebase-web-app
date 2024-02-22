import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { SESSION_COOKIE } from '@/constants/cookies';
import { createSessionCookie } from '@/lib/firebase/auth';

/**
 * Save user session cookie for server-side authentication
 * This token can be changed if the token in the client is changed
 */
export async function POST(): Promise<NextResponse> {
  try {
    const authorization = headers().get('Authorization');

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Error('No token provided');
    }

    const idToken = authorization.split('Bearer ')[1];

    if (!idToken) {
      throw new Error('Token not found');
    }

    // expressed this way for readability
    const expiresIn = 1000 * 60 * 60 * 24 * 5; // 5 days

    const firebaseSessionCookie = await createSessionCookie(idToken, { expiresIn });

    const cookie = {
      name: SESSION_COOKIE,
      value: firebaseSessionCookie,
      maxAge: expiresIn,
      secure: true,
      httpOnly: true,
    };

    cookies().set(cookie);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 401 });
  }
}
