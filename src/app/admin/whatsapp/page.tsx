'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Send, Users, MessageCircle, Download } from 'lucide-react';
import Link from 'next/link';
import type { Lead } from '@/types';

const festivals = [
  { name: 'Sankranti', emoji: '🪁', date: 'January 14' },
  { name: 'Ugadi', emoji: '🌺', date: 'March/April' },
  { name: 'Diwali', emoji: '🪔', date: 'October/November' },
  { name: 'Christmas', emoji: '🎄', date: 'December 25' },
  { name: 'New Year', emoji: '🎉', date: 'January 1' },
  { name: 'Independence Day', emoji: '🇮🇳', date: 'August 15' },
];

const templates: Record<string, string> = {
  Sankranti: '🪁 Happy Sankranti! Wishing you and your family a harvest of joy, prosperity, and delicious moments. Celebrate the festival of new beginnings with BRUNCH & SUPPER\'s special festive menu! 🍽️',
  Ugadi: '🌺 Happy Ugadi! May this new year bring abundance, happiness, and wonderful dining experiences to your family. Visit BRUNCH & SUPPER for a festive feast! 🎊',
  Diwali: '🪔 Happy Diwali! May your life be as bright and colorful as the festival of lights. Celebrate with special Diwali delicacies at BRUNCH & SUPPER. Wishing you joy and prosperity! ✨',
  Christmas: '🎄 Merry Christmas! Wishing you warmth, joy, and delicious moments with your loved ones. Celebrate the season with festive specials at BRUNCH & SUPPER! 🎅',
  'New Year': '🎉 Happy New Year! Here\'s to new beginnings, delicious adventures, and memorable meals. Thank you for being part of the BRUNCH & SUPPER family. Cheers to 2025! 🥂',
  'Independence Day': '🇮🇳 Happy Independence Day! Let\'s celebrate the spirit of freedom with our loved ones over a delicious meal at BRUNCH & SUPPER. Jai Hind! 🍛',
};

export default function AdminWhatsApp() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedFestival, setSelectedFestival] = useState('Diwali');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(0);

  useEffect(() => {
    fetch('/api/leads').then(r => r.json()).then(setLeads);
  }, []);

  const sendBulk = async () => {
    setSending(true);
    setSent(0);
    const message = templates[selectedFestival] || '';
    for (const lead of leads) {
      window.open(`https://wa.me/91${lead.mobile}?text=${encodeURIComponent(message)}`, '_blank');
      setSent(prev => prev + 1);
      await new Promise(r => setTimeout(r, 500));
    }
    setSending(false);
  };

  const exportCSV = () => {
    const header = 'Name,Mobile\n';
    const rows = leads.map(l => `${l.name},${l.mobile}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'whatsapp-contacts.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 rounded-xl bg-white/5 hover:bg-white/10"><ArrowLeft size={16} /></Link>
          <h1 className="text-2xl font-bold">WhatsApp Campaigns</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Send size={16} className="text-[#25D366]" />
              Send Festival Greetings
            </h2>

            <div className="flex flex-wrap gap-2 mb-4">
              {festivals.map(f => (
                <button
                  key={f.name}
                  onClick={() => setSelectedFestival(f.name)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedFestival === f.name
                      ? 'bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {f.emoji} {f.name}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-white/5 mb-4">
              <p className="text-sm text-white/70 leading-relaxed">{templates[selectedFestival]}</p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-white/40">
                <Users size={14} className="inline mr-1" />
                {leads.length} contacts
              </span>
              <button onClick={exportCSV} className="flex items-center gap-1 text-xs text-white/40 hover:text-white transition-colors">
                <Download size={12} /> Export CSV
              </button>
            </div>

            <button
              onClick={sendBulk}
              disabled={sending || leads.length === 0}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-black font-semibold text-sm hover:bg-[#25D366]/90 transition-all disabled:opacity-50"
            >
              <MessageCircle size={16} />
              {sending ? `Sending... (${sent}/${leads.length})` : `Send ${selectedFestival} Greetings`}
            </button>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-semibold mb-4">Available Templates</h2>
            <div className="space-y-2">
              {festivals.map(f => (
                <button
                  key={f.name}
                  onClick={() => setSelectedFestival(f.name)}
                  className={`w-full text-left p-3 rounded-xl text-sm transition-colors ${
                    selectedFestival === f.name ? 'bg-[#25D366]/10' : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <span className="font-medium">{f.emoji} {f.name}</span>
                  <span className="text-xs text-white/30 ml-2">{f.date}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
              <p className="text-xs text-white/30">
                Clicking send will open WhatsApp Web for each contact. Make sure you are logged into WhatsApp Web.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
