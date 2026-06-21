'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Priya Sharma', text: 'The Chicken Biryani here is absolutely amazing! Best in Visakhapatnam. Highly recommend for families.', rating: 5, date: '2 weeks ago' },
  { name: 'Rahul Verma', text: 'Great ambience and delicious food. The Gobi Manchurian and Paneer Butter Masala are must-tries!', rating: 5, date: '1 month ago' },
  { name: 'Ananya Reddy', text: 'We celebrated our anniversary here. Excellent service, wonderful food, and lovely atmosphere.', rating: 5, date: '3 weeks ago' },
  { name: 'Vikram Patel', text: 'Authentic flavors and reasonable prices. My go-to place for family dinners in Gajuwaka.', rating: 4, date: '1 week ago' },
  { name: 'Sneha Kapoor', text: 'The Mutton Biryani is out of this world! Perfectly spiced and generous portions.', rating: 5, date: '2 months ago' },
  { name: 'Amit Singh', text: 'Great Indo-Chinese options. The Chicken Manchurian and Fried Rice combo is my favorite.', rating: 4, date: '3 weeks ago' },
];

export default function Reviews() {
  return (
    <section id="reviews" className="relative py-24 md:py-32 bg-[#0B0B0B]">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#FC8019] font-semibold">Testimonials</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
            What Our <span className="gradient-text">Customers Say</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-8 mb-16 p-8 rounded-2xl glass-card">
          <div className="text-center">
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={24} className={`${i <= 4 ? 'fill-[#D4AF37] text-[#D4AF37]' : 'fill-white/10 text-white/10'}`} />
              ))}
            </div>
            <p className="text-4xl font-bold">4.7</p>
            <p className="text-sm text-white/40">Google Rating</p>
          </div>
          <div className="h-12 w-px bg-white/10" />
          <div className="text-center">
            <p className="text-4xl font-bold gradient-text">700+</p>
            <p className="text-sm text-white/40">Verified Reviews</p>
          </div>
          <div className="h-12 w-px bg-white/10" />
          <div className="text-center">
            <p className="text-4xl font-bold">95%</p>
            <p className="text-sm text-white/40">Would Recommend</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 card-hover relative"
            >
              <Quote size={24} className="text-[#FC8019]/20 absolute top-4 right-4" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
              <p className="text-sm text-white/70 leading-relaxed mb-4">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{testimonial.name}</p>
                <span className="text-xs text-white/30">{testimonial.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
