'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Gift, Star, Award, ChevronRight, Phone } from 'lucide-react';
import Link from 'next/link';
import type { LoyaltyMember, LoyaltyTransaction } from '@/types';

export default function LoyaltyPage() {
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState<'register' | 'dashboard'>('register');
  const [member, setMember] = useState<LoyaltyMember | null>(null);
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>([]);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/loyalty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, mobile }),
      });
      const data = await res.json();
      setMember(data.member);
      setTransactions(data.transactions || []);
      setStep('dashboard');
    } catch { /* ignore */ }
    setLoading(false);
  };

  const handleLookup = async () => {
    if (!mobile) return;
    setLoading(true);
    try {
      const res = await fetch('/api/loyalty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile }),
      });
      const data = await res.json();
      if (data.member) {
        setMember(data.member);
        setTransactions(data.transactions || []);
        setStep('dashboard');
      }
    } catch { /* ignore */ }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={14} /> Back to Home
        </Link>

        {step === 'register' ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FC8019] to-[#D4AF37] flex items-center justify-center mx-auto mb-4">
                <Award size={28} />
              </div>
              <h1 className="text-3xl font-bold mb-2">Loyalty <span className="gradient-text">Program</span></h1>
              <p className="text-white/50 text-sm">Join and earn rewards with every meal!</p>
            </div>

            <div className="space-y-4 mb-8">
              {[
                { icon: Gift, text: 'Earn points on every meal' },
                { icon: Star, text: 'Every 10th meal free' },
                { icon: Award, text: 'Birthday discount coupon' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white/60">
                  <item.icon size={16} className="text-[#FC8019]" />
                  {item.text}
                </div>
              ))}
            </div>

            <div className="glass-card rounded-2xl p-6">
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Mobile</label>
                  <input type="tel" value={mobile} onChange={e => setMobile(e.target.value)} required pattern="[0-9]{10}" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019] transition-colors" />
                </div>
                <button type="submit" disabled={loading} className="w-full py-3 rounded-xl gradient-bg text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-50">
                  {loading ? 'Processing...' : 'Join Now · Get 50 Bonus Points!'}
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-xs text-white/30 text-center mb-3">Already a member?</p>
                <div className="flex gap-2">
                  <input type="tel" placeholder="Enter mobile" value={mobile} onChange={e => setMobile(e.target.value)} className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#FC8019] transition-colors" />
                  <button onClick={handleLookup} className="px-4 py-2 rounded-xl bg-white/10 text-xs font-medium hover:bg-white/20 transition-all">
                    Lookup
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : member ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-1">Welcome, <span className="gradient-text">{member.name}</span></h1>
              <p className="text-white/40 text-sm">Your loyalty dashboard</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="glass-card rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold gradient-text mb-1">{member.points}</p>
                <p className="text-xs text-white/40">Reward Points</p>
              </div>
              <div className="glass-card rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold gradient-text mb-1">{member.visitCount}</p>
                <p className="text-xs text-white/40">Total Visits</p>
              </div>
              <div className="glass-card rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold gradient-text mb-1">{10 - (member.visitCount % 10)}</p>
                <p className="text-xs text-white/40">Meals Until Free</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 mb-8">
              <h3 className="font-semibold mb-4">Redemption History</h3>
              {transactions.length === 0 ? (
                <p className="text-sm text-white/40">No transactions yet</p>
              ) : (
                <div className="space-y-3">
                  {transactions.map(t => (
                    <div key={t.id} className="flex items-center justify-between text-sm py-2 border-b border-white/5 last:border-0">
                      <div>
                        <span className="text-white/70">{t.description}</span>
                        <span className="text-xs text-white/30 ml-2">{new Date(t.createdAt).toLocaleDateString()}</span>
                      </div>
                      <span className={`font-medium ${t.type === 'earn' || t.type === 'bonus' ? 'text-green-400' : 'text-[#FC8019]'}`}>
                        {t.type === 'earn' || t.type === 'bonus' ? '+' : '-'}{t.points}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
