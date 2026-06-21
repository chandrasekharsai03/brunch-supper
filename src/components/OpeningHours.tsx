'use client';

import { motion } from 'framer-motion';
import { Clock, Sun, Cloud, Moon, Sunrise } from 'lucide-react';
import { isOpenNow, getTimeUntilClose } from '@/lib/utils';

export default function OpeningHours() {
  const open = isOpenNow();
  const timeUntilClose = getTimeUntilClose();

  return (
    <section id="hours" className="relative py-24 md:py-32 bg-[#0B0B0B]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B] via-[#FC8019]/3 to-[#0B0B0B]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card rounded-3xl p-8 md:p-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 mb-8">
              <span className={`w-2 h-2 rounded-full ${open ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className={`text-sm font-medium ${open ? 'text-green-400' : 'text-red-400'}`}>
                {open ? 'Open Now' : 'Currently Closed'}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Opening <span className="gradient-text">Hours</span>
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-3">
                  <Sun size={18} className="text-[#FC8019]" />
                  <span className="text-sm font-medium">Monday – Sunday</span>
                </div>
                <span className="text-sm text-white/80">11:30 AM – 11:30 PM</span>
              </div>
            </div>

            {open && timeUntilClose !== 'Closed' && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#FC8019]/10 to-[#D4AF37]/10 border border-[#FC8019]/20">
                <p className="text-sm text-white/60">Closing in</p>
                <p className="text-2xl font-bold gradient-text mt-1">{timeUntilClose}</p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="https://wa.me/918912552021"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-sm font-semibold transition-all"
              >
                Order Now
              </a>
              <a
                href="tel:+918912552021"
                className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/5 text-sm font-semibold transition-all"
              >
                Call Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
