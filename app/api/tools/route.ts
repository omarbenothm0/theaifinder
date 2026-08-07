import { NextRequest, NextResponse } from 'next/server';
import { dbRepository } from '../../../lib/dbRepository';
import { ToolFilterOptions } from '../../../types/tool';
import { requireAdmin } from '../../../lib/auth/adminSession';

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
    limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : 50
  };

  const result = dbRepository.getTools(options);
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const newTool = dbRepository.createTool(body);
    return NextResponse.json(newTool, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create tool' }, { status: 400 });
  }
}
