import { NextRequest, NextResponse } from 'next/server';
import { ToolChangeRecordRepository } from '../../../../../lib/repositories/tool-change.repository';
import { getSessionFromCookie } from '../../../../../lib/auth/adminSession';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  // Verify admin session
  const session = await getSessionFromCookie();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const changes = await ToolChangeRecordRepository.getAllChanges(100);
    return NextResponse.json({ changes });
  } catch (error) {
    console.error('[admin/monitoring/changes] GET failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch changes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Verify admin session
  const session = await getSessionFromCookie();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { changeId, action } = body;

    if (action === 'review') {
      const updated = await ToolChangeRecordRepository.markChangeReviewed(changeId);
      return NextResponse.json({ change: updated });
    }

    if (action === 'resolve') {
      const updated = await ToolChangeRecordRepository.markChangeResolved(changeId);
      return NextResponse.json({ change: updated });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('[admin/monitoring/changes] POST failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update change' },
      { status: 500 }
    );
  }
}
