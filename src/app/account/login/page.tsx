'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Lock, ArrowRight, UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CustomerLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ mobile: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', ...form }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      sessionStorage.setItem('customer', JSON.stringify(data.customer));
      router.push('/account');
    } catch { setError('Connection error'); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <UtensilsCrossed className="w-10 h-10 text-[#FC8019] mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-white/40 text-sm mt-1">Log in to view your orders</p>
        </div>
        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-xs text-white/40 mb-1 block">Mobile Number</label>
            <div className="relative">
              <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="tel" pattern="[0-9]{10}" value={form.mobile} onChange={e => setForm(p => ({ ...p, mobile: e.target.value }))} required
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019]" placeholder="9876543210" />
            </div>
          </div>
          <div>
            <label className="text-xs text-white/40 mb-1 block">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019]" placeholder="Enter password" />
            </div>
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-xl gradient-bg text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? 'Logging in...' : <>Login <ArrowRight size={16} /></>}
          </button>
          <p className="text-center text-xs text-white/30">
            Don&apos;t have an account?{' '}
            <Link href="/account/signup" className="text-[#FC8019] hover:underline">Sign Up</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
