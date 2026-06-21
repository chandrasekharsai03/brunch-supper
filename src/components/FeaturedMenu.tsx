'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChefHat, TrendingUp, ArrowRight } from 'lucide-react';
import type { MenuItem } from '@/types';
import { formatPrice } from '@/lib/utils';

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

export default function FeaturedMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(fallbackMenu);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setMenuItems(data);
      })
      .catch(() => {});
  }, []);

  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="relative py-24 md:py-32 bg-[#0B0B0B]">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#FC8019] font-semibold">Our Menu</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
            Featured <span className="gradient-text">Specialties</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto">
            Discover our most beloved dishes, crafted with passion and the finest ingredients
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'gradient-bg text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="glass-card rounded-2xl overflow-hidden card-hover">
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {item.isPopular && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#FC8019] text-[10px] font-semibold">
                          <TrendingUp size={10} />
                          Popular
                        </span>
                      )}
                      {item.isChefSpecial && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#D4AF37] text-[10px] font-semibold text-black">
                          <ChefHat size={10} />
                          Chef Special
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                    <p className="text-sm text-white/40 line-clamp-2 mb-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold gradient-text">{formatPrice(item.price)}</span>
                      <a
                        href={item.category === 'Biryani Specials' ? '#order' : '#menu'}
                        className="text-xs text-[#FC8019] hover:text-[#D4AF37] transition-colors font-medium inline-flex items-center gap-1"
                      >
                        Order Now <ArrowRight size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="/menu"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/20 text-sm font-semibold hover:bg-white/5 transition-all"
          >
            View Full Menu
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
