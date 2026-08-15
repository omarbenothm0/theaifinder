import { NextRequest, NextResponse } from 'next/server';
import { clearAdminSessionCookie, getSessionFromCookie } from '../../../../lib/auth/adminSession';
import { AdminAuditLogRepository } from '../../../../lib/repositories/audit.repository';
import { AdminAuditActionEnum } from '@prisma/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromCookie();
    const actor = session?.sub || 'unknown';

    await AdminAuditLogRepository.logAction({
      action: AdminAuditActionEnum.admin_logout,
      actor,
      success: true,
      details: 'Admin logout',
    });

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
  const session = await getSessionFromCookie();
  const actor = session?.sub || 'unknown';

  await AdminAuditLogRepository.logAction({
    action: AdminAuditActionEnum.admin_logout,
    actor,
    success: true,
    details: 'Admin logout',
  });

  const origin = req.nextUrl.origin;
  const response: NextResponse = NextResponse.redirect(new URL('/admin/login', origin));
  clearAdminSessionCookie(response);
  response.headers.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  );
  return response;
}
