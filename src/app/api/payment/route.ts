import { NextRequest, NextResponse } from 'next/server';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'create-order') {
      if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
        return NextResponse.json({ error: 'Payment not configured' }, { status: 503 });
      }
      const amount = Math.round(Number(body.amount) * 100);
      if (!amount || amount <= 0) {
        return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
      }
      const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');
      const res = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`,
        },
        body: JSON.stringify({
          amount,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return NextResponse.json({ error: data.error?.description || 'Payment error' }, { status: 500 });
      }
      return NextResponse.json({
        orderId: data.id,
        amount: data.amount,
        currency: data.currency,
        key: RAZORPAY_KEY_ID,
      });
    }

    if (action === 'verify') {
      const { orderId, paymentId, signature } = body;
      if (!orderId || !paymentId || !signature) {
        return NextResponse.json({ error: 'Missing verification fields' }, { status: 400 });
      }
      const crypto = require('crypto');
      const expected = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');
      const verified = expected === signature;
      return NextResponse.json({ verified, paymentId, orderId });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
