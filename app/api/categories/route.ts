import { NextResponse } from 'next/server';
import { CategoryRepository } from '../../../lib/repositories/category.repository';

export async function GET() {
  const categories = await CategoryRepository.getCategories();
  return NextResponse.json(categories);
}
