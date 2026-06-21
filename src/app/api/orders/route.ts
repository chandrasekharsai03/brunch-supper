import { NextRequest, NextResponse } from 'next/server';
import { getAll, create, update } from '@/lib/db';
import { generateId } from '@/lib/utils';
import type { PickupOrder } from '@/types';

export async function GET() {
  const items = await getAll<PickupOrder>('orders');
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const order: PickupOrder = {
      id: generateId(),
      items: body.items || [],
      totalAmount: Number(body.totalAmount),
      customerName: body.customerName,
      customerMobile: body.customerMobile,
      pickupTime: body.pickupTime,
      paymentMethod: body.paymentMethod || 'cash',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    await create('orders', order);
    return NextResponse.json(order, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    const updated = await update<PickupOrder>('orders', id, updates);
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
