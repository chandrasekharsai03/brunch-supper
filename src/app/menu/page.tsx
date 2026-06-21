'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, ChefHat, ArrowLeft, ShoppingCart, Plus, Check } from 'lucide-react';
import Link from 'next/link';
import type { MenuItem } from '@/types';
import { formatPrice } from '@/lib/utils';
import { addToCart, getCart, getCartTotal, getCartCount } from '@/lib/cart';

const fallbackMenu: MenuItem[] = [
  { id: '1', name: 'Chicken Biryani', description: 'Fragrant basmati rice layered with tender chicken and aromatic spices', price: 250, category: 'Biryani Specials', image: '/images/chicken-biryani.jpg', isPopular: true, isChefSpecial: true, isAvailable: true, createdAt: '' },
  { id: '2', name: 'Mutton Biryani', description: 'Succulent mutton pieces cooked with premium basmati rice', price: 350, category: 'Biryani Specials', image: '/images/mutton-biryani.jpg', isPopular: true, isChefSpecial: false, isAvailable: true, createdAt: '' },
  { id: '3', name: 'Gobi Manchurian', description: 'Crispy cauliflower tossed in flavorful manchurian sauce', price: 180, category: 'Starters', image: '/images/manchurian.jpg', isPopular: true, isChefSpecial: false, isAvailable: true, createdAt: '' },
  { id: '4', name: 'Crispy Veg', description: 'Crunchy vegetable fritters served with tangy dipping sauce', price: 160, category: 'Starters', image: '/images/paneer-butter-masala.jpg', isPopular: false, isChefSpecial: false, isAvailable: true, createdAt: '' },
  { id: '5', name: 'Chicken Manchurian', description: 'Boneless chicken in spicy-sweet manchurian gravy', price: 220, category: 'Indo-Chinese', image: '/images/manchurian.jpg', isPopular: true, isChefSpecial: false, isAvailable: true, createdAt: '' },
  { id: '6', name: 'Fried Rice', description: 'Wok-tossed rice with vegetables and aromatic seasonings', price: 190, category: 'Indo-Chinese', image: '/images/fried-rice.jpg', isPopular: false, isChefSpecial: false, isAvailable: true, createdAt: '' },
  { id: '7', name: 'Noodles', description: 'Stir-fried noodles with fresh vegetables and sauces', price: 180, category: 'Indo-Chinese', image: '/images/noodles.jpg', isPopular: false, isChefSpecial: false, isAvailable: true, createdAt: '' },
  { id: '8', name: 'Paneer Butter Masala', description: 'Rich and creamy paneer in tomato-based gravy', price: 240, category: 'Main Course', image: '/images/paneer-butter-masala.jpg', isPopular: true, isChefSpecial: true, isAvailable: true, createdAt: '' },
  { id: '9', name: 'Butter Naan', description: 'Soft, buttery Indian bread baked in tandoor', price: 40, category: 'Main Course', image: '/images/butter-naan.jpg', isPopular: false, isChefSpecial: false, isAvailable: true, createdAt: '' },
  { id: '10', name: 'Veg Bullet', description: 'Spicy vegetable stuffed roll with signature seasoning', price: 150, category: 'Vegetarian Specials', image: '/images/veg-curry.jpg', isPopular: false, isChefSpecial: false, isAvailable: true, createdAt: '' },
];

const categories = ['All', 'Biryani Specials', 'Starters', 'Indo-Chinese', 'Main Course', 'Vegetarian Specials'];

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>(fallbackMenu);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch('/api/menu').then(r => r.json()).then(data => {
      if (data && data.length > 0) setItems(data);
    }).catch(() => {});
  }, []);

  const filtered = items.filter(item => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch && item.isAvailable;
  });

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white mb-4 transition-colors">
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold">Our <span className="gradient-text">Menu</span></h1>
          </div>
          <a
            href="https://wa.me/918912552021"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-sm font-semibold transition-all"
          >
            Order on WhatsApp
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search menu..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019] transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat ? 'gradient-bg text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="group"
            >
              <div className="glass-card rounded-2xl overflow-hidden card-hover">
                <div className="relative overflow-hidden h-48">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {item.isPopular && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#FC8019] text-[10px] font-semibold">
                        <TrendingUp size={10} /> Popular
                      </span>
                    )}
                    {item.isChefSpecial && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#D4AF37] text-[10px] font-semibold text-black">
                        <ChefHat size={10} /> Chef Special
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                  <p className="text-sm text-white/40 line-clamp-2 mb-3">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold gradient-text">{formatPrice(item.price)}</span>
                    <button
                      onClick={() => {
                        addToCart({ id: item.id, name: item.name, price: item.price, image: item.image });
                        setAddedIds(prev => new Set(prev).add(item.id));
                        window.dispatchEvent(new Event('cart-update'));
                        setTimeout(() => setAddedIds(prev => { const n = new Set(prev); n.delete(item.id); return n; }), 1500);
                      }}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all flex items-center gap-1.5 ${
                        addedIds.has(item.id) ? 'bg-green-600 text-white' : 'bg-[#FC8019] hover:bg-[#FC8019]/80 text-white'
                      }`}
                    >
                      {addedIds.has(item.id) ? <><Check size={12} /> Added</> : <><Plus size={12} /> Add</>}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg">No items found</p>
            <p className="text-white/20 text-sm mt-2">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>

      <CartBar />
    </div>
  );
}

function CartBar() {
  const [cart, setCart] = useState(getCart());
  useEffect(() => {
    const update = () => setCart(getCart());
    window.addEventListener('cart-update', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('cart-update', update);
      window.removeEventListener('storage', update);
    };
  }, []);
  if (cart.length === 0) return null;
  const total = getCartTotal(cart);
  const count = getCartCount(cart);
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4">
      <Link
        href="/cart"
        className="max-w-lg mx-auto glass-card rounded-2xl p-4 flex items-center justify-between shadow-2xl border border-[#FC8019]/20"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FC8019] flex items-center justify-center">
            <ShoppingCart size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold">{count} item{count > 1 ? 's' : ''} in cart</p>
            <p className="text-xs text-white/40">Tap to view & checkout</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold gradient-text">{formatPrice(total)}</span>
          <span className="text-xs px-3 py-1.5 rounded-full gradient-bg">View Cart</span>
        </div>
      </Link>
    </div>
  );
}
