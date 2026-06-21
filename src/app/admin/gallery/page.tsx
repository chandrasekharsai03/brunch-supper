'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, X } from 'lucide-react';
import Link from 'next/link';
import type { GalleryImage } from '@/types';

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ url: '', alt: '', category: 'Food' });

  const load = () => fetch('/api/gallery').then(r => r.json()).then(setImages);
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ url: '', alt: '', category: 'Food' });
    setShowForm(false);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 rounded-xl bg-white/5 hover:bg-white/10"><ArrowLeft size={16} /></Link>
            <h1 className="text-2xl font-bold">Gallery Management</h1>
          </div>
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-bg text-sm font-semibold">
            <Plus size={14} /> Add Image
          </button>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Add Gallery Image</h2>
              <button onClick={() => setShowForm(false)}><X size={16} className="text-white/40" /></button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-white/40 mb-1">Image URL</label>
                <input type="url" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} required className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019]" />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1">Alt Text</label>
                <input type="text" value={form.alt} onChange={e => setForm({ ...form, alt: e.target.value })} required className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019]" />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FC8019]">
                  <option value="Food">Food</option>
                  <option value="Ambience">Ambience</option>
                </select>
              </div>
              <div className="flex items-end">
                <button type="submit" className="px-6 py-2 rounded-xl gradient-bg text-sm font-semibold">Add Image</button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map(img => (
            <div key={img.id} className="group relative glass-card rounded-xl overflow-hidden">
              <img src={img.url} alt={img.alt} className="w-full h-40 object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex items-center justify-center">
                <button onClick={() => handleDelete(img.id)} className="opacity-0 group-hover:opacity-100 p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="p-2">
                <p className="text-xs truncate text-white/60">{img.alt}</p>
                <span className="text-[10px] text-white/30">{img.category}</span>
              </div>
            </div>
          ))}
          {images.length === 0 && <p className="col-span-full text-center text-white/40 py-12">No images yet</p>}
        </div>
      </div>
    </div>
  );
}
