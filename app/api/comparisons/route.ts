import { NextResponse } from 'next/server';
import { ComparisonRepository } from '../../../lib/repositories/comparison.repository';

export async function GET() {
  const comparisons = await ComparisonRepository.getComparisons();
  return NextResponse.json(comparisons);
}
