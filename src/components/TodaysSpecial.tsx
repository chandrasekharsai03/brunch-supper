'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, ArrowRight } from 'lucide-react';
import type { TodaySpecial } from '@/types';
import { formatPrice } from '@/lib/utils';

export default function TodaysSpecial() {
  const [specials, setSpecials] = useState<TodaySpecial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/special')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setSpecials(data.filter((s: TodaySpecial) => s.isAvailable));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading || specials.length === 0) return null;

  return (
    <section className="relative py-24 md:py-32 bg-[#0B0B0B]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FC8019]/5 via-transparent to-[#D4AF37]/5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FC8019]/10 border border-[#FC8019]/20 text-xs font-medium text-[#FC8019]">
            <Sparkles size={12} />
            Today&apos;s Special
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-6">
            Chef&apos;s <span className="gradient-text">Daily Selection</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specials.map((special, index) => (
            <motion.div
              key={special.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="glass-card rounded-2xl overflow-hidden card-hover">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={special.image || '/images/noodles.jpg'}
                    alt={special.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FC8019] text-xs font-semibold pulse-glow">
                      <Clock size={10} />
                      Today Only
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{special.name}</h3>
                  <p className="text-white/50 text-sm mb-4 line-clamp-2">{special.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold gradient-text">{formatPrice(special.price)}</span>
                    <a
                      href={`https://wa.me/918912552021?text=${encodeURIComponent(`Hi! I want to order ${special.name} from Today's Special`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 hover:bg-green-700 text-xs font-semibold transition-all"
                    >
                      Order Now <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
