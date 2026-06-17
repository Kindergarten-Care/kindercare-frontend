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
  // Match internationalized pathnames and any path that needs locale rewriting
  matcher: ['/', '/(vi|en)/:path*', '/((?!_next|api|favicon\\.ico|.*\\.).*)']
};
