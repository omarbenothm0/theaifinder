import { NextRequest, NextResponse } from 'next/server';
import { MonitoringOrchestratorService } from '../../../../lib/monitoring/orchestrator.service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Simple secret-based auth for cron
const CRON_SECRET = process.env.CRON_SECRET || 'dev-cron-secret';

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const summary = await MonitoringOrchestratorService.runMonitoring();
    return NextResponse.json(summary);
  } catch (error) {
    console.error('[cron/monitoring] GET failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Monitoring failed' },
      { status: 500 }
    );
  }
}
