import { NextRequest, NextResponse } from 'next/server';
import { ReviewRepository } from '../../../../../lib/repositories/review.repository';
import { getSessionFromCookie } from '../../../../../lib/auth/adminSession';
import { ReviewStatus } from '../../../../../types/tool';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type ModerationAction = 'approve' | 'reject' | 'flag';

const ACTION_TO_STATUS: Record<ModerationAction, ReviewStatus> = {
  approve: 'approved',
  reject: 'rejected',
  flag: 'flagged',
};

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let body: { action?: ModerationAction; moderationNotes?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.action || !ACTION_TO_STATUS[body.action]) {
    return NextResponse.json(
      { error: 'action must be one of: approve, reject, flag' },
      { status: 400 }
    );
  }

  const session = await getSessionFromCookie();
  if (!session?.valid) {
    return NextResponse.json({ error: 'Admin authentication required' }, { status: 401 });
  }
  const moderatedBy = session.sub;

  const updated = await ReviewRepository.moderateReview(
    id,
    ACTION_TO_STATUS[body.action],
    moderatedBy,
    body.moderationNotes
  );

  if (!updated) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 });
  }

  return NextResponse.json({ review: updated });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = await ReviewRepository.deleteReview(id);

  if (!deleted) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
