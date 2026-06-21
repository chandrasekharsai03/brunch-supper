import { NextRequest, NextResponse } from 'next/server';
import { create } from '@/lib/db';
import { generateId } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const entry = {
      id: generateId(),
      type: body.type || 'contact',
      name: body.name,
      mobile: body.mobile,
      message: body.message,
      date: body.date || '',
      time: body.time || '',
      guests: body.guests || '',
      createdAt: new Date().toISOString(),
    };
    await create('contacts', entry);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
