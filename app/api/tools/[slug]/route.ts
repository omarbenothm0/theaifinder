import { NextRequest, NextResponse } from 'next/server';
import { ToolRepository } from '../../../../lib/repositories/tool.repository';
import { isAdminAuthenticatedFromRequest } from '../../../../lib/auth/edgeSession';
import {
  validateToolInput,
  validateToolForPublish,
  formatValidationErrors,
} from '../../../../lib/validation/tool.validation';

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

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const success = await ToolRepository.deleteTool(slug);

  if (!success) {
    return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Tool deleted successfully' });
}
