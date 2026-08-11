import { NextRequest, NextResponse } from 'next/server';
import { dbRepository } from '../../../../lib/dbRepository';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const cat = await dbRepository.getCategoryBySlug(slug);

  if (!cat) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }

  const tools = (await dbRepository.getTools({ category: cat.slug })).tools;
  return NextResponse.json({ category: cat, tools });
}
