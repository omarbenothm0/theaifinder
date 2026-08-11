import { NextRequest, NextResponse } from 'next/server';
import { dbRepository } from '../../../lib/dbRepository';
import {
  validateReviewInput,
} from '../../../lib/validation/review.validation';
import {
  checkRateLimit,
  getClientIdentifier,
  rateLimitResponse,
} from '../../../lib/rate-limit';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const toolSlug = searchParams.get('toolSlug');

  if (!toolSlug) {
    return NextResponse.json({ error: 'toolSlug query param is required' }, { status: 400 });
  }

  const reviews = await dbRepository.getReviewsForTool(toolSlug);
  return NextResponse.json(reviews);
}

export async function POST(req: NextRequest) {
  const clientId = getClientIdentifier(req);
  const limit = checkRateLimit(clientId, {
    key: 'reviews',
    limit: 5,
    windowSec: 60 * 15,
  });

  if (!limit.allowed) {
    return rateLimitResponse(limit.resetAt);
  }

  try {
    const body = await req.json();
    const errors = validateReviewInput(body);
    if (errors.length > 0) {
      return NextResponse.json(
        {
          error: errors.map((e) => `${e.field}: ${e.message}`).join('; '),
          validationErrors: errors,
        },
        { status: 400 }
      );
    }

    const review = await dbRepository.addReview(body);
    return NextResponse.json(review, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to submit review' }, { status: 400 });
  }
}
