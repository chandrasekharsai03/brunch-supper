import { NextRequest, NextResponse } from 'next/server';
import { getAll, create, update, remove, getById } from '@/lib/db';
import { generateId } from '@/lib/utils';
import type { MenuItem } from '@/types';

export async function GET() {
  const items = await getAll<MenuItem>('menu');
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const item: MenuItem = {
      id: generateId(),
      name: body.name,
      description: body.description || '',
      price: Number(body.price),
      category: body.category,
      image: body.image || '/images/paneer-butter-masala.jpg',
      isPopular: Boolean(body.isPopular),
      isChefSpecial: Boolean(body.isChefSpecial),
      isAvailable: body.isAvailable !== false,
      createdAt: new Date().toISOString(),
    };
    await create('menu', item);
    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    const updated = await update<MenuItem>('menu', id, updates);
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
  const removed = await remove<MenuItem>('menu', id);
  if (!removed) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
