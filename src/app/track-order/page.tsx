'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, Clock, CheckCircle, XCircle, Phone, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import type { PickupOrder } from '@/types';

const steps = ['pending', 'confirmed', 'ready', 'completed'];
const stepLabels = ['Order Placed', 'Confirmed', 'Ready for Pickup', 'Completed'];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  confirmed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  ready: 'bg-green-500/10 text-green-400 border-green-500/20',
  completed: 'bg-white/10 text-white/40 border-white/10',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
};

function StatusIcon({ status }: { status: string }) {
  const icons: Record<string, any> = { pending: Clock, confirmed: CheckCircle, ready: CheckCircle, completed: CheckCircle, cancelled: XCircle };
  const Icon = icons[status] || Clock;
  return <Icon size={12} />;
}

export default function TrackOrderPage() {
  const [mobile, setMobile] = useState('');
  const [orders, setOrders] = useState<PickupOrder[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/customers/orders?mobile=${mobile}`);
      const data = await res.json();
      setOrders(data);
    } catch { setOrders([]); }
    setSearched(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-[#FC8019]/20 flex items-center justify-center mx-auto mb-4">
            <Package size={32} className="text-[#FC8019]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Track Your <span className="gradient-text">Order</span></h1>
          <p className="text-white/50">Enter your mobile number to check order status</p>
        </motion.div>

        <form onSubmit={handleSearch} className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="tel" pattern="[0-9]{10}" value={mobile} onChange={e => setMobile(e.target.value)} required
                placeholder="Enter mobile number"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019]" />
            </div>
            <button type="submit" disabled={loading}
              className="px-6 py-3 rounded-xl gradient-bg text-sm font-semibold flex items-center gap-2 disabled:opacity-50">
              <Search size={16} /> {loading ? '...' : 'Track'}
            </button>
          </div>
        </form>

        {searched && orders.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-2xl p-8 text-center">
            <ShoppingBag size={40} className="mx-auto mb-4 text-white/20" />
            <h3 className="font-semibold mb-1">No Orders Found</h3>
            <p className="text-sm text-white/40 mb-4">No orders linked to this mobile number</p>
            <Link href="/preorder" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl gradient-bg text-sm font-semibold">
              Place an Order
            </Link>
          </motion.div>
        )}

        <div className="space-y-6">
          {orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(order => (
            <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-white/30">Order #{order.id.slice(0, 8)}</p>
                  <p className="text-sm text-white/60 mt-0.5">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${statusColors[order.status]}`}>
                  <StatusIcon status={order.status} />
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
              </div>

              {order.status !== 'cancelled' && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    {steps.map((s, i) => {
                      const currentIdx = steps.indexOf(order.status);
                      const active = i <= currentIdx;
                      return (
                        <div key={s} className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            active ? 'bg-[#FC8019] text-white' : 'bg-white/5 text-white/30'
                          }`}>
                            {i + 1}
                          </div>
                          <span className={`text-[10px] mt-1 ${active ? 'text-white/60' : 'text-white/20'}`}>
                            {stepLabels[i]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="relative h-1 bg-white/5 rounded-full mt-2">
                    <div className="absolute h-full bg-gradient-to-r from-[#FC8019] to-[#D4AF37] rounded-full transition-all"
                      style={{ width: `${(steps.indexOf(order.status) / (steps.length - 1)) * 100}%` }} />
                  </div>
                </div>
              )}

              <div className="space-y-1 mb-3">
                {order.items.map((item, i) => (
                  <p key={i} className="text-sm text-white/60 flex justify-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </p>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div className="text-xs text-white/40">
                  Pickup: {new Date(order.pickupTime).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  {order.paymentMethod && <span className="ml-2 capitalize">· {order.paymentMethod}</span>}
                </div>
                <span className="font-bold gradient-text">{formatPrice(order.totalAmount)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
