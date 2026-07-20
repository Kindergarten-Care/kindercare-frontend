import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
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
  matcher: ['/', '/(vi|en)/:path*', '/((?!_next|api|favicon\\.ico|.*\\.).*)']
};
