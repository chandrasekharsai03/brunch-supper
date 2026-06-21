'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Award, Star, Plus } from 'lucide-react';
import Link from 'next/link';
import type { LoyaltyMember } from '@/types';

export default function AdminLoyalty() {
  const [members, setMembers] = useState<LoyaltyMember[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/loyalty').then(r => r.json()).then(setMembers);
  }, []);

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) || m.mobile.includes(search)
  );

  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 rounded-xl bg-white/5 hover:bg-white/10"><ArrowLeft size={16} /></Link>
          <h1 className="text-2xl font-bold">Loyalty Members</h1>
        </div>

        <input
          type="text"
          placeholder="Search by name or mobile..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019] mb-6"
        />

        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left p-4 text-white/40 font-medium">Name</th>
                  <th className="text-left p-4 text-white/40 font-medium">Mobile</th>
                  <th className="text-left p-4 text-white/40 font-medium">Points</th>
                  <th className="text-left p-4 text-white/40 font-medium">Visits</th>
                  <th className="text-left p-4 text-white/40 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(member => (
                  <tr key={member.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium">{member.name}</td>
                    <td className="p-4 text-white/60">{member.mobile}</td>
                    <td className="p-4">
                      <span className="flex items-center gap-1 text-[#FC8019]">
                        <Award size={14} /> {member.points}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="flex items-center gap-1 text-[#D4AF37]">
                        <Star size={14} /> {member.visitCount}
                      </span>
                    </td>
                    <td className="p-4 text-white/40">{new Date(member.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="p-12 text-center text-white/40">No members yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
