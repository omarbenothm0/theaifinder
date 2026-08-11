import { NextResponse } from 'next/server';
import { dbRepository } from '../../../lib/dbRepository';

export async function GET() {
  const personas = await dbRepository.getPersonas();
  return NextResponse.json(personas);
}
