'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';
import type { Feedback } from '@/types';

export default function AdminFeedback() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [stats, setStats] = useState({ average: 0, total: 0, distribution: [0, 0, 0, 0, 0] });

  useEffect(() => {
    fetch('/api/feedback').then(r => r.json()).then((data: Feedback[]) => {
      setFeedback(data);
      const total = data.length;
      const sum = data.reduce((acc, f) => acc + f.rating, 0);
      const dist = [0, 0, 0, 0, 0];
      data.forEach(f => { if (f.rating >= 1 && f.rating <= 5) dist[f.rating - 1]++; });
      setStats({ average: total > 0 ? sum / total : 0, total, distribution: dist });
    });
  }, []);

  const getRatingPercent = (index: number) => stats.total > 0 ? (stats.distribution[index] / stats.total) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 rounded-xl bg-white/5 hover:bg-white/10"><ArrowLeft size={16} /></Link>
          <h1 className="text-2xl font-bold">Customer Feedback</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} className={i < Math.round(stats.average) ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-white/10'} />
              ))}
            </div>
            <p className="text-3xl font-bold gradient-text">{stats.average.toFixed(1)}</p>
            <p className="text-xs text-white/40 mt-1">Average Rating</p>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center">
            <p className="text-3xl font-bold gradient-text">{stats.total}</p>
            <p className="text-xs text-white/40 mt-1">Total Reviews</p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <p className="text-xs text-white/40 mb-3">Rating Distribution</p>
            <div className="space-y-1.5">
              {[5, 4, 3, 2, 1].map(rating => {
                const idx = rating - 1;
                return (
                  <div key={rating} className="flex items-center gap-2 text-xs">
                    <span className="text-white/40 w-3">{rating}</span>
                    <Star size={10} className="fill-[#D4AF37] text-[#D4AF37]" />
                    <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full gradient-bg" style={{ width: `${getRatingPercent(idx)}%` }} />
                    </div>
                    <span className="text-white/40 w-6 text-right">{stats.distribution[idx]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {feedback.map(f => (
            <div key={f.id} className="glass-card rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{f.name}</span>
                  <span className="text-xs text-white/30">{f.mobile}</span>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: f.rating }).map((_, i) => (
                    <Star key={i} size={12} className="fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-white/60">{f.message}</p>
              <p className="text-xs text-white/20 mt-2">{new Date(f.createdAt).toLocaleString()}</p>
            </div>
          ))}
          {feedback.length === 0 && <p className="text-center text-white/40 py-12">No feedback yet</p>}
        </div>
      </div>
    </div>
  );
}
