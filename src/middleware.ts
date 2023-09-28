import { type NextRequest, NextResponse } from 'next/server';

/**
 * Middleware to check if user is authenticated if not redirect to login page
 */
// NOTE: now is protecting all pages, but you can use config.matcher to protect only some pages
// NOTE: placed in src folder due to a bug in next.js, normally should be placed in src/app
export async function middleware(req: NextRequest, res: NextResponse): Promise<NextResponse> {
  const session = req.cookies.get('session');

  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const loginStatus = await fetch(`${req.nextUrl.origin}/api/login`, {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  if (loginStatus.status !== 200) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
};
