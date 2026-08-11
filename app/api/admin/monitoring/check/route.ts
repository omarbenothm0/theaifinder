import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  getClientIdentifier,
  rateLimitResponse,
} from '../../../../../lib/rate-limit';
import { MonitoringService } from '../../../../../lib/monitoring/monitoring.service';
import { getMonitoringConfig } from '../../../../../lib/monitoring/config';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  const identifier = getClientIdentifier(request, 'admin');
  const rate = checkRateLimit(identifier, {
    key: 'admin-monitoring-check',
    limit: 30,
    windowSec: 60,
  });

  if (!rate.allowed) {
    return rateLimitResponse(rate.resetAt);
  }

  let body: { toolId?: string; toolIds?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  try {
    if (body.toolIds && Array.isArray(body.toolIds)) {
      const config = getMonitoringConfig();
      if (body.toolIds.length > config.maxBatchSize) {
        return NextResponse.json(
          { error: `Batch size exceeds maximum of ${config.maxBatchSize}` },
          { status: 400 }
        );
      }

      const batch = await MonitoringService.runWebsiteCheckBatch(body.toolIds);
      return NextResponse.json(batch);
    }

    if (!body.toolId || typeof body.toolId !== 'string') {
      return NextResponse.json({ error: 'toolId is required' }, { status: 400 });
    }

    const result = await MonitoringService.runWebsiteCheckForTool(body.toolId);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Monitoring check failed';
    const status = message === 'Tool not found' ? 404 : 500;
    console.error('[admin/monitoring/check] POST failed:', error);
    return NextResponse.json({ error: message }, { status });
  }
}
