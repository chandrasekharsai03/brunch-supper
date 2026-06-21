'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Printer, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function QRCodePage() {
  const [menuUrl, setMenuUrl] = useState('');
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    const url = `${window.location.origin}/menu`;
    setMenuUrl(url);
    setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`);
  }, []);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = qrCode;
    a.download = 'brunch-supper-qr-menu.png';
    a.click();
  };

  const handlePrint = () => {
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(`
        <html><head><title>BRUNCH & SUPPER - QR Menu</title>
        <style>body{margin:0;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#fff;font-family:sans-serif;}
        img{max-width:400px;}h1{font-size:24px;color:#333;margin-bottom:5px;}
        p{font-size:14px;color:#666;margin-top:5px;}</style></head>
        <body>
          <h1>BRUNCH & SUPPER</h1>
          <p>Scan to view our menu</p>
          <img src="${qrCode}" alt="QR Code" />
          <p style="margin-top:20px;font-size:12px;color:#999;">${menuUrl}</p>
          <script>window.onload=function(){window.print()}</script>
        </body></html>
      `);
      win.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            QR Code <span className="gradient-text">Menu</span>
          </h1>
          <p className="text-white/50 mb-8">Scan to view our digital menu instantly</p>

          <div className="glass-card rounded-2xl p-8 max-w-sm mx-auto">
            <div className="bg-white rounded-2xl p-4 mb-6">
              {qrCode && (
                <img src={qrCode} alt="QR Code for Menu" className="w-full" />
              )}
            </div>
            <div className="text-center mb-6">
              <h3 className="font-bold text-lg">BRUNCH & SUPPER</h3>
              <p className="text-xs text-white/40 mt-1">Scan to view our menu</p>
            </div>

            <div className="flex flex-col gap-3">
              <button onClick={handleDownload} className="flex items-center justify-center gap-2 py-3 rounded-xl gradient-bg text-sm font-semibold hover:shadow-lg transition-all">
                <Download size={16} /> Download QR Code
              </button>
              <button onClick={handlePrint} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold hover:bg-white/10 transition-all">
                <Printer size={16} /> Print QR Code
              </button>
              <button
                onClick={() => navigator.share?.({ title: 'BRUNCH & SUPPER Menu', text: `View our menu: ${menuUrl}` })}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold hover:bg-white/10 transition-all"
              >
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>

          <div className="mt-8 glass-card rounded-2xl p-6 text-left">
            <h3 className="font-semibold mb-2">Place this QR code</h3>
            <ul className="space-y-1 text-sm text-white/50">
              <li>• On each dining table</li>
              <li>• At the restaurant entrance</li>
              <li>• On takeaway packaging</li>
              <li>• In promotional materials</li>
              <li>• On social media posts</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
