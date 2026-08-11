import { NextResponse } from 'next/server';
import { ToolService } from '../../../../lib/services/tool.service';
import { MonitoringService } from '../../../../lib/monitoring/monitoring.service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const toolsRes = await ToolService.getTools({ limit: 500, includeUnpublished: true });
    const summaries = await MonitoringService.getSummariesForTools(toolsRes.tools);
    return NextResponse.json({ summaries });
  } catch (error) {
    console.error('[admin/monitoring] GET failed:', error);
    return NextResponse.json({ error: 'Failed to load monitoring summaries' }, { status: 500 });
  }
}
