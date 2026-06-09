import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: any) {
  console.log("MIDDLEWARE RUNNING FOR:", request.url);
  const response = intlMiddleware(request);
  console.log("MIDDLEWARE REWRITE/REDIRECT TO:", response.headers.get('x-middleware-rewrite') || response.headers.get('location'));
  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(vi|en)/:path*']
};
