'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getCart, updateQuantity, removeFromCart, getCartTotal, getCartCount, CartItem } from '@/lib/cart';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(getCart());
    setHydrated(true);
  }, []);

  const refresh = () => {
    setCart([...getCart()]);
    window.dispatchEvent(new Event('cart-update'));
  };

  if (!hydrated) return null;

  const total = getCartTotal(cart);
  const count = getCartCount(cart);

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/menu" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white mb-6 transition-colors">
          <ArrowLeft size={14} /> Continue Shopping
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#FC8019]/20 flex items-center justify-center">
            <ShoppingBag size={24} className="text-[#FC8019]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Your Cart</h1>
            <p className="text-sm text-white/40">{count} item{count !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-white/20" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-white/40 mb-6">Add items from our menu to get started</p>
            <Link href="/menu" className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-bg text-sm font-semibold">
              Browse Menu <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-8">
              {cart.map(item => (
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
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { updateQuantity(item.id, -1); refresh(); }}
                        className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => { updateQuantity(item.id, 1); refresh(); }}
                        className="w-7 h-7 rounded-full bg-[#FC8019] flex items-center justify-center hover:bg-[#FC8019]/80"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => { removeFromCart(item.id); refresh(); }}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="space-y-2 mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between text-sm text-white/50">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold gradient-text">{formatPrice(total)}</span>
              </div>
              <Link
                href="/preorder"
                className="w-full mt-6 py-3.5 rounded-xl gradient-bg text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
