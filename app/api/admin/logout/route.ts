import { NextResponse } from 'next/server';
import { clearSessionCookie } from '../../../../lib/auth/adminSession';

export async function POST() {
  const response = NextResponse.json({ success: true });
  return clearSessionCookie(response);
}
