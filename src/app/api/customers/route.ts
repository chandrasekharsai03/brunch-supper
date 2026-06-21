import { NextRequest, NextResponse } from 'next/server';
import { getAll, create, getById } from '@/lib/db';
import { generateId } from '@/lib/utils';
import type { Customer } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'signup') {
      const { name, mobile, email, password } = body;
      if (!name || !mobile || !password) {
        return NextResponse.json({ error: 'Name, mobile, and password required' }, { status: 400 });
      }
      const existing = await getAll<Customer>('customers');
      if (existing.find(c => c.mobile === mobile)) {
        return NextResponse.json({ error: 'Account already exists with this mobile number' }, { status: 409 });
      }
      const customer: Customer = {
        id: generateId(),
        name,
        mobile,
        email: email || '',
        password,
        createdAt: new Date().toISOString(),
      };
      await create('customers', customer);
      const { password: _, ...safe } = customer;
      return NextResponse.json({ success: true, customer: safe });
    }

    if (action === 'login') {
      const { mobile, password } = body;
      if (!mobile || !password) {
        return NextResponse.json({ error: 'Mobile and password required' }, { status: 400 });
      }
      const all = await getAll<Customer>('customers');
      const customer = all.find(c => c.mobile === mobile && c.password === password);
      if (!customer) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }
      const { password: _, ...safe } = customer;
      return NextResponse.json({ success: true, customer: safe });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
