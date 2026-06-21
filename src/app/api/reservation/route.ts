import { NextRequest, NextResponse } from 'next/server';
import { getAll, create, update, remove } from '@/lib/db';
import { generateId } from '@/lib/utils';
import type { Reservation } from '@/types';

export async function GET() {
  const items = await getAll<Reservation>('reservations');
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const reservation: Reservation = {
      id: generateId(),
      name: body.name,
      mobile: body.mobile,
      email: body.email || '',
      date: body.date,
      time: body.time,
      guests: Number(body.guests),
      occasion: body.occasion || '',
      notes: body.notes || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    await create('reservations', reservation);
    return NextResponse.json(reservation, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    const updated = await update<Reservation>('reservations', id, updates);
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  const removed = await remove<Reservation>('reservations', id);
  if (!removed) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
