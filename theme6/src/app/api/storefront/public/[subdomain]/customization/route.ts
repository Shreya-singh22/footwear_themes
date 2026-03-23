import { NextResponse } from 'next/server';
import { CUSTOMIZATION } from '@/data/products';

export async function GET() {
  return NextResponse.json(CUSTOMIZATION);
}
