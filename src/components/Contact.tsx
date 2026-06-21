'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, MessageCircle, Mail, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formType, setFormType] = useState<'contact' | 'reservation' | 'whatsapp'>('contact');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload: Record<string, string> = { type: formType };
    data.forEach((value, key) => { payload[key] = value.toString(); });

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setSubmitted(true);
      form.reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch { /* ignore */ }
    setLoading(false);
  };

  const tabs = [
    { id: 'contact' as const, label: 'Contact Us' },
    { id: 'reservation' as const, label: 'Reservation' },
    { id: 'whatsapp' as const, label: 'WhatsApp Order' },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-[#0B0B0B]">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#FC8019] font-semibold">Get In Touch</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center gap-2 mb-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setFormType(tab.id); setSubmitted(false); }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  formType === tab.id ? 'gradient-bg text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <motion.div
            key={formType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="glass-card rounded-2xl p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle size={48} className="mx-auto text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                  <p className="text-white/50">We&apos;ll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {formType === 'reservation' && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-white/60 mb-2">Date</label>
                          <input type="date" name="date" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019] transition-colors" />
                        </div>
                        <div>
                          <label className="block text-sm text-white/60 mb-2">Time</label>
                          <input type="time" name="time" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019] transition-colors" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-white/60 mb-2">Number of Guests</label>
                        <input type="number" name="guests" min="1" max="20" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019] transition-colors" />
                      </div>
                    </>
                  )}
                  {formType === 'whatsapp' && (
                    <p className="text-sm text-white/50 mb-2">Send your order directly via WhatsApp for fastest service.</p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Name</label>
                      <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019] transition-colors" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Mobile</label>
                      <input type="tel" name="mobile" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019] transition-colors" placeholder="Your mobile number" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019] transition-colors resize-none"
                      placeholder={formType === 'contact' ? 'Your message...' : formType === 'reservation' ? 'Special requests...' : 'Your order details...'}
                    />
                  </div>
                  {formType === 'whatsapp' ? (
                    <a
                      href="https://wa.me/918912552021"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-sm font-semibold transition-all"
                    >
                      <MessageCircle size={16} />
                      Order on WhatsApp
                    </a>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-bg text-sm font-semibold hover:shadow-lg hover:shadow-[#FC8019]/25 transition-all disabled:opacity-50"
                    >
                      <Send size={16} />
                      {loading ? 'Sending...' : formType === 'reservation' ? 'Request Reservation' : 'Send Message'}
                    </button>
                  )}
                </form>
              )}
            </div>
          </motion.div>

          <div className="flex justify-center gap-4 mt-6">
            <a href="tel:+918912552021" className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
              <Phone size={14} /> Call
            </a>
            <a href="https://wa.me/918912552021" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
              <MessageCircle size={14} /> WhatsApp
            </a>
            <a href="mailto:info@brunchandsupper.com" className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
              <Mail size={14} /> Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
