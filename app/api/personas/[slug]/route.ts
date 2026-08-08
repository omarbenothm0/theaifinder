import { NextRequest, NextResponse } from 'next/server';
import { dbRepository } from '../../../../lib/dbRepository';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const persona = await dbRepository.getPersonaBySlug(slug);

  if (!persona) {
    return NextResponse.json({ error: 'Persona not found' }, { status: 404 });
  }

  const tools = (await dbRepository.getTools({ persona: persona.slug })).tools;
  return NextResponse.json({ persona, tools });
}
