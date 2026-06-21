'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Pencil, Trash2, X } from 'lucide-react';
import Link from 'next/link';
import type { TodaySpecial } from '@/types';
import { formatPrice } from '@/lib/utils';

export default function AdminSpecials() {
  const [items, setItems] = useState<TodaySpecial[]>([]);
  const [editing, setEditing] = useState<TodaySpecial | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '', isAvailable: true, scheduledDate: '' });

  const load = () => fetch('/api/special').then(r => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const handleEdit = (item: TodaySpecial) => {
    setEditing(item);
    setForm({ name: item.name, description: item.description, price: item.price.toString(), image: item.image, isAvailable: item.isAvailable, scheduledDate: item.scheduledDate });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this special?')) return;
    await fetch(`/api/special?id=${id}`, { method: 'DELETE' });
    load();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price) };
    if (editing) {
      await fetch('/api/special', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...payload }) });
    } else {
      await fetch('/api/special', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    }
    setShowForm(false);
    setEditing(null);
    setForm({ name: '', description: '', price: '', image: '', isAvailable: true, scheduledDate: '' });
    load();
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 rounded-xl bg-white/5 hover:bg-white/10"><ArrowLeft size={16} /></Link>
            <h1 className="text-2xl font-bold">Today&apos;s Specials</h1>
          </div>
          <button onClick={() => { setEditing(null); setForm({ name: '', description: '', price: '', image: '', isAvailable: true, scheduledDate: '' }); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-bg text-sm font-semibold">
            <Plus size={14} /> Add Special
          </button>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">{editing ? 'Edit Special' : 'Add New Special'}</h2>
              <button onClick={() => { setShowForm(false); setEditing(null); }}><X size={16} className="text-white/40" /></button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-white/40 mb-1">Name</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019]" />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1">Price (₹)</label>
                <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019]" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-white/40 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019]" />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1">Image URL</label>
                <input type="url" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019]" />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1">Schedule Date</label>
                <input type="date" value={form.scheduledDate} onChange={e => setForm({ ...form, scheduledDate: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019]" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-white/60">
                  <input type="checkbox" checked={form.isAvailable} onChange={e => setForm({ ...form, isAvailable: e.target.checked })} className="accent-green-500" />
                  Available
                </label>
              </div>
              <div className="md:col-span-2 flex gap-3">
                <button type="submit" className="px-6 py-2 rounded-xl gradient-bg text-sm font-semibold">{editing ? 'Update' : 'Add'} Special</button>
                <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="px-6 py-2 rounded-xl border border-white/10 text-sm">Cancel</button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="glass-card rounded-xl p-4 flex items-center gap-4">
              {item.image && <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm">{item.name}</h3>
                <p className="text-xs text-white/40 truncate">{item.description}</p>
                {item.scheduledDate && <p className="text-xs text-white/30 mt-1">Schedule: {item.scheduledDate}</p>}
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${item.isAvailable ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                {item.isAvailable ? 'Available' : 'Unavailable'}
              </span>
              <span className="text-sm font-semibold gradient-text">{formatPrice(item.price)}</span>
              <button onClick={() => handleEdit(item)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10"><Pencil size={14} /></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"><Trash2 size={14} /></button>
            </div>
          ))}
          {items.length === 0 && <p className="text-center text-white/40 py-12">No specials yet</p>}
        </div>
      </div>
    </div>
  );
}
