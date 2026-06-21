import { NextRequest, NextResponse } from 'next/server';
import { getAll, create } from '@/lib/db';
import { generateId } from '@/lib/utils';
import type { Lead } from '@/types';

export async function GET() {
  const items = await getAll<Lead>('leads');
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const lead: Lead = {
      id: generateId(),
      name: body.name,
      mobile: body.mobile,
      offer: body.offer || '',
      createdAt: new Date().toISOString(),
    };
    await create('leads', lead);
    return NextResponse.json(lead, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
