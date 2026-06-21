'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Plus, Minus, CheckCircle, CreditCard, Banknote } from 'lucide-react';
import Link from 'next/link';
import type { MenuItem } from '@/types';
import { formatPrice } from '@/lib/utils';

export default function PreOrderPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/menu').then(r => r.json()).then(data => {
      if (data && data.length > 0) setItems(data.filter((i: MenuItem) => i.isAvailable));
    }).catch(() => {});
  }, []);

  const addToCart = (id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const next = { ...prev };
      if (next[id] <= 1) delete next[id];
      else next[id]--;
      return next;
    });
  };

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const item = items.find(i => i.id === id);
    return item ? { ...item, quantity: qty } : null;
  }).filter(Boolean);

  const totalAmount = cartItems.reduce((sum, item: any) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    setLoading(true);
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems.map((item: any) => ({
            menuItemId: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          totalAmount,
          customerName,
          customerMobile,
          pickupTime,
          paymentMethod,
        }),
      });
      setSubmitted(true);
      setCart({});
    } catch { /* ignore */ }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] pt-24 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-400" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Order Placed!</h2>
          <p className="text-white/50 mb-6">Your order has been received. We&apos;ll have it ready for pickup at {pickupTime}.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-bg text-sm font-semibold">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().slice(0, 16);

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Pre-Order for <span className="gradient-text">Pickup</span></h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {items.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  className="glass-card rounded-xl p-4 flex items-center gap-4"
                >
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{item.name}</h3>
                    <p className="text-sm gradient-text font-semibold mt-0.5">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {cart[item.id] ? (
                      <div className="flex items-center gap-2">
                        <button onClick={() => removeFromCart(item.id)} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-medium w-5 text-center">{cart[item.id]}</span>
                        <button onClick={() => addToCart(item.id)} className="w-7 h-7 rounded-full bg-[#FC8019] flex items-center justify-center hover:bg-[#FC8019]/80">
                          <Plus size={12} />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => addToCart(item.id)} className="w-8 h-8 rounded-full bg-[#FC8019] flex items-center justify-center hover:bg-[#FC8019]/80">
                        <Plus size={14} />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <ShoppingCart size={18} className="text-[#FC8019]" />
                Your Order
              </h2>

              {cartItems.length === 0 ? (
                <p className="text-sm text-white/40 py-8 text-center">Select items from the menu</p>
              ) : (
                <div className="space-y-3 mb-6">
                  {cartItems.map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <span className="text-white/70">{item.name} × {item.quantity}</span>
                      <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="border-t border-white/10 pt-3 flex items-center justify-between font-bold">
                    <span>Total</span>
                    <span className="gradient-text">{formatPrice(totalAmount)}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019] transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={customerMobile}
                    onChange={e => setCustomerMobile(e.target.value)}
                    required
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019] transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="datetime-local"
                    value={pickupTime}
                    onChange={e => setPickupTime(e.target.value)}
                    min={minDate}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm text-white/60 mb-2 block">Payment Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash')}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm transition-all ${
                        paymentMethod === 'cash' ? 'bg-[#FC8019]/20 border border-[#FC8019]' : 'bg-white/5 border border-white/10'
                      }`}
                    >
                      <Banknote size={16} />
                      Cash on Pickup
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm transition-all ${
                        paymentMethod === 'upi' ? 'bg-[#FC8019]/20 border border-[#FC8019]' : 'bg-white/5 border border-white/10'
                      }`}
                    >
                      <CreditCard size={16} />
                      UPI / GPay
                    </button>
                  </div>
                  {paymentMethod === 'upi' && (
                    <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-xs text-white/40 mb-1">Pay to UPI ID:</p>
                      <p className="text-sm font-mono text-[#FC8019]">918912552021@paytm</p>
                      <p className="text-xs text-white/30 mt-2">Pay at pickup counter or share payment screenshot via WhatsApp</p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={cartItems.length === 0 || loading}
                  className="w-full py-3 rounded-xl gradient-bg text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {loading ? 'Placing Order...' : `Place Order · ${formatPrice(totalAmount)}`}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
