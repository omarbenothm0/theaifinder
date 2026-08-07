import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuthenticated } from './lib/auth/adminSession';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const securityHeaders = {
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
  };

  // Allow the login page itself to be accessed without auth
  if (pathname === '/admin/login') {
    const response = NextResponse.next();
    for (const [k, v] of Object.entries(securityHeaders)) response.headers.set(k, v);
    return response;
  }

  // Protect all other /admin routes
  if (!(await isAuthenticated(request))) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/admin/login';
    const response = NextResponse.redirect(loginUrl);
    for (const [k, v] of Object.entries(securityHeaders)) response.headers.set(k, v);
    return response;
  }

  const response = NextResponse.next();
  for (const [k, v] of Object.entries(securityHeaders)) response.headers.set(k, v);
  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
