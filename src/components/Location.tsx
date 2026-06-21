'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Navigation, MessageCircle } from 'lucide-react';

export default function Location() {
  return (
    <section id="location" className="relative py-24 md:py-32 bg-[#0B0B0B]">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#FC8019] font-semibold">Visit Us</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
            Find Us <span className="gradient-text">Here</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FC8019]/20 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-[#FC8019]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    Indira Colony, Gajuwaka, Visakhapatnam, Andhra Pradesh 530026
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <a href="tel:+918912552021" className="text-sm text-white/50 hover:text-[#FC8019] transition-colors">
                    +91 8912552021
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="tel:+918912552021"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full gradient-bg text-sm font-semibold hover:shadow-lg hover:shadow-[#FC8019]/25 transition-all"
                >
                  <Phone size={14} />
                  Call Now
                </a>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Indira+Colony,+Gajuwaka,+Visakhapatnam,+Andhra+Pradesh+530026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-sm font-semibold hover:bg-white/5 transition-all"
                >
                  <Navigation size={14} />
                  Get Directions
                </a>
                <a
                  href="https://wa.me/918912552021"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-600 text-sm font-semibold hover:bg-green-700 transition-all"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin size={16} className="text-[#FC8019]" />
                Location
              </h3>
              <p className="text-sm text-white/50">
                Located in the heart of Gajuwaka, easily accessible from all parts of Visakhapatnam. 
                Ample parking space available for our customers.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl overflow-hidden h-[400px] md:h-[450px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.0!2d83.295!3d17.695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDQxJzQyLjAiTiA4M8KwMTcnNDIuMCJF!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BRUNCH & SUPPER Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
