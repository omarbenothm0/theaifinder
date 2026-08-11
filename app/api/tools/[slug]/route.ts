import { NextRequest, NextResponse } from 'next/server';
import { dbRepository } from '../../../../lib/dbRepository';
import {
  validateToolInput,
  formatValidationErrors,
} from '../../../../lib/validation/tool.validation';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const tool = await dbRepository.getToolBySlug(slug, { includeUnpublished: true });

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
  const errors = validateToolInput(body);
  if (errors.length > 0) {
    return NextResponse.json(
      { error: formatValidationErrors(errors), validationErrors: errors },
      { status: 400 }
    );
  }

  const updated = await dbRepository.updateTool(slug, body);

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
  const success = await dbRepository.deleteTool(slug);

  if (!success) {
    return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Tool deleted successfully' });
}