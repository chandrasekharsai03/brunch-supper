'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, LogOut, ShoppingBag, Clock, MapPin, Phone, Package, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Customer, PickupOrder } from '@/types';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-400',
  confirmed: 'bg-blue-500/10 text-blue-400',
  ready: 'bg-green-500/10 text-green-400',
  completed: 'bg-white/10 text-white/40',
  cancelled: 'bg-red-500/10 text-red-400',
};

export default function AccountPage() {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<PickupOrder[]>([]);

  useEffect(() => {
    const stored = sessionStorage.getItem('customer');
    if (!stored) { router.push('/account/login'); return; }
    const c = JSON.parse(stored);
    setCustomer(c);
    fetch(`/api/customers/orders?mobile=${c.mobile}`)
      .then(r => r.json())
      .then(setOrders);
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('customer');
    router.push('/account/login');
  };

  if (!customer) return null;

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#FC8019]/20 flex items-center justify-center">
                <User size={28} className="text-[#FC8019]" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{customer.name}</h1>
                <p className="text-sm text-white/40">{customer.mobile}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300">
              <LogOut size={14} /> Logout
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {[
              { label: 'Total Orders', value: orders.length, color: '#FC8019', icon: ShoppingBag },
              { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, color: '#EAB308', icon: Clock },
              { label: 'Completed', value: orders.filter(o => o.status === 'completed').length, color: '#10B981', icon: Package },
            ].map((s, i) => (
              <div key={i} className="glass-card rounded-xl p-4 text-center">
                <s.icon size={18} className="mx-auto mb-2" style={{ color: s.color }} />
                <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs text-white/40">{s.label}</p>
              </div>
            ))}
          </div>

          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Package size={16} className="text-[#FC8019]" /> Order History
          </h2>

          <div className="space-y-3">
            {orders.length === 0 && (
              <div className="glass-card rounded-xl p-8 text-center">
                <ShoppingBag size={32} className="mx-auto mb-3 text-white/20" />
                <p className="text-white/40 text-sm mb-4">No orders yet</p>
                <Link href="/preorder" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl gradient-bg text-sm font-semibold">
                  Place Your First Order <ArrowRight size={14} />
                </Link>
              </div>
            )}
            {orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(order => (
              <div key={order.id} className="glass-card rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-xs text-white/30">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-sm font-medium mt-0.5">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[order.status]}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {order.items.map((item, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 text-xs text-white/60">
                      {item.name} × {item.quantity}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-white/40">
                  <span>₹{order.totalAmount.toFixed(0)} · {order.pickupTime}</span>
                  {order.paymentMethod && (
                    <span className="capitalize">{order.paymentMethod}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/preorder" className="flex-1 text-center py-3 rounded-xl gradient-bg text-sm font-semibold">
              Order Again
            </Link>
            <Link href="/reservation" className="flex-1 text-center py-3 rounded-xl border border-white/20 text-sm font-medium hover:bg-white/5">
              Reserve a Table
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
