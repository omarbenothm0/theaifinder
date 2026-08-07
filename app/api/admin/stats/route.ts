import { NextRequest, NextResponse } from 'next/server';
import { dbRepository } from '../../../../lib/dbRepository';
import { requireAdmin } from '../../../../lib/auth/adminSession';

export async function GET(req: NextRequest) {
  const authError = await requireAdmin(req);
  if (authError) return authError;

  const stats = dbRepository.getAdminStats();
  return NextResponse.json(stats);
}
