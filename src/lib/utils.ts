import { v4 as uuidv4 } from 'uuid';

export function generateId(): string {
  return uuidv4();
}

export function formatPrice(price: number): string {
  return `₹${price.toFixed(0)}`;
}

export function getTimeUntilClose(): string {
  const now = new Date();
  const close = new Date();
  close.setHours(23, 30, 0, 0);
  const diff = close.getTime() - now.getTime();
  if (diff <= 0) return 'Closed';
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
}

export function isOpenNow(): boolean {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const totalMinutes = hours * 60 + minutes;
  const open = 11 * 60 + 30;
  const close = 23 * 60 + 30;
  return totalMinutes >= open && totalMinutes < close;
}

export function getWhatsAppUrl(phone: string, message?: string): string {
  const cleaned = phone.replace(/[^0-9]/g, '');
  const url = `https://wa.me/${cleaned}`;
  if (message) {
    return `${url}?text=${encodeURIComponent(message)}`;
  }
  return url;
}

export function getDirectionsUrl(address: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

export function getCallUrl(phone: string): string {
  return `tel:${phone.replace(/[^0-9+]/g, '')}`;
}

export function truncate(str: string, len: number): string {
  if (str.length <= len) return str;
  return str.slice(0, len) + '...';
}

export const RESTAURANT = {
  name: 'BRUNCH & SUPPER',
  phone: '+91 8912552021',
  phoneRaw: '+918912552021',
  address: 'Indira Colony, Gajuwaka, Visakhapatnam, Andhra Pradesh 530026',
  email: 'info@brunchandsupper.com',
  openingHours: '11:30 AM – 11:30 PM',
  rating: 4.7,
  reviews: '700+',
  cuisine: 'Indian, North Indian, Biryani, Indo-Chinese, Family Dining',
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.0!2d83.295!3d17.695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDQxJzQyLjAiTiA4M8KwMTcnNDIuMCJF!5e0!3m2!1sen!2sin!4v1',
} as const;

export const CATEGORIES = [
  { id: 'biryani', name: 'Biryani Specials', image: '/images/chicken-biryani.jpg' },
  { id: 'starters', name: 'Starters', image: '/images/manchurian.jpg' },
  { id: 'indo-chinese', name: 'Indo-Chinese', image: '/images/fried-rice.jpg' },
  { id: 'main-course', name: 'Main Course', image: '/images/paneer-butter-masala.jpg' },
  { id: 'vegetarian', name: 'Vegetarian Specials', image: '/images/veg-curry.jpg' },
];
