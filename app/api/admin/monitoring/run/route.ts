import { NextRequest, NextResponse } from 'next/server';
import { MonitoringOrchestratorService } from '../../../../../lib/monitoring/orchestrator.service';
import { getSessionFromCookie } from '../../../../../lib/auth/adminSession';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  // Verify admin session
  const session = await getSessionFromCookie();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const summary = await MonitoringOrchestratorService.runMonitoring();
    return NextResponse.json(summary);
  } catch (error) {
    console.error('[admin/monitoring/run] POST failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Monitoring failed' },
      { status: 500 }
    );
  }
}
