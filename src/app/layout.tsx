import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadPopup from "@/components/LeadPopup";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "BRUNCH & SUPPER | Premium Dining in Gajuwaka, Visakhapatnam",
  description: "Experience authentic biryanis, flavorful Indo-Chinese specialties, and memorable family dining at BRUNCH & SUPPER. 4.7★ rated restaurant in Gajuwaka, Visakhapatnam.",
  keywords: "brunch and supper, gajuwaka restaurant, visakhapatnam dining, biryani, indo-chinese, family restaurant, andhra pradesh",
  openGraph: {
    title: "BRUNCH & SUPPER | Premium Dining in Gajuwaka",
    description: "Experience authentic biryanis, flavorful Indo-Chinese specialties, and memorable family dining at BRUNCH & SUPPER.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-[#0B0B0B] text-white antialiased overflow-x-hidden">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <LeadPopup />
      </body>
    </html>
  );
}
