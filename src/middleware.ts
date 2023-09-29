import { NextResponse, type NextRequest } from 'next/server';

import { API_AUTH_LOGIN } from '@/common/constants/api';

/**
 * Middleware to check if user is authenticated if not redirect to login page
 */
// NOTE: now is protecting all pages, but you can use config.matcher to protect only some pages
// NOTE: placed in src folder due to a bug in next.js, normally should be placed in src/app
export async function middleware(req: NextRequest, res: NextResponse): Promise<NextResponse> {
  const session = req.cookies.get('session');

  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url), { status: 302 });
  }

  // GET request to check if user is authenticated
  const loginStatus = await fetch(`${req.nextUrl.origin}${API_AUTH_LOGIN}`, {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  if (loginStatus.status !== 200) {
    return NextResponse.redirect(new URL('/login', req.url), { status: 302 });
  }

  return NextResponse.next();
}

/**
 * Add routes to be protected
 */
export const config = {
  matcher: ['/', '/dashboard/:path*'],
};
