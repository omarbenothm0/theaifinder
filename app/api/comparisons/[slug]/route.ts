import { NextRequest, NextResponse } from 'next/server';
import { ComparisonRepository } from '../../../../lib/repositories/comparison.repository';
import { ToolRepository } from '../../../../lib/repositories/tool.repository';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const comp = await ComparisonRepository.getComparisonBySlug(slug);

  if (!comp) {
    return NextResponse.json({ error: 'Comparison not found' }, { status: 404 });
  }

  const tool1 = await ToolRepository.getToolBySlug(comp.tool1Slug);
  const tool2 = await ToolRepository.getToolBySlug(comp.tool2Slug);

  return NextResponse.json({ comparison: comp, tool1, tool2 });
}
