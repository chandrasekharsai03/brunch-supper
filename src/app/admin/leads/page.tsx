'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Download, Search, Gift } from 'lucide-react';
import Link from 'next/link';
import type { Lead } from '@/types';

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/leads').then(r => r.json()).then(setLeads);
  }, []);

  const filtered = leads.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.mobile.includes(search)
  );

  const exportCSV = () => {
    const header = 'Name,Mobile,Offer,Date\n';
    const rows = filtered.map(l => `${l.name},${l.mobile},${l.offer},${new Date(l.createdAt).toLocaleDateString()}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customer-leads.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const sendWhatsApp = async (message: string) => {
    for (const lead of filtered) {
      window.open(`https://wa.me/91${lead.mobile}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 rounded-xl bg-white/5 hover:bg-white/10"><ArrowLeft size={16} /></Link>
            <h1 className="text-2xl font-bold">Customer Leads</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm transition-colors">
              <Download size={14} /> Export CSV
            </button>
          </div>
        </div>

        <div className="relative mb-6">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input type="text" placeholder="Search by name or mobile..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019]" />
        </div>

        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left p-4 text-white/40 font-medium">Name</th>
                  <th className="text-left p-4 text-white/40 font-medium">Mobile</th>
                  <th className="text-left p-4 text-white/40 font-medium">Offer</th>
                  <th className="text-left p-4 text-white/40 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(lead => (
                  <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">{lead.name}</td>
                    <td className="p-4 text-white/60">{lead.mobile}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#FC8019]/10 text-[#FC8019] text-xs">
                        <Gift size={10} /> {lead.offer}
                      </span>
                    </td>
                    <td className="p-4 text-white/40">{new Date(lead.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={4} className="p-12 text-center text-white/40">No leads found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 glass-card rounded-2xl p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Gift size={16} className="text-[#25D366]" />
            Send Festival Greeting via WhatsApp
          </h3>
          <p className="text-sm text-white/40 mb-4">Send a greeting message to all filtered customers.</p>
          <div className="flex flex-wrap gap-2">
            {['Sankranti', 'Ugadi', 'Diwali', 'Christmas', 'New Year', 'Independence Day'].map(festival => (
              <button
                key={festival}
                onClick={() => sendWhatsApp(`🎉 Happy ${festival}! Wishing you and your family joy, prosperity, and delicious moments. - BRUNCH & SUPPER, Gajuwaka 🍽️`)}
                className="px-4 py-2 rounded-xl bg-[#25D366]/10 text-[#25D366] text-sm font-medium hover:bg-[#25D366]/20 transition-colors"
              >
                {festival}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
