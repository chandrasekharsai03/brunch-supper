'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Pencil, Trash2, TrendingUp, ChefHat, X } from 'lucide-react';
import Link from 'next/link';
import type { MenuItem } from '@/types';
import { formatPrice } from '@/lib/utils';

export default function AdminMenu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: 'Biryani Specials', image: '', isPopular: false, isChefSpecial: false });

  const load = () => fetch('/api/menu').then(r => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const resetForm = () => setForm({ name: '', description: '', price: '', category: 'Biryani Specials', image: '', isPopular: false, isChefSpecial: false });

  const handleEdit = (item: MenuItem) => {
    setEditing(item);
    setForm({ name: item.name, description: item.description, price: item.price.toString(), category: item.category, image: item.image, isPopular: item.isPopular, isChefSpecial: item.isChefSpecial });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    await fetch(`/api/menu?id=${id}`, { method: 'DELETE' });
    load();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price) };
    if (editing) {
      await fetch('/api/menu', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...payload }) });
    } else {
      await fetch('/api/menu', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    }
    setShowForm(false);
    setEditing(null);
    resetForm();
    load();
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
              <ArrowLeft size={16} />
            </Link>
            <h1 className="text-2xl font-bold">Menu Management</h1>
          </div>
          <button onClick={() => { setEditing(null); resetForm(); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-bg text-sm font-semibold">
            <Plus size={14} /> Add Item
          </button>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">{editing ? 'Edit Item' : 'Add New Item'}</h2>
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
                <label className="block text-xs text-white/40 mb-1">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019]">
                  {['Biryani Specials', 'Starters', 'Indo-Chinese', 'Main Course', 'Vegetarian Specials'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1">Image URL</label>
                <input type="url" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019]" />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-white/60">
                  <input type="checkbox" checked={form.isPopular} onChange={e => setForm({ ...form, isPopular: e.target.checked })} className="accent-[#FC8019]" />
                  Popular
                </label>
                <label className="flex items-center gap-2 text-sm text-white/60">
                  <input type="checkbox" checked={form.isChefSpecial} onChange={e => setForm({ ...form, isChefSpecial: e.target.checked })} className="accent-[#D4AF37]" />
                  Chef Special
                </label>
              </div>
              <div className="md:col-span-2 flex gap-3">
                <button type="submit" className="px-6 py-2 rounded-xl gradient-bg text-sm font-semibold">{editing ? 'Update' : 'Add'} Item</button>
                <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="px-6 py-2 rounded-xl border border-white/10 text-sm">Cancel</button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="glass-card rounded-xl p-4 flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-sm truncate">{item.name}</h3>
                  {item.isPopular && <TrendingUp size={12} className="text-[#FC8019]" />}
                  {item.isChefSpecial && <ChefHat size={12} className="text-[#D4AF37]" />}
                </div>
                <p className="text-xs text-white/40 truncate">{item.category}</p>
              </div>
              <span className="text-sm font-semibold gradient-text">{formatPrice(item.price)}</span>
              <button onClick={() => handleEdit(item)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"><Pencil size={14} /></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"><Trash2 size={14} /></button>
            </div>
          ))}
          {items.length === 0 && <p className="text-center text-white/40 py-12">No menu items yet</p>}
        </div>
      </div>
    </div>
  );
}
