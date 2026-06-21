import { NextRequest, NextResponse } from 'next/server';
import { getAll, create, update, getById } from '@/lib/db';
import { generateId } from '@/lib/utils';
import type { LoyaltyMember, LoyaltyTransaction } from '@/types';

export async function GET() {
  const members = await getAll<LoyaltyMember>('loyalty');
  return NextResponse.json(members);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const allMembers = await getAll<LoyaltyMember>('loyalty');
    const existing = allMembers.find(m => m.mobile === body.mobile);

    if (existing) {
      const transactions = await getAll<LoyaltyTransaction>('loyalty_transactions');
      return NextResponse.json({ member: existing, transactions });
    }

    const member: LoyaltyMember = {
      id: generateId(),
      name: body.name,
      mobile: body.mobile,
      points: 50,
      visitCount: 0,
      birthday: body.birthday || '',
      createdAt: new Date().toISOString(),
    };
    await create('loyalty', member);

    const transaction: LoyaltyTransaction = {
      id: generateId(),
      memberId: member.id,
      type: 'bonus',
      points: 50,
      description: 'Welcome bonus points',
      createdAt: new Date().toISOString(),
    };
    await create('loyalty_transactions', transaction);

    return NextResponse.json({ member, transactions: [transaction] }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, action } = body;

    if (action === 'addPoints') {
      const member = await getById<LoyaltyMember>('loyalty', id);
      if (!member) return NextResponse.json({ error: 'Not found' }, { status: 404 });

      const points = Number(body.points) || 10;
      await update<LoyaltyMember>('loyalty', id, {
        points: member.points + points,
        visitCount: member.visitCount + 1,
      });

      const transaction: LoyaltyTransaction = {
        id: generateId(),
        memberId: id,
        type: 'earn',
        points,
        description: body.description || 'Points earned from order',
        createdAt: new Date().toISOString(),
      };
      await create('loyalty_transactions', transaction);

      const updated = await getById<LoyaltyMember>('loyalty', id);
      return NextResponse.json({ member: updated, transaction });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
