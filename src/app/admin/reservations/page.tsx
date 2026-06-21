'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Calendar, Phone, Mail, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import type { Reservation } from '@/types';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-400',
  confirmed: 'bg-blue-500/10 text-blue-400',
  completed: 'bg-white/10 text-white/40',
  cancelled: 'bg-red-500/10 text-red-400',
};

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const load = () => fetch('/api/reservation').then(r => r.json()).then(setReservations);
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/reservation', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    load();
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 rounded-xl bg-white/5 hover:bg-white/10"><ArrowLeft size={16} /></Link>
          <h1 className="text-2xl font-bold">Table Reservations</h1>
          <span className="text-sm text-white/30">({reservations.length})</span>
        </div>

        <div className="space-y-4">
          {reservations.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(r => (
            <div key={r.id} className="glass-card rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{r.name}</span>
                    <span className="text-xs text-white/30">{r.mobile}</span>
                    {r.email && <span className="text-xs text-white/20">| {r.email}</span>}
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-white/40 mt-2">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {r.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {r.time}</span>
                    <span className="flex items-center gap-1"><Users size={11} /> {r.guests} guest{r.guests > 1 ? 's' : ''}</span>
                    {r.occasion && <span className="text-[#FC8019]/60">{r.occasion}</span>}
                  </div>
                  {r.notes && <p className="text-xs text-white/30 mt-2 italic">{r.notes}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[r.status]}`}>
                    {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                  </span>
                </div>
              </div>

              {r.status === 'pending' && (
                <div className="flex gap-2 pt-2 border-t border-white/5">
                  <button onClick={() => updateStatus(r.id, 'confirmed')} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-xs hover:bg-blue-500/20">
                    <CheckCircle size={12} /> Confirm
                  </button>
                  <button onClick={() => updateStatus(r.id, 'cancelled')} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs hover:bg-red-500/20">
                    <XCircle size={12} /> Cancel
                  </button>
                  <a href={`https://wa.me/91${r.mobile}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 text-xs hover:bg-green-500/20">
                    <Phone size={12} /> WhatsApp
                  </a>
                </div>
              )}
              {r.status === 'confirmed' && (
                <div className="flex gap-2 pt-2 border-t border-white/5">
                  <button onClick={() => updateStatus(r.id, 'completed')} className="px-3 py-1.5 rounded-lg bg-white/10 text-white/60 text-xs hover:bg-white/20">Mark Completed</button>
                </div>
              )}
            </div>
          ))}
          {reservations.length === 0 && <p className="text-center text-white/40 py-12">No reservations yet</p>}
        </div>
      </div>
    </div>
  );
}
