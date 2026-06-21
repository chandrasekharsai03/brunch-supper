import { NextRequest, NextResponse } from 'next/server';
import { getAll, create, remove } from '@/lib/db';
import { generateId } from '@/lib/utils';
import type { GalleryImage } from '@/types';

export async function GET() {
  const items = await getAll<GalleryImage>('gallery');
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const image: GalleryImage = {
      id: generateId(),
      url: body.url,
      alt: body.alt || 'Gallery image',
      category: body.category || 'Food',
      createdAt: new Date().toISOString(),
    };
    await create('gallery', image);
    return NextResponse.json(image, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  const removed = await remove<GalleryImage>('gallery', id);
  if (!removed) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
