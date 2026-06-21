import { NextRequest, NextResponse } from 'next/server';
import { getAll } from '@/lib/db';
import type { PickupOrder } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mobile = searchParams.get('mobile');
  if (!mobile) {
    return NextResponse.json({ error: 'Mobile number required' }, { status: 400 });
  }
  const orders = await getAll<PickupOrder>('orders');
  const customerOrders = orders.filter(o => o.customerMobile === mobile);
  return NextResponse.json(customerOrders);
}
