import { NextResponse } from 'next/server';
import { dbRepository } from '../../../../lib/dbRepository';

export async function GET() {
  const stats = dbRepository.getAdminStats();
  return NextResponse.json(stats);
}
