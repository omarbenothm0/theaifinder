import { NextRequest, NextResponse } from 'next/server';
import { dbRepository } from '../../../../lib/dbRepository';
import { ReviewStatus } from '../../../../types/tool';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const VALID_STATUSES: Array<ReviewStatus | 'all'> = [
  'all',
  'pending',
  'approved',
  'rejected',
  'flagged',
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const statusParam = (searchParams.get('status') || 'pending') as ReviewStatus | 'all';

  if (!VALID_STATUSES.includes(statusParam)) {
    return NextResponse.json({ error: 'Invalid status filter' }, { status: 400 });
  }

  const reviews = await dbRepository.getReviewsForModeration({ status: statusParam });
  const pendingCount = await dbRepository.getPendingReviewCount();

  return NextResponse.json({ reviews, pendingCount });
}
