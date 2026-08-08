import { NextRequest, NextResponse } from 'next/server';
import { dbRepository } from '../../../../lib/dbRepository';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const comp = await dbRepository.getComparisonBySlug(slug);

  if (!comp) {
    return NextResponse.json({ error: 'Comparison not found' }, { status: 404 });
  }

  const tool1 = await dbRepository.getToolBySlug(comp.tool1Slug);
  const tool2 = await dbRepository.getToolBySlug(comp.tool2Slug);

  return NextResponse.json({ comparison: comp, tool1, tool2 });
}
