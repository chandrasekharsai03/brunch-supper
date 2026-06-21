'use client';

import { motion } from 'framer-motion';
import { Award, Users, Star, Shield } from 'lucide-react';

const stats = [
  { icon: Star, value: '4.7', label: 'Google Rating', suffix: '★' },
  { icon: Users, value: '700+', label: 'Happy Customers' },
  { icon: Award, value: '5+', label: 'Years of Service' },
  { icon: Shield, value: '100%', label: 'Hygiene Rating' },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-[#0B0B0B]">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/images/restaurant-interior.jpg"
                alt="Restaurant Ambience"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 glass-card rounded-xl p-6 max-w-[200px]">
              <p className="text-3xl font-bold gradient-text">10+</p>
              <p className="text-sm text-white/60 mt-1">Years of Culinary Excellence</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#FC8019] font-semibold">About Us</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Welcome to{' '}
              <span className="gradient-text">BRUNCH & SUPPER</span>
            </h2>
            <p className="text-white/60 leading-relaxed text-lg">
              BRUNCH & SUPPER is one of Gajuwaka&apos;s favorite dining destinations, known for delicious 
              biryanis, Indo-Chinese specialties, quality ingredients, and exceptional customer service. 
              We bring together authentic flavors, warm hospitality, and memorable dining experiences 
              for families and food lovers.
            </p>
            <p className="text-white/50 leading-relaxed">
              Located in the heart of Gajuwaka, Visakhapatnam, we take pride in serving the finest 
              North Indian, Biryani, and Indo-Chinese cuisine. Every dish is crafted with passion 
              using the freshest ingredients to ensure an unforgettable dining experience.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
                  <stat.icon size={20} className="text-[#FC8019] mx-auto mb-2" />
                  <p className="text-xl font-bold">
                    {stat.value}
                    {stat.suffix || ''}
                  </p>
                  <p className="text-xs text-white/40">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
