import { NextRequest, NextResponse } from 'next/server';
import { ToolRepository } from '../../../lib/repositories/tool.repository';
import { ToolFilterOptions } from '../../../types/tool';
import {
  validateToolInput,
  validateToolForPublish,
  formatValidationErrors,
} from '../../../lib/validation/tool.validation';
import {
  databaseUnavailableResponse,
  isDatabaseUnavailableError,
} from '../../../lib/api/database-unavailable';
import { getSessionFromCookie } from '../../../lib/auth/adminSession';
import { AdminAuditLogRepository } from '../../../lib/repositories/audit.repository';
import { AdminAuditActionEnum, AdminAuditEntityTypeEnum } from '@prisma/client';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const options: ToolFilterOptions = {
    search: searchParams.get('search') || undefined,
    category: searchParams.get('category') || undefined,
    pricing: (searchParams.get('pricing') as any) || undefined,
    persona: searchParams.get('persona') || undefined,
    hasApi: searchParams.get('hasApi') === 'true',
    hasMobileApp: searchParams.get('hasMobileApp') === 'true',
    hasExtension: searchParams.get('hasExtension') === 'true',
    hasFreeOption: searchParams.get('hasFreeOption') === 'true',
    minRating: searchParams.get('minRating') ? parseFloat(searchParams.get('minRating')!) : undefined,
    sortBy: (searchParams.get('sortBy') as any) || undefined,
    page: searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : 1,
    limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : 50,
    includeUnpublished: searchParams.get('includeUnpublished') === 'true',
  };

  try {
    const result = await ToolRepository.getTools(options);
    return NextResponse.json(result);
  } catch (error) {
    if (isDatabaseUnavailableError(error)) {
      return databaseUnavailableResponse();
    }
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const errors = [
      ...validateToolInput(body, { isCreate: true }),
      ...validateToolForPublish(body),
    ];
    if (errors.length > 0) {
      return NextResponse.json(
        { error: formatValidationErrors(errors), validationErrors: errors },
        { status: 400 }
      );
    }

    const newTool = await ToolRepository.createTool(body);

    const session = await getSessionFromCookie();
    const actor = session?.sub || 'unknown';

    await AdminAuditLogRepository.logAction({
      action: AdminAuditActionEnum.tool_create,
      entityType: AdminAuditEntityTypeEnum.tool,
      entityId: newTool.id,
      actor,
      details: `Created tool: ${newTool.name} (${newTool.slug})`,
    });

    return NextResponse.json(newTool, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create tool' }, { status: 400 });
  }
}
