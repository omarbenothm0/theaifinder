import { NextRequest, NextResponse } from 'next/server';
import { dbRepository } from '../../../lib/dbRepository';

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
  try {
    const body = await req.json();
    if (!body.toolSlug || !body.authorName || !body.rating || !body.comment) {
      return NextResponse.json({ error: 'Missing required review fields' }, { status: 400 });
    }

    const review = await dbRepository.addReview(body);
    return NextResponse.json(review, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to submit review' }, { status: 400 });
  }
}