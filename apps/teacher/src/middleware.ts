import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Rewrite /teacher/* → /vi/* so users can access /teacher/attendance etc.
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith('/teacher')) {
    const rewrittenPath = pathname.replace(/^\/teacher/, '/vi');
    const url = request.nextUrl.clone();
    url.pathname = rewrittenPath;
    return NextResponse.rewrite(url);
  }

  const response = intlMiddleware(request);

  // Preserve query params (especially token) through locale redirects
  const redirectLocation = response.headers.get('location');
  if (redirectLocation && request.nextUrl.search) {
    try {
      const redirectUrl = new URL(redirectLocation, request.url);
      // Merge original query params into the redirect URL
      const originalParams = request.nextUrl.searchParams;
      originalParams.forEach((value, key) => {
        if (!redirectUrl.searchParams.has(key)) {
          redirectUrl.searchParams.set(key, value);
        }
      });
      return NextResponse.redirect(redirectUrl, response.status as 301 | 302 | 303 | 307 | 308);
    } catch {
      // If URL parsing fails, return the original response
    }
  }

  return response;
}

export const config = {
  // Match internationalized pathnames and any path that needs locale rewriting
  matcher: ['/', '/(vi|en)/:path*', '/teacher/:path*', '/((?!_next|api|favicon\\.ico|.*\\.).*)']
};
