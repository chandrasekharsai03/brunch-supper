'use client';

import { motion } from 'framer-motion';
import { Star, Clock, MapPin, Phone, ArrowRight, ChefHat, Sparkles, Heart } from 'lucide-react';
import { isOpenNow, getWhatsAppUrl, getDirectionsUrl, getCallUrl } from '@/lib/utils';

export default function Hero() {
  const open = isOpenNow();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0B0B0B]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B] via-[#0B0B0B]/80 to-[#0B0B0B] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-transparent to-[#0B0B0B] z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: 'url(/images/restaurant-ambience.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FC8019]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[100px]" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FC8019]/10 border border-[#FC8019]/20 text-xs font-medium text-[#FC8019]">
                <Star size={12} className="fill-[#FC8019]" />
                4.7 ★ (700+ Reviews)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-xs font-medium text-green-400">
                <Clock size={12} />
                {open ? 'Open Now' : 'Closed'} · 11:30 AM – 11:30 PM
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-xs font-medium text-[#D4AF37]">
                <Heart size={12} />
                Family Restaurant
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-400">
                <Sparkles size={12} />
                Fast Service
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="gradient-text">Every Meal</span>
              <br />
              <span className="text-white">Becomes a</span>
              <br />
              <span className="gradient-text">Celebration</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed"
            >
              Experience authentic biryanis, flavorful Indo-Chinese specialties, and memorable family dining moments at BRUNCH & SUPPER.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#menu"
                className="gradient-bg px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 hover:shadow-lg hover:shadow-[#FC8019]/25 transition-all"
              >
                View Menu
                <ArrowRight size={16} />
              </a>
              <a
                href={getWhatsAppUrl('918912552021', 'Hi! I want to order from BRUNCH & SUPPER')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full font-semibold text-sm bg-green-600 hover:bg-green-700 transition-all inline-flex items-center gap-2"
              >
                Order on WhatsApp
              </a>
              <a
                href={getCallUrl('+918912552021')}
                className="px-6 py-3 rounded-full font-semibold text-sm border border-white/20 hover:bg-white/5 transition-all inline-flex items-center gap-2"
              >
                <Phone size={16} />
                Call Now
              </a>
              <a
                href={getDirectionsUrl('Indira Colony, Gajuwaka, Visakhapatnam, Andhra Pradesh 530026')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full font-semibold text-sm border border-white/20 hover:bg-white/5 transition-all inline-flex items-center gap-2"
              >
                <MapPin size={16} />
                Get Directions
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-6 pt-4"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FC8019] to-[#D4AF37] border-2 border-[#0B0B0B] flex items-center justify-center text-[8px] font-bold"
                  >
                    {i === 4 ? '700+' : ''}
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/40">
                <span className="text-white/80 font-semibold">700+</span> happy customers
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              <div className="hero-glow rounded-2xl overflow-hidden">
                <img
                  src="/images/chicken-biryani.jpg"
                  alt="Delicious Biryani"
                  className="w-full h-[500px] object-cover rounded-2xl"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 glass-card rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#FC8019]/20 flex items-center justify-center">
                    <ChefHat size={24} className="text-[#FC8019]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Chef Special</p>
                    <p className="text-sm font-semibold">Chicken Biryani</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute -top-6 -right-6 glass-card rounded-xl p-4"
              >
                <div className="flex items-center gap-2">
                  <Star size={20} className="fill-[#D4AF37] text-[#D4AF37]" />
                  <span className="text-2xl font-bold">4.7</span>
                </div>
                <p className="text-xs text-white/40">Google Rating</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-white/30 text-xs flex flex-col items-center gap-1"
        >
          <span>Scroll to explore</span>
          <ArrowRight size={14} className="rotate-90" />
        </motion.div>
      </motion.div>
    </section>
  );
}
