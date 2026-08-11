import { NextResponse } from 'next/server';
import { dbRepository } from '../../../lib/dbRepository';

export async function GET() {
  const categories = await dbRepository.getCategories();
  return NextResponse.json(categories);
}
