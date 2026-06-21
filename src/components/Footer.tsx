'use client';

import { UtensilsCrossed, MapPin, Phone, Clock, Mail, Camera, Globe } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0B] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-[#FC8019]" />
              <span className="font-bold text-lg">
                <span className="gradient-text">BRUNCH</span>
                <span className="text-white/60 mx-1">&</span>
                <span className="text-white">SUPPER</span>
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Premium dining destination in Gajuwaka, Visakhapatnam. Serving authentic biryanis, Indo-Chinese specialties, and memorable family dining experiences.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FC8019]/20 transition-colors">
                <Camera size={16} className="text-white/60" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FC8019]/20 transition-colors">
                <Globe size={16} className="text-white/60" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/40">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Menu', 'About Us', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm text-white/50 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/preorder" className="text-sm text-white/50 hover:text-white transition-colors">
                  Pre-Order for Pickup
                </Link>
              </li>
              <li>
                <Link href="/reservation" className="text-sm text-white/50 hover:text-white transition-colors">
                  Reserve a Table
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-sm text-white/50 hover:text-white transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/loyalty" className="text-sm text-white/50 hover:text-white transition-colors">
                  Loyalty Program
                </Link>
              </li>
              <li>
                <Link href="/menu/qrcode" className="text-sm text-white/50 hover:text-white transition-colors">
                  QR Code Menu
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-sm text-white/50 hover:text-white transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sm text-white/50 hover:text-white transition-colors">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/40">Contact Info</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:+918912552021" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                  <Phone size={14} className="text-[#FC8019]" />
                  +91 8912552021
                </a>
              </li>
              <li>
                <a href="mailto:info@brunchandsupper.com" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                  <Mail size={14} className="text-[#FC8019]" />
                  info@brunchandsupper.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/50">
                <MapPin size={14} className="text-[#FC8019] mt-0.5 shrink-0" />
                Indira Colony, Gajuwaka, Visakhapatnam, AP 530026
              </li>
              <li className="flex items-center gap-2 text-sm text-white/50">
                <Clock size={14} className="text-[#FC8019]" />
                11:30 AM – 11:30 PM (Daily)
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/40">Opening Hours</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Monday – Sunday</span>
                <span className="text-white/80">11:30 AM – 11:30 PM</span>
              </div>
            </div>
            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-xs text-white/40 mb-1">Currently</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-green-400">Open Now</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} BRUNCH & SUPPER. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Premium Dining in Gajuwaka, Visakhapatnam
          </p>
        </div>
      </div>
    </footer>
  );
}
