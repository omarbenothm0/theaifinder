import { NextRequest, NextResponse } from 'next/server';
import {
  createSession,
  setAdminSessionCookie,
  verifyAdminPassword,
  getAdminCredentials,
} from '../../../../lib/auth/adminSession';
import { AdminAuditLogRepository } from '../../../../lib/repositories/audit.repository';
import { AdminAuditActionEnum } from '@prisma/client';
import { getClientIdentifier, checkRateLimit, rateLimitResponse } from '../../../../lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // Rate limiting: 10 attempts per 15 minutes per IP
    const identifier = getClientIdentifier(req);
    const rate = checkRateLimit(identifier, {
      key: 'admin_login',
      limit: 10,
      windowSec: 60 * 15, // 15 minutes
    });

    if (!rate.allowed) {
      return rateLimitResponse(rate.resetAt);
    }

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
      const ipAddress = getClientIdentifier(req);
      
      await AdminAuditLogRepository.logAction({
        action: AdminAuditActionEnum.admin_login_failed,
        actor: username,
        ipAddress,
        success: false,
        details: `Failed login for user: ${username}`,
      });

      await new Promise((resolve) => setTimeout(resolve, 650));

      return NextResponse.redirect(
        new URL('/admin/login?err=invalid', origin)
      );
    }

    const sessionToken = await createSession(expectedCreds.username);

    await AdminAuditLogRepository.logAction({
      action: AdminAuditActionEnum.admin_login,
      actor: expectedCreds.username,
      success: true,
      details: 'Admin login',
    });

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