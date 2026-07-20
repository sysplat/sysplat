import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  
  // Check if the hostname is exactly sysplat.pages.dev
  if (url.hostname === 'sysplat.pages.dev') {
    // Redirect to sysplat.com while keeping the same path
    return NextResponse.redirect(new URL(url.pathname, 'https://sysplat.com'));
  }

  return NextResponse.next();
}

export const config = {
  // Apply to all routes except API, Next static files, and images
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
