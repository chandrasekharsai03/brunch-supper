'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, CheckCircle } from 'lucide-react';

export default function CustomerFeedback() {
  const [step, setStep] = useState<'form' | 'done'>('form');
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [form, setForm] = useState({ name: '', mobile: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rating }),
      });
      setStep('done');
      setTimeout(() => {
        setStep('form');
        setForm({ name: '', mobile: '', message: '' });
        setRating(5);
      }, 5000);
    } catch { /* ignore */ }
    setLoading(false);
  };

  return (
    <section className="relative py-24 md:py-32 bg-[#0B0B0B]">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#FC8019] font-semibold">Share Your Experience</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            We Value Your <span className="gradient-text">Feedback</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="glass-card rounded-2xl p-8">
            {step === 'done' ? (
              <div className="text-center py-8">
                <CheckCircle size={48} className="mx-auto text-green-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                <p className="text-white/50">Your feedback helps us serve you better.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="text-center mb-2">
                  <p className="text-sm text-white/40 mb-3">How was your experience?</p>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setRating(n)}
                        onMouseEnter={() => setHoveredRating(n)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          size={32}
                          className={`${
                            n <= (hoveredRating || rating)
                              ? 'fill-[#D4AF37] text-[#D4AF37]'
                              : 'text-white/20'
                          } transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019]" />
                  <input type="tel" placeholder="Mobile (optional)" value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019]" />
                </div>
                <textarea placeholder="Share your experience..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019] resize-none" />

                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl gradient-bg text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-50">
                  <MessageSquare size={16} />
                  {loading ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
