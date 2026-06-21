'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { UtensilsCrossed, LogOut, Menu, Star, Users, MessageSquare, ShoppingBag, Image, Award, Send, TrendingUp, MessageCircle, Calendar } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Menu Items', icon: Menu, color: '#FC8019', href: '/admin/menu' },
  { label: 'Today\'s Specials', icon: Star, color: '#D4AF37', href: '/admin/specials' },
  { label: 'Reservations', icon: Calendar, color: '#06B6D4', href: '/admin/reservations' },
  { label: 'Customer Leads', icon: Users, color: '#3B82F6', href: '/admin/leads' },
  { label: 'Feedback', icon: MessageSquare, color: '#8B5CF6', href: '/admin/feedback' },
  { label: 'Pickup Orders', icon: ShoppingBag, color: '#10B981', href: '/admin/orders' },
  { label: 'Gallery', icon: Image, color: '#EC4899', href: '/admin/gallery' },
  { label: 'Loyalty', icon: Award, color: '#F59E0B', href: '/admin/loyalty' },
  { label: 'WhatsApp', icon: Send, color: '#25D366', href: '/admin/whatsapp' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/menu').then(r => r.json()),
      fetch('/api/special').then(r => r.json()),
      fetch('/api/leads').then(r => r.json()),
      fetch('/api/feedback').then(r => r.json()),
      fetch('/api/orders').then(r => r.json()),
      fetch('/api/gallery').then(r => r.json()),
    ]).then(([menu, specials, leads, feedback, orders, gallery]) => {
      setCounts({
        menu: menu.length,
        specials: specials.length,
        leads: leads.length,
        feedback: feedback.length,
        orders: orders.length,
        gallery: gallery.length,
      });
    }).catch(() => setAuthenticated(false));
  }, []);

  const handleLogout = async () => {
    document.cookie = 'auth_token=; path=/; max-age=0';
    router.push('/admin/login');
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center">
        <p className="text-white/40">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <div className="bg-[#141414] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UtensilsCrossed className="w-6 h-6 text-[#FC8019]" />
            <span className="font-semibold">BRUNCH & SUPPER</span>
            <span className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded-full">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-white/40 hover:text-white transition-colors">View Site</Link>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <a href={stat.href} className="block glass-card rounded-xl p-5 card-hover">
                  <div className="flex items-center justify-between mb-3">
                    <stat.icon size={20} style={{ color: stat.color }} />
                    <span className="text-lg font-bold" style={{ color: stat.color }}>
                      {counts[stat.label.toLowerCase().replace(/'/g, '').split(' ')[0]] ?? 0}
                    </span>
                  </div>
                  <p className="text-xs text-white/40">{stat.label}</p>
                </a>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp size={16} className="text-[#FC8019]" />
                Quick Actions
              </h2>
              <div className="space-y-3">
                <a href="/admin/menu" className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <span className="text-sm">Manage Menu Items</span>
                  <Menu size={14} className="text-[#FC8019]" />
                </a>
                <a href="/admin/specials" className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <span className="text-sm">Update Today&apos;s Special</span>
                  <Star size={14} className="text-[#D4AF37]" />
                </a>
                <a href="/admin/leads" className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <span className="text-sm">View Customer Leads</span>
                  <Users size={14} className="text-blue-400" />
                </a>
                <a href="/admin/orders" className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <span className="text-sm">View Pickup Orders</span>
                  <ShoppingBag size={14} className="text-green-400" />
                </a>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <MessageCircle size={16} className="text-[#25D366]" />
                WhatsApp Campaigns
              </h2>
              <p className="text-sm text-white/40 mb-4">Send festival greetings to your customer database.</p>
              <a href="/admin/whatsapp" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366]/20 text-[#25D366] text-sm font-medium hover:bg-[#25D366]/30 transition-colors">
                <Send size={14} /> Manage Campaigns
              </a>
              <div className="mt-4 pt-4 border-t border-white/5">
                <h3 className="text-xs text-white/30 uppercase tracking-wider mb-3">Festivals</h3>
                <div className="flex flex-wrap gap-2">
                  {['Sankranti', 'Ugadi', 'Diwali', 'Christmas', 'New Year', 'Independence Day'].map(f => (
                    <span key={f} className="px-2 py-1 rounded-md bg-white/5 text-xs text-white/50">{f}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
