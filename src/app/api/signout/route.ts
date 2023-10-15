import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

import { SESSION } from '@/constants/cookies';

/**
 * Clears user session cookie
 */
export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
  const options = {
    name: SESSION,
    value: '',
    maxAge: 0,
  };

  cookies().set(options);

  return NextResponse.json({}, { status: 200 });
}
