'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, ArrowLeft, CheckCircle, Phone, Mail, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function ReservationPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', mobile: '', email: '', date: '', time: '', guests: 2, occasion: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.mobile || !form.date || !form.time) return;
    setLoading(true);
    try {
      await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch { /* ignore */ }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] pt-24 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-400" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Reservation Request Sent!</h2>
          <p className="text-white/50 mb-2">We&apos;ll confirm your table within 30 minutes via WhatsApp or call.</p>
          <p className="text-sm text-white/30 mb-6">{form.date} at {form.time} · {form.guests} guest{form.guests > 1 ? 's' : ''}</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-bg text-sm font-semibold">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white mb-6 transition-colors"><ArrowLeft size={14} /> Back to Home</Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-[#FC8019]/20 flex items-center justify-center mx-auto mb-4">
            <Calendar size={32} className="text-[#FC8019]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Reserve a <span className="gradient-text">Table</span></h1>
          <p className="text-white/50">Book your table at BRUNCH & SUPPER for a memorable dining experience</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {[
            { icon: Phone, label: 'Call', value: '+91 8912552021', href: 'tel:+918912552021' },
            { icon: MessageSquare, label: 'WhatsApp', value: 'Chat with us', href: 'https://wa.me/918912552021' },
          ].map((item, i) => (
            <a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
              className="glass-card rounded-xl p-4 flex items-center gap-3 hover:bg-white/5 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#FC8019]/20 flex items-center justify-center shrink-0">
                <item.icon size={18} className="text-[#FC8019]" />
              </div>
              <div>
                <p className="text-xs text-white/40">{item.label}</p>
                <p className="text-sm font-medium">{item.value}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3].map(s => (
              <div key={s} className={`flex-1 h-1 rounded-full ${s <= step ? 'bg-[#FC8019]' : 'bg-white/10'}`} />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="text-lg font-semibold">When & How Many?</h2>
                <div>
                  <label className="text-xs text-white/40 mb-1 block">Date</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input type="date" value={form.date} onChange={e => update('date', e.target.value)} required
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019]" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-1 block">Time</label>
                  <div className="relative">
                    <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input type="time" value={form.time} onChange={e => update('time', e.target.value)} required
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019]" />
                  </div>
                  <p className="text-xs text-white/30 mt-1">Open 11:30 AM – 11:30 PM</p>
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-1 block">Number of Guests</label>
                  <div className="relative">
                    <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input type="number" min={1} max={20} value={form.guests} onChange={e => update('guests', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019]" />
                  </div>
                </div>
                <button type="button" onClick={() => setStep(2)}
                  className="w-full py-3 rounded-xl gradient-bg text-sm font-semibold">Continue</button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="text-lg font-semibold">Your Details</h2>
                <div>
                  <input type="text" placeholder="Your Name" value={form.name} onChange={e => update('name', e.target.value)} required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019]" />
                </div>
                <div>
                  <input type="tel" placeholder="Mobile Number" value={form.mobile} onChange={e => update('mobile', e.target.value)} required pattern="[0-9]{10}"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019]" />
                </div>
                <div>
                  <input type="email" placeholder="Email (optional)" value={form.email} onChange={e => update('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019]" />
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setStep(1)}
                    className="flex-1 py-3 rounded-xl border border-white/20 text-sm font-medium hover:bg-white/5">Back</button>
                  <button type="button" onClick={() => setStep(3)}
                    className="flex-1 py-3 rounded-xl gradient-bg text-sm font-semibold">Continue</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="text-lg font-semibold">Special Requests</h2>
                <div>
                  <select value={form.occasion} onChange={e => update('occasion', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019]">
                    <option value="" className="bg-[#0B0B0B]">Select occasion (optional)</option>
                    <option value="birthday" className="bg-[#0B0B0B]">Birthday</option>
                    <option value="anniversary" className="bg-[#0B0B0B]">Anniversary</option>
                    <option value="business" className="bg-[#0B0B0B]">Business Meeting</option>
                    <option value="family" className="bg-[#0B0B0B]">Family Gathering</option>
                    <option value="date" className="bg-[#0B0B0B]">Date Night</option>
                    <option value="other" className="bg-[#0B0B0B]">Other</option>
                  </select>
                </div>
                <div>
                  <textarea placeholder="Any special requests? (seating preference, allergies, etc.)" value={form.notes} onChange={e => update('notes', e.target.value)} rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019]" />
                </div>

                <div className="glass-card rounded-xl p-4 space-y-2">
                  <p className="text-xs text-white/40 uppercase tracking-wider">Summary</p>
                  <div className="flex justify-between text-sm"><span className="text-white/50">Date</span><span>{form.date}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-white/50">Time</span><span>{form.time}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-white/50">Guests</span><span>{form.guests}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-white/50">Name</span><span>{form.name}</span></div>
                </div>

                <div className="flex gap-2">
                  <button type="button" onClick={() => setStep(2)}
                    className="flex-1 py-3 rounded-xl border border-white/20 text-sm font-medium hover:bg-white/5">Back</button>
                  <button type="submit" disabled={loading}
                    className="flex-1 py-3 rounded-xl gradient-bg text-sm font-semibold disabled:opacity-50">
                    {loading ? 'Sending...' : 'Confirm Reservation'}
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
