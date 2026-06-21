'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryImage } from '@/types';

const fallbackImages: GalleryImage[] = [
  { id: 'g1', url: '/images/chicken-biryani.jpg', alt: 'Signature Biryani', category: 'Food', createdAt: '' },
  { id: 'g2', url: '/images/restaurant-ambience.jpg', alt: 'Restaurant Ambience', category: 'Ambience', createdAt: '' },
  { id: 'g3', url: '/images/family-dining.jpg', alt: 'Family Dining Area', category: 'Ambience', createdAt: '' },
  { id: 'g4', url: '/images/mutton-biryani.jpg', alt: 'Mutton Biryani', category: 'Food', createdAt: '' },
  { id: 'g5', url: '/images/paneer-butter-masala.jpg', alt: 'Paneer Butter Masala', category: 'Food', createdAt: '' },
  { id: 'g6', url: '/images/manchurian.jpg', alt: 'Gobi Manchurian', category: 'Food', createdAt: '' },
  { id: 'g7', url: '/images/butter-naan.jpg', alt: 'Vegetarian Delights', category: 'Food', createdAt: '' },
  { id: 'g8', url: '/images/fried-rice.jpg', alt: 'Noodles', category: 'Food', createdAt: '' },
];

const categories = ['All', 'Food', 'Ambience'];

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>(fallbackImages);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setImages(data);
      })
      .catch(() => {});
  }, []);

  const filtered = activeCategory === 'All' ? images : images.filter(img => img.category === activeCategory);

  return (
    <section id="gallery" className="relative py-24 md:py-32 bg-[#0B0B0B]">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#FC8019] font-semibold">Gallery</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
            Our <span className="gradient-text">Visual Stories</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto">
            Take a glimpse into our world of flavors, ambience, and memorable moments
          </p>
        </motion.div>

        <div className="flex justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat ? 'gradient-bg text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img, index) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${
                index === 0 ? 'row-span-2 col-span-2' : ''
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ minHeight: index === 0 ? '400px' : '200px' }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                  {img.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={28} />
            </button>
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors disabled:opacity-30"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(prev => prev !== null && prev > 0 ? prev - 1 : prev); }}
              disabled={selectedImage === 0}
            >
              <ChevronLeft size={32} />
            </button>
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={filtered[selectedImage]?.url}
              alt={filtered[selectedImage]?.alt}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors disabled:opacity-30"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(prev => prev !== null && prev < filtered.length - 1 ? prev + 1 : prev); }}
              disabled={selectedImage === filtered.length - 1}
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
