import { NextResponse } from 'next/server';
import { dbRepository } from '../../../lib/dbRepository';

export async function GET() {
  const comparisons = await dbRepository.getComparisons();
  return NextResponse.json(comparisons);
}
