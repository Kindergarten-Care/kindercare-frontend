import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function handleLocaleRouting(request: NextRequest, defaultLocale: string = 'vi') {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.rewrite(new URL(`/${defaultLocale}`, request.url));
  }

  if (pathname === `/${defaultLocale}`) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
