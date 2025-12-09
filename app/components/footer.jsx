"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20 p-10 relative">
      <div className="max-w-7xl mx-auto relative">

        {/* Left Section */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <h2 className="text-xl font-semibold mb-3">Wander Wiz</h2>
          <p className="text-white/80 leading-relaxed w-60">
            Wander Wiz helps you discover the best things to do at your travel
            destination using AI-powered recommendations.
          </p>
        </div>

        {/* Center Section */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-white/80">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/result" className="hover:underline">Results</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-right">
          <h2 className="text-xl font-semibold mb-3">Contact</h2>
          <p className="flex justify-end items-center gap-2 text-white/80">
            <Mail size={16} /> help@wanderwiz.ca
          </p>
          <p className="flex justify-end items-center gap-2 text-white/80">
            <Phone size={16} /> +1 (444) 444-4444
          </p>
          <p className="flex justify-end items-center gap-2 text-white/80">
            <MapPin size={16} /> Calgary, AB
          </p>
        </div>

        {/* Spacer height so content doesn't overlap */}
        <div className="h-60"></div>
      </div>
    </footer>
  );
}
