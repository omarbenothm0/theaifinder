import { NextRequest, NextResponse } from 'next/server';
import { CategoryRepository } from '../../../../lib/repositories/category.repository';
import { ToolRepository } from '../../../../lib/repositories/tool.repository';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const cat = await CategoryRepository.getCategoryBySlug(slug);

  if (!cat) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }

  const tools = (await ToolRepository.getTools({ category: cat.slug })).tools;
  return NextResponse.json({ category: cat, tools });
}
