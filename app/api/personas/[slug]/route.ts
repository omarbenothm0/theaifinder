import { NextRequest, NextResponse } from 'next/server';
import { PersonaRepository } from '../../../../lib/repositories/persona.repository';
import { ToolRepository } from '../../../../lib/repositories/tool.repository';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const persona = await PersonaRepository.getPersonaBySlug(slug);

  if (!persona) {
    return NextResponse.json({ error: 'Persona not found' }, { status: 404 });
  }

  const tools = (await ToolRepository.getTools({ persona: persona.slug })).tools;
  return NextResponse.json({ persona, tools });
}
