<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:anchored-summary -->
# Project Summary — BRUNCH & SUPPER

## Goal
Production-ready premium restaurant website in Gajuwaka with admin dashboard, cart/checkout, reservation system, loyalty, customer accounts, Razorpay payments, and order tracking — deployed on Vercel + Supabase.

## Constraints & Preferences
- Premium dark theme (#0B0B0B), primary #FC8019, secondary #D4AF37
- Mobile-first, conversion-focused
- Supabase PostgreSQL with JSON file fallback
- Admin login: admin@brunchandsupper.com / admin123
- Next.js 16 uses proxy.ts convention instead of middleware.ts

## What Exists (40 routes)
### Public Pages
- `/` — Hero, menu highlights, about, gallery, location, contact, reviews, footer
- `/menu` — Full menu with category filter + "Add" buttons + cart summary bar
- `/cart` — Cart items, quantities, totals, checkout link
- `/preorder` — Checkout: cart summary, customer form, pickup time, payment method (Cash/UPI/Pay Online via Razorpay)
- `/reservation` — 3-step table booking form (date/guests → details → special requests)
- `/loyalty` — Loyalty program info, points inquiry by mobile
- `/menu/qrcode` — QR code page
- `/account` — Order history dashboard (requires login)
- `/account/login` — Customer login via mobile + password
- `/account/signup` — Customer registration
- `/track-order` — Public order tracking by mobile number (no login needed)

### Admin Pages (`/admin/*`)
- Dashboard, Menu, Specials, Reservations, Leads, Feedback, Orders, Gallery, Loyalty, WhatsApp
- Admin login at `/admin/login`

### API Routes (`/api/*`)
- menu, special, leads, feedback, orders, gallery, contact, loyalty, reservation, qrcode, upload, auth, customers, customers/orders, payment

## Key Features Implemented
- **Supabase DB** with JSON file fallback when env vars missing
- **Cart system** — localStorage + custom events (`cart-update`) for cross-page sync
- **Razorpay** — "Pay Online" option in checkout; creates orders server-side, verifies signatures
- **Customer Accounts** — signup/login API, order history page
- **Table Reservation** — 3-step form, CRUD API, admin management with status updates
- **Order Tracking** — Public page at `/track-order`, lookup by mobile number, visual progress bar (Placed → Confirmed → Ready → Completed)
- **Admin** — Full CRUD for menu, specials, gallery; order status management; WhatsApp campaign UI

## Blocked
- Supabase env vars not set on Vercel — all CRUD APIs return `[]`. Public pages work via hardcoded fallbacks.
- Razorpay env vars not set — "Pay Online" option shows error message gracefully
- QR code URL uses localhost — needs `NEXT_PUBLIC_SITE_URL` env var

## Environment Variables Needed
```
NEXT_PUBLIC_SUPABASE_URL=https://ectckhzzpddhuizeguec.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6Ik9U...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6Ik9U...
JWT_SECRET=brunch-super-secret-key-change-in-production
RAZORPAY_KEY_ID=rzp_live_xxx
RAZORPAY_KEY_SECRET=xxx
NEXT_PUBLIC_SITE_URL=https://brunch-supper.vercel.app
ADMIN_EMAIL=admin@brunchandsupper.com
ADMIN_PASSWORD=admin123
```

## Key Files
- `src/lib/db.ts` — Supabase DB layer with JSON file fallback (async)
- `src/lib/cart.ts` — localStorage cart management with custom events
- `src/app/api/payment/route.ts` — Razorpay order creation + verification
- `supabase/migration.sql` — All 11 tables (menu, specials, leads, feedback, orders, loyalty, loyalty_transactions, gallery, contacts, customers, reservations)
- `scripts/seed-supabase.mjs` — Seed script for JSON data → Supabase

## Next Steps (when ready)
1. Set env vars on Vercel and redeploy
2. Build Order Tracking page (customer lookup by mobile)
3. Add Multi-language Telugu/English toggle
4. Enable Razorpay by adding live keys
<!-- END:anchored-summary -->
