import admin from 'firebase-admin';
import { cookies, headers } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

import { initFirebaseAdmin } from '@/lib/firebase/admin';

initFirebaseAdmin();

/**
 * User login validation based on cookies
 */
export async function GET(req: NextRequest, res: NextResponse): Promise<NextResponse> {
  const session = cookies().get('session')?.value ?? '';
  if (!session) {
    return NextResponse.json({ isAuth: false }, { status: 401 });
  }

  const decoded = await admin.auth().verifySessionCookie(session, true);
  if (!decoded) {
    return NextResponse.json({ isAuth: false }, { status: 401 });
  }

  return NextResponse.json({ isAuth: true }, { status: 200 });
}

/**
 * Save user session cookie
 */
export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
  const authorization = headers().get('Authorization');

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return NextResponse.json({}, { status: 401 });
  }

  const idToken = authorization.split('Bearer ')[1];
  const decodedToken = await admin.auth().verifyIdToken(idToken);

  if (decodedToken) {
    // expressed this way for readability
    const expiresIn = 1000 * 60 * 60 * 24 * 5;
    const sessionCookie = await admin.auth().createSessionCookie(idToken, {
      expiresIn,
    });

    const options = {
      name: 'session',
      value: sessionCookie,
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    };

    cookies().set(options);
  }

  return NextResponse.json({}, { status: 200 });
}
