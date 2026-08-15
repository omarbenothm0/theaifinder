import { NextRequest, NextResponse } from 'next/server';
import { ToolRepository } from '../../../../lib/repositories/tool.repository';
import { isAdminAuthenticatedFromRequest } from '../../../../lib/auth/edgeSession';
import { getSessionFromCookie } from '../../../../lib/auth/adminSession';
import {
  validateToolInput,
  validateToolForPublish,
  formatValidationErrors,
} from '../../../../lib/validation/tool.validation';
import { AdminAuditLogRepository } from '../../../../lib/repositories/audit.repository';
import { AdminAuditActionEnum, AdminAuditEntityTypeEnum } from '@prisma/client';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const isAdmin = await isAdminAuthenticatedFromRequest(req);

  const tool = isAdmin
    ? await ToolRepository.getToolBySlug(slug, { includeUnpublished: true })
    : await ToolRepository.getToolBySlug(slug);

  if (!tool) {
    return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
  }

  return NextResponse.json(tool);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await req.json();
  const errors = [
    ...validateToolInput(body),
    ...validateToolForPublish(body),
  ];
  if (errors.length > 0) {
    return NextResponse.json(
      { error: formatValidationErrors(errors), validationErrors: errors },
      { status: 400 }
    );
  }

  const updated = await ToolRepository.updateTool(slug, body);

  if (!updated) {
    return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
  }

  const session = await getSessionFromCookie();
  const actor = session?.sub || 'unknown';

  await AdminAuditLogRepository.logAction({
    action: AdminAuditActionEnum.tool_update,
    entityType: AdminAuditEntityTypeEnum.tool,
    entityId: updated.id,
    actor,
    details: `Updated tool: ${updated.slug}`,
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  const existing = await ToolRepository.getToolBySlug(slug, { includeUnpublished: true });
  if (!existing) {
    return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
  }

  const success = await ToolRepository.deleteTool(slug);

  if (!success) {
    return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
  }

  const session = await getSessionFromCookie();
  const actor = session?.sub || 'unknown';

  await AdminAuditLogRepository.logAction({
    action: AdminAuditActionEnum.tool_delete,
    entityType: AdminAuditEntityTypeEnum.tool,
    entityId: existing.id,
    actor,
    details: `Deleted tool: ${existing.name} (${existing.slug})`,
  });

  return NextResponse.json({ message: 'Tool deleted successfully' });
}
