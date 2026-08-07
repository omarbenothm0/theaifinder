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
    const body = await req.json();
    const { username, password } = body || {};

    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const expectedCreds = getAdminCredentials();
    const usernameOk = username.toLowerCase().trim() === expectedCreds.username.toLowerCase().trim();
    const passwordOk = verifyAdminPassword(password);

    if (!usernameOk || !passwordOk) {
      await new Promise((r) => setTimeout(r, 650));
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const sessionToken = createSession(expectedCreds.username);
    const redirectTo = req.nextUrl.searchParams.get('from') || '/admin';

    const shouldRedirect =
      req.headers.get('accept')?.includes('text/html') ||
      (body && (body as any).redirect === true);

    const response: NextResponse = shouldRedirect
      ? NextResponse.redirect(new URL(redirectTo, req.nextUrl.origin))
      : NextResponse.json(
          { success: true, redirect: redirectTo },
          { status: 200 }
        );

    setAdminSessionCookie(response, sessionToken);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return response;
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Authentication failed' },
      { status: 500 }
    );
  }
}
