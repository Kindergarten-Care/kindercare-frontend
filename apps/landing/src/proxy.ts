import type { NextRequest } from 'next/server';
import { handleLocaleRouting } from '@kindercare/core';

export function proxy(request: NextRequest) {
  return handleLocaleRouting(request, 'vi');
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
