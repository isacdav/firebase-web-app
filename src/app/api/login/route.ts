import { cookies, headers } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

import { SESSION } from '@/constants/cookies';
import { admin } from '@/lib/firebase/admin';

/**
 * User login validation based on cookies
 */
export async function GET(req: NextRequest, res: NextResponse): Promise<NextResponse> {
  try {
    const session = cookies().get(SESSION)?.value ?? '';
    if (!session) {
      throw new Error('No session cookie');
    }

    const decoded = await admin.auth().verifySessionCookie(session, true);
    if (!decoded) {
      throw new Error('Invalid session');
    }

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 401 });
  }
}

/**
 * Save user session cookie
 */
export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
  try {
    const authorization = headers().get('Authorization');

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Error('No token provided');
    }

    const idToken = authorization.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    if (decodedToken) {
      // expressed this way for readability
      const expiresIn = 1000 * 60 * 60 * 24 * 10;
      const sessionCookie = await admin.auth().createSessionCookie(idToken, {
        expiresIn,
      });

      const options = {
        name: SESSION,
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: process.env.SECURE_COOKIE === 'true',
      };

      cookies().set(options);
    }

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 401 });
  }
}
