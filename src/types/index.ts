export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isPopular: boolean;
  isChefSpecial: boolean;
  isAvailable: boolean;
  createdAt: string;
}

export interface TodaySpecial {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
  scheduledDate: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  mobile: string;
  offer: string;
  createdAt: string;
}

export interface Feedback {
  id: string;
  name: string;
  mobile: string;
  rating: number;
  message: string;
  createdAt: string;
}

export interface PickupOrder {
  id: string;
  items: { menuItemId: string; name: string; quantity: number; price: number }[];
  totalAmount: number;
  customerName: string;
  customerMobile: string;
  pickupTime: string;
  paymentMethod?: string;
  paymentId?: string;
  status: 'pending' | 'confirmed' | 'ready' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface LoyaltyMember {
  id: string;
  name: string;
  mobile: string;
  points: number;
  visitCount: number;
  birthday: string;
  createdAt: string;
}

export interface LoyaltyTransaction {
  id: string;
  memberId: string;
  type: 'earn' | 'redeem' | 'bonus';
  points: number;
  description: string;
  createdAt: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: string;
  createdAt: string;
}

export interface Reservation {
  id: string;
  name: string;
  mobile: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  occasion?: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  email: string;
  password: string;
  createdAt: string;
}
