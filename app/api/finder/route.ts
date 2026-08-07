import { NextRequest, NextResponse } from 'next/server';
import { dbRepository } from '../../../lib/dbRepository';
import { FinderAnswer } from '../../../types/tool';

export async function POST(req: NextRequest) {
  try {
    const answer: FinderAnswer = await req.json();
    const recommendations = dbRepository.evaluateFinder(answer);
    return NextResponse.json({ recommendations });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Invalid request' }, { status: 400 });
  }
}
