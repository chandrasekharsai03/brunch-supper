-- Run this in Supabase SQL Editor to create all tables

CREATE TABLE IF NOT EXISTS menu (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  price NUMERIC NOT NULL,
  category TEXT NOT NULL,
  image TEXT DEFAULT '/images/paneer-butter-masala.jpg',
  "isPopular" BOOLEAN DEFAULT false,
  "isChefSpecial" BOOLEAN DEFAULT false,
  "isAvailable" BOOLEAN DEFAULT true,
  "createdAt" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS specials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  price NUMERIC NOT NULL,
  image TEXT DEFAULT '',
  "isAvailable" BOOLEAN DEFAULT true,
  "scheduledDate" TEXT DEFAULT '',
  "createdAt" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  offer TEXT DEFAULT '',
  "createdAt" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS feedback (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  mobile TEXT DEFAULT '',
  rating INTEGER NOT NULL DEFAULT 5,
  message TEXT NOT NULL,
  "createdAt" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  items JSONB NOT NULL DEFAULT '[]',
  "totalAmount" NUMERIC NOT NULL,
  "customerName" TEXT NOT NULL,
  "customerMobile" TEXT NOT NULL,
  "pickupTime" TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  "createdAt" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS loyalty (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  "visitCount" INTEGER NOT NULL DEFAULT 0,
  birthday TEXT DEFAULT '',
  "createdAt" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS loyalty_transactions (
  id TEXT PRIMARY KEY,
  "memberId" TEXT NOT NULL REFERENCES loyalty(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  points INTEGER NOT NULL,
  description TEXT DEFAULT '',
  "createdAt" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS gallery (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  alt TEXT DEFAULT 'Gallery image',
  category TEXT DEFAULT 'Food',
  "createdAt" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY,
  type TEXT DEFAULT 'contact',
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  message TEXT DEFAULT '',
  date TEXT DEFAULT '',
  time TEXT DEFAULT '',
  guests TEXT DEFAULT '',
  "createdAt" TEXT NOT NULL
);
