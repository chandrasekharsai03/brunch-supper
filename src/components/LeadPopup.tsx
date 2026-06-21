'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift } from 'lucide-react';

export default function LeadPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [selectedOffer, setSelectedOffer] = useState<'discount' | 'dessert'>('discount');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('leadPopupSeen');
    if (hasSeen) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, mobile, offer: selectedOffer === 'discount' ? '10% Discount' : 'Free Dessert' }),
      });
      sessionStorage.setItem('leadPopupSeen', 'true');
      setHasSubmitted(true);
      setTimeout(() => setIsVisible(false), 3000);
    } catch { /* ignore */ }
    setLoading(false);
  };

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('leadPopupSeen', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-md w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="glass-card rounded-3xl overflow-hidden">
              <div className="relative h-40 bg-gradient-to-br from-[#FC8019] to-[#D4AF37] flex items-center justify-center">
                <Gift size={48} className="text-white opacity-50" />
                <div className="absolute inset-0 bg-grid opacity-20" />
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 flex items-center justify-center hover:bg-black/40 transition-colors"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>

              <div className="p-6 md:p-8">
                {hasSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                      <Gift size={28} className="text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">🎉 Offer Unlocked!</h3>
                    <p className="text-sm text-white/50">
                      Your {selectedOffer === 'discount' ? '10% Discount coupon' : 'Free Dessert'} has been sent to your WhatsApp!
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">
                      Get Exclusive Offers from BRUNCH & SUPPER
                    </h3>
                    <p className="text-sm text-white/50 mb-6">
                      Sign up now and receive a special welcome offer!
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019] transition-colors"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          placeholder="Mobile Number"
                          value={mobile}
                          onChange={e => setMobile(e.target.value)}
                          required
                          pattern="[0-9]{10}"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019] transition-colors"
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setSelectedOffer('discount')}
                          className={`flex-1 p-3 rounded-xl border text-sm font-medium transition-all ${
                            selectedOffer === 'discount'
                              ? 'border-[#FC8019] bg-[#FC8019]/10 text-[#FC8019]'
                              : 'border-white/10 text-white/50 hover:border-white/20'
                          }`}
                        >
                          10% Discount
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedOffer('dessert')}
                          className={`flex-1 p-3 rounded-xl border text-sm font-medium transition-all ${
                            selectedOffer === 'dessert'
                              ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                              : 'border-white/10 text-white/50 hover:border-white/20'
                          }`}
                        >
                          Free Dessert
                        </button>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl gradient-bg text-sm font-semibold hover:shadow-lg hover:shadow-[#FC8019]/25 transition-all disabled:opacity-50"
                      >
                        {loading ? 'Processing...' : 'Claim Your Offer'}
                      </button>

                      <p className="text-xs text-white/30 text-center">
                        We&apos;ll send your offer via WhatsApp. No spam, ever.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
