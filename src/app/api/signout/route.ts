import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * Clears user session cookie
 */
export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
  const options = {
    name: 'session',
    value: '',
    maxAge: 0,
  };

  cookies().set(options);

  return NextResponse.json({}, { status: 200 });
}
