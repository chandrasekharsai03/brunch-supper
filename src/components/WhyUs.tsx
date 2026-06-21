'use client';

import { motion } from 'framer-motion';
import { Leaf, Shield, Heart, Zap, BadgeIndianRupee, Star } from 'lucide-react';

const reasons = [
  { icon: Leaf, title: 'Fresh Ingredients', description: 'We source the freshest local produce and premium ingredients daily for every dish.' },
  { icon: Shield, title: 'Hygienic Kitchen', description: 'Our kitchen follows strict hygiene standards with regular quality checks.' },
  { icon: Heart, title: 'Family Friendly', description: 'A warm, welcoming atmosphere perfect for family gatherings and celebrations.' },
  { icon: Zap, title: 'Fast Service', description: 'Quick, efficient service without compromising on quality or taste.' },
  { icon: BadgeIndianRupee, title: 'Affordable Pricing', description: 'Premium dining experience at prices that won\'t break the bank.' },
  { icon: Star, title: 'Authentic Taste', description: 'Traditional recipes and authentic spices for an unforgettable dining experience.' },
];

export default function WhyUs() {
  return (
    <section className="relative py-24 md:py-32 bg-[#0B0B0B]">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#FC8019] font-semibold">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
            Why Customers <span className="gradient-text">Love Us</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-6 card-hover h-full">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FC8019]/20 to-[#D4AF37]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <reason.icon size={22} className="text-[#FC8019]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{reason.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
