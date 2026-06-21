'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingCart, CheckCircle, CreditCard, Banknote, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { getCart, saveCart, clearCart, getCartTotal, getCartCount, CartItem } from '@/lib/cart';

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const totalAmount = getCartTotal(cart);
  const count = getCartCount(cart);

  const updateQty = (id: string, delta: number) => {
    const next = cart.map(i => i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i).filter(i => i.quantity > 0);
    setCart(next);
    saveCart(next);
    window.dispatchEvent(new Event('cart-update'));
  };

  const removeItem = (id: string) => {
    const next = cart.filter(i => i.id !== id);
    setCart(next);
    saveCart(next);
    window.dispatchEvent(new Event('cart-update'));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0 || !customerName || !customerMobile || !pickupTime) return;
    setLoading(true);
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(i => ({ menuItemId: i.id, name: i.name, quantity: i.quantity, price: i.price })),
          totalAmount,
          customerName,
          customerMobile,
          pickupTime,
          paymentMethod,
        }),
      });
      setSubmitted(true);
      clearCart();
      window.dispatchEvent(new Event('cart-update'));
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
          <p className="text-white/50 mb-4">Your order has been received. We&apos;ll have it ready for pickup at {pickupTime}.</p>
          <p className="text-sm text-white/40 mb-6">
            Pay via {paymentMethod === 'upi' ? 'UPI (918912552021@paytm)' : 'Cash on Pickup'} at the counter
          </p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-bg text-sm font-semibold">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] pt-24">
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
            <ShoppingCart size={40} className="text-white/20" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-white/40 mb-6">Add items from our menu to get started</p>
          <Link href="/menu" className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-bg text-sm font-semibold">
            Browse Menu
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white mb-6 transition-colors">
          <ArrowLeft size={14} /> Back to Cart
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#FC8019]/20 flex items-center justify-center">
            <CreditCard size={24} className="text-[#FC8019]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Checkout</h1>
            <p className="text-sm text-white/40">{count} item{count !== 1 ? 's' : ''} · {formatPrice(totalAmount)}</p>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Order Summary</h2>
          <div className="space-y-3">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-white/40">{formatPrice(item.price)} each</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-xs">-</button>
                  <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded-full bg-[#FC8019] flex items-center justify-center hover:bg-[#FC8019]/80 text-xs">+</button>
                </div>
                <span className="text-sm font-semibold gradient-text w-16 text-right">{formatPrice(item.price * item.quantity)}</span>
                <button onClick={() => removeItem(item.id)} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={12} /></button>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 mt-4 pt-4 flex items-center justify-between">
            <span className="text-sm text-white/50">Total ({count} items)</span>
            <span className="text-xl font-bold gradient-text">{formatPrice(totalAmount)}</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Customer Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input type="text" placeholder="Your Name" value={customerName} onChange={e => setCustomerName(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019] transition-colors" />
            </div>
            <div>
              <input type="tel" placeholder="Mobile Number" value={customerMobile} onChange={e => setCustomerMobile(e.target.value)} required pattern="[0-9]{10}"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019] transition-colors" />
            </div>
            <div>
              <input type="datetime-local" value={pickupTime} onChange={e => setPickupTime(e.target.value)} min={minDate} required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019] transition-colors" />
            </div>

            <div>
              <label className="text-sm text-white/60 mb-2 block">Payment Method</label>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setPaymentMethod('cash')}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm transition-all ${paymentMethod === 'cash' ? 'bg-[#FC8019]/20 border border-[#FC8019]' : 'bg-white/5 border border-white/10'}`}>
                  <Banknote size={16} /> Cash on Pickup
                </button>
                <button type="button" onClick={() => setPaymentMethod('upi')}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm transition-all ${paymentMethod === 'upi' ? 'bg-[#FC8019]/20 border border-[#FC8019]' : 'bg-white/5 border border-white/10'}`}>
                  <CreditCard size={16} /> UPI / GPay
                </button>
              </div>
              {paymentMethod === 'upi' && (
                <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-white/40 mb-1">Pay to UPI ID:</p>
                  <p className="text-sm font-mono text-[#FC8019]">918912552021@paytm</p>
                  <p className="text-xs text-white/30 mt-2">Pay at counter or share screenshot via WhatsApp</p>
                </div>
              )}
            </div>

            <button type="submit" disabled={loading || !customerName || !customerMobile || !pickupTime}
              className="w-full py-3.5 rounded-xl gradient-bg text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-50">
              {loading ? 'Placing Order...' : `Place Order · ${formatPrice(totalAmount)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
