import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeJwt } from 'jose';
import { signToken, verifyToken } from '@/lib/auth/session';
import {
  getLocaleFromPathname,
  getPreferredLocale,
  localizePath,
  stripLocaleFromPathname
} from '@/lib/i18n/config';

const protectedRoutes = '/dashboard';
const SESSION_REFRESH_WINDOW_MS = 6 * 60 * 60 * 1000;

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameLocale = getLocaleFromPathname(pathname);
  const locale =
    pathnameLocale ||
    getPreferredLocale(
      request.headers.get('accept-language'),
      request.cookies.get('locale')?.value
    );

  if (!pathnameLocale) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = localizePath(locale, pathname);
    return NextResponse.redirect(redirectUrl);
  }

  const normalizedPath = stripLocaleFromPathname(pathname);
  const sessionCookie = request.cookies.get('session');
  const isProtectedRoute = normalizedPath.startsWith(protectedRoutes);

  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(
      new URL(localizePath(locale, '/sign-in'), request.url)
    );
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-locale', locale);

  let res = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });

  if (sessionCookie && request.method === 'GET') {
    try {
      const decoded = decodeJwt(sessionCookie.value);
      const expiresAt = typeof decoded.exp === 'number' ? decoded.exp * 1000 : 0;
      const shouldRefresh =
        expiresAt > 0 && expiresAt - Date.now() <= SESSION_REFRESH_WINDOW_MS;

      if (shouldRefresh) {
        const parsed = await verifyToken(sessionCookie.value);
        const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);

        res.cookies.set({
          name: 'session',
          value: await signToken({
            ...parsed,
            expires: expiresInOneDay.toISOString()
          }),
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          expires: expiresInOneDay
        });
      }
    } catch (error) {
      console.error('Error updating session:', error);
      res.cookies.delete('session');
      if (isProtectedRoute) {
        return NextResponse.redirect(
          new URL(localizePath(locale, '/sign-in'), request.url)
        );
      }
    }
  }

  res.cookies.set('locale', locale, {
    path: '/',
    sameSite: 'lax'
  });

  return res;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
  runtime: 'nodejs'
};
