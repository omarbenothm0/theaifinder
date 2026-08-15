import { NextRequest, NextResponse } from 'next/server';
import { FinderRepository } from '../../../lib/repositories/finder.repository';
import { FinderAnswer } from '../../../types/tool';
import {
  checkRateLimit,
  getClientIdentifier,
  rateLimitResponse,
} from '../../../lib/rate-limit';

export async function POST(req: NextRequest) {
  const clientId = getClientIdentifier(req);
  const limit = checkRateLimit(clientId, {
    key: 'finder',
    limit: 20,
    windowSec: 60 * 10,
  });

  if (!limit.allowed) {
    return rateLimitResponse(limit.resetAt);
  }

  try {
    const answer: FinderAnswer = await req.json();
    if (!answer.useCase?.trim() || !answer.role?.trim() || !answer.budgetPreference?.trim()) {
      return NextResponse.json(
        { error: 'useCase, role, and budgetPreference are required' },
        { status: 400 }
      );
    }

    const recommendations = await FinderRepository.evaluateFinder(answer);
    return NextResponse.json({ recommendations });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Invalid request' }, { status: 400 });
  }
}
