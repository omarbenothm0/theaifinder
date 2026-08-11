import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAdminAuthenticatedFromRequest } from './lib/auth/edgeSession';

const PUBLIC_ADMIN_SUBPATHS: Array<string | RegExp> = ['/admin/login'];

const matchesPublicAdminPath = (pathname: string): boolean => {
  return PUBLIC_ADMIN_SUBPATHS.some((p) =>
    typeof p === 'string' ? pathname === p || pathname.startsWith(p + '/') : p.test(pathname)
  );
};

const isWriteApiPath = (pathname: string): boolean => {
  const apiPrefix = '/api/';
  if (!pathname.startsWith(apiPrefix)) return false;
  return true;
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  );
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()'
  );

  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const isPublicAdminRoute = matchesPublicAdminPath(pathname);
    const isAdminLoginApi = pathname === '/api/admin/login' || pathname === '/api/admin/logout';

    if (!isPublicAdminRoute && !isAdminLoginApi) {
      const authed = await isAdminAuthenticatedFromRequest(request);
      if (!authed) {
        if (pathname.startsWith('/api/')) {
          return NextResponse.json(
            { error: 'Admin authentication required' },
            { status: 401 }
          );
        }
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = '/admin/login';
        loginUrl.searchParams.set('from', pathname);
        const redirect = NextResponse.redirect(loginUrl);
        redirect.headers.set('X-Frame-Options', 'SAMEORIGIN');
        redirect.headers.set('X-Content-Type-Options', 'nosniff');
        return redirect;
      }
    }
  }

  const WRITE_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);
  if (isWriteApiPath(pathname) && WRITE_METHODS.has(request.method)) {
    const isReviewsPublicWrite = pathname === '/api/reviews' && request.method === 'POST';
    const isFinderInference = pathname === '/api/finder' && request.method === 'POST';
    if (isReviewsPublicWrite || isFinderInference) {
      return response;
    }
    const isLoginOrLogout =
      pathname === '/api/admin/login' || pathname === '/api/admin/logout';
    if (isLoginOrLogout) {
      return response;
    }
    const authed = await isAdminAuthenticatedFromRequest(request);
    if (!authed) {
      return NextResponse.json(
        { error: 'Admin authentication required for mutations' },
        { status: 401 }
      );
    }
  }

  if (request.method === 'GET' && pathname.startsWith('/api/admin/')) {
    const authed = await isAdminAuthenticatedFromRequest(request);
    if (!authed) {
      return NextResponse.json(
        { error: 'Admin authentication required' },
        { status: 401 }
      );
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/tools/:path*',
    '/api/categories/:path*',
    '/api/comparisons/:path*',
    '/api/personas/:path*',
    '/api/reviews/:path*',
    '/api/finder',
  ],
};
