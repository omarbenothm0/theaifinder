import { NextRequest, NextResponse } from 'next/server';
import {
  createSession,
  setAdminSessionCookie,
  verifyAdminPassword,
  getAdminCredentials,
} from '../../../../lib/auth/adminSession';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';

    let username = '';
    let password = '';
    let redirectTo = '/admin';
        // Build the redirect origin safely from the incoming request Host header
    const host = req.headers.get('host') || 'localhost:3000';
    const forwardedProto = req.headers.get('x-forwarded-proto');

    const isLocalhost =
      host.startsWith('localhost') ||
      host.startsWith('127.0.0.1') ||
      host.startsWith('0.0.0.0');

    const protocol =
      forwardedProto || (isLocalhost ? 'http' : 'https');

    const origin = `${protocol}://${host}`;

    if (contentType.includes('application/json')) {
      const body = await req.json();
      username = body?.username || '';
      password = body?.password || '';
      redirectTo = body?.redirect || '/admin';
    } else {
      const formData = await req.formData();
      username = String(formData.get('username') || '');
      password = String(formData.get('password') || '');
      redirectTo = String(formData.get('from') || '/admin');
    }

    if (!username || !password) {
      return NextResponse.redirect(
        new URL('/admin/login?err=invalid', origin)
      );
    }

    const expectedCreds = getAdminCredentials();

    const usernameOk =
      username.trim().toLowerCase() ===
      expectedCreds.username.trim().toLowerCase();

    const passwordOk = verifyAdminPassword(password);

    if (!usernameOk || !passwordOk) {
      await new Promise((resolve) => setTimeout(resolve, 650));

      return NextResponse.redirect(
        new URL('/admin/login?err=invalid', origin)
      );
    }

    const sessionToken = await createSession(expectedCreds.username);

    const response = NextResponse.redirect(
      new URL(redirectTo, origin)
    );

    setAdminSessionCookie(response, sessionToken);

    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    );

    return response;
  } catch (err: any) {
    console.error('Admin login error:', err);

    return NextResponse.json(
      { error: err?.message || 'Authentication failed' },
      { status: 500 }
    );
  }
}