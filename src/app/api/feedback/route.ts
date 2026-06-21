import { NextRequest, NextResponse } from 'next/server';
import { getAll, create } from '@/lib/db';
import { generateId } from '@/lib/utils';
import type { Feedback } from '@/types';

export async function GET() {
  const items = await getAll<Feedback>('feedback');
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const feedback: Feedback = {
      id: generateId(),
      name: body.name,
      mobile: body.mobile || '',
      rating: Number(body.rating) || 5,
      message: body.message,
      createdAt: new Date().toISOString(),
    };
    await create('feedback', feedback);
    return NextResponse.json(feedback, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
