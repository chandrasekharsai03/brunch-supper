'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MapPin, Clock, UtensilsCrossed, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';
import { isOpenNow } from '@/lib/utils';
import { getCart, getCartCount } from '@/lib/cart';

const navLinks = [
  { href: '/preorder', label: 'Order Now' },
  { href: '/reservation', label: 'Reserve Table' },
  { href: '/track-order', label: 'Track Order' },
  { href: '#menu', label: 'Menu' },
  { href: '#about', label: 'About' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#location', label: 'Location' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(getCartCount(getCart()));
    const handler = () => setCartCount(getCartCount(getCart()));
    window.addEventListener('storage', handler);
    window.addEventListener('cart-update', handler);
    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener('cart-update', handler);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setOpen(isOpenNow());
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'glass shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <UtensilsCrossed className="w-6 h-6 text-[#FC8019]" />
            <span className="font-bold text-lg md:text-xl tracking-tight">
              <span className="gradient-text">BRUNCH</span>
              <span className="text-white/60 mx-1">&</span>
              <span className="text-white">SUPPER</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FC8019] to-[#D4AF37] transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/account"
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-all"
            >
              <User size={18} />
            </Link>
            <Link
              href="/cart"
              className="relative p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-all"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FC8019] text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-green-400 font-medium">
                {open ? 'Open Now' : 'Closed'}
              </span>
            </div>
            <a
              href="tel:+918912552021"
              className="gradient-bg px-4 py-2 rounded-full text-sm font-semibold text-white hover:shadow-lg hover:shadow-[#FC8019]/25 transition-all"
            >
              Call Now
            </a>
          </div>

          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/5"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-white/80 hover:text-white transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <Link
                  href="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors py-2"
                >
                  <ShoppingBag size={18} />
                  Cart
                  {cartCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#FC8019] text-[10px] font-bold flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white/80 hover:text-white transition-colors py-2"
                >
                  My Account
                </Link>
              </div>
              <div className="pt-4 border-t border-white/10 space-y-3">
                <a
                  href="tel:+918912552021"
                  className="flex items-center gap-3 w-full gradient-bg px-4 py-3 rounded-xl text-sm font-semibold"
                >
                  <Phone size={16} />
                  Call Now
                </a>
                <a
                  href="https://wa.me/918912552021"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full bg-green-600 px-4 py-3 rounded-xl text-sm font-semibold"
                >
                  <Phone size={16} />
                  Order on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
