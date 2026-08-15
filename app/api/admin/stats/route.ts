import { NextResponse } from 'next/server';
import { AdminRepository } from '../../../../lib/repositories/admin.repository';

export async function GET() {
  const stats = await AdminRepository.getAdminStats();
  return NextResponse.json(stats);
}