import { NextResponse } from 'next/server';
import { dbRepository } from '../../../lib/dbRepository';

export async function GET() {
  const comparisons = dbRepository.getComparisons();
  return NextResponse.json(comparisons);
}
