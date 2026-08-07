import { NextRequest, NextResponse } from 'next/server';
import { clearAdminSessionCookie } from '../../../../lib/auth/adminSession';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const origin = req.nextUrl.origin;
    const response: NextResponse = NextResponse.redirect(new URL('/admin/login', origin));
    clearAdminSessionCookie(response);
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    );
    return response;
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Logout failed' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const response: NextResponse = NextResponse.redirect(new URL('/admin/login', origin));
  clearAdminSessionCookie(response);
  response.headers.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  );
  return response;
}
