import { NextResponse } from 'next/server';
import { PersonaRepository } from '../../../lib/repositories/persona.repository';

export async function GET() {
  const personas = await PersonaRepository.getPersonas();
  return NextResponse.json(personas);
}
