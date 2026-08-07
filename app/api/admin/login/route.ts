import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, setSessionCookie } from '../../../../lib/auth/adminSession';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (typeof password !== 'string' || !password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    if (!(await verifyPassword(password))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    return await setSessionCookie(response);
  } catch {
    return NextResponse.json({ error: 'Authentication unavailable' }, { status: 500 });
  }
}
