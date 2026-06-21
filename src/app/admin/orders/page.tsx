'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import type { PickupOrder } from '@/types';
import { formatPrice } from '@/lib/utils';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-400',
  confirmed: 'bg-blue-500/10 text-blue-400',
  ready: 'bg-green-500/10 text-green-400',
  completed: 'bg-white/10 text-white/40',
  cancelled: 'bg-red-500/10 text-red-400',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<PickupOrder[]>([]);

  const load = () => fetch('/api/orders').then(r => r.json()).then(setOrders);
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    load();
  };

  const sorted = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 rounded-xl bg-white/5 hover:bg-white/10"><ArrowLeft size={16} /></Link>
          <h1 className="text-2xl font-bold">Pickup Orders</h1>
          <span className="text-sm text-white/30">({orders.length} orders)</span>
        </div>

        <div className="space-y-4">
          {sorted.map(order => (
            <div key={order.id} className="glass-card rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{order.customerName}</span>
                    <span className="text-xs text-white/30">{order.customerMobile}</span>
                  </div>
                  <p className="text-xs text-white/40">Pickup: {new Date(order.pickupTime).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <span className="text-sm font-semibold gradient-text">{formatPrice(order.totalAmount)}</span>
                </div>
              </div>

              <div className="space-y-1 mb-3">
                {order.items.map((item, i) => (
                  <p key={i} className="text-xs text-white/50">
                    {item.name} × {item.quantity} — {formatPrice(item.price * item.quantity)}
                  </p>
                ))}
              </div>

              {order.status === 'pending' && (
                <div className="flex gap-2 pt-2 border-t border-white/5">
                  <button onClick={() => updateStatus(order.id, 'confirmed')} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-xs hover:bg-blue-500/20 transition-colors">
                    <CheckCircle size={12} /> Confirm
                  </button>
                  <button onClick={() => updateStatus(order.id, 'cancelled')} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs hover:bg-red-500/20 transition-colors">
                    <XCircle size={12} /> Cancel
                  </button>
                </div>
              )}
              {order.status === 'confirmed' && (
                <div className="flex gap-2 pt-2 border-t border-white/5">
                  <button onClick={() => updateStatus(order.id, 'ready')} className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 text-xs hover:bg-green-500/20 transition-colors">
                    Mark Ready
                  </button>
                </div>
              )}
              {order.status === 'ready' && (
                <div className="flex gap-2 pt-2 border-t border-white/5">
                  <button onClick={() => updateStatus(order.id, 'completed')} className="px-3 py-1.5 rounded-lg bg-white/10 text-white/60 text-xs hover:bg-white/20 transition-colors">
                    Complete Order
                  </button>
                </div>
              )}
            </div>
          ))}
          {orders.length === 0 && <p className="text-center text-white/40 py-12">No orders yet</p>}
        </div>
      </div>
    </div>
  );
}
