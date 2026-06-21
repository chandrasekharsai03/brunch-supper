import { NextResponse } from 'next/server';

export async function GET() {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/menu`;
  return NextResponse.json({ url });
}
