'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Type, ChevronDown, Linkedin, Twitter, Search, Instagram, ShoppingBag, Clock, Sparkles } from 'lucide-react';

export default function Header() {
  const [open, setOpen] = useState(false);

  const tools = [
    { name: 'All-in-One Counter', href: '/', icon: Type },
    { name: 'LinkedIn Hook Previewer', href: '/linkedin-character-counter', icon: Linkedin },
    { name: 'Twitter Thread Splitter', href: '/twitter-character-counter', icon: Twitter },
    { name: 'Google SERP Snippet Previewer', href: '/seo-meta-length-checker', icon: Search },
    { name: 'Instagram Caption & Hashtags', href: '/instagram-character-counter', icon: Instagram },
    { name: 'Amazon Seller Listing Inspector', href: '/amazon-listing-character-counter', icon: ShoppingBag },
    { name: 'Speech Reading Time Calculator', href: '/words-to-time-calculator', icon: Clock },
    { name: 'Vector QR Code Studio', href: 'https://github.com/lianlele168/qr-code-hub.git', icon: Sparkles },
  ];

  return (
    <header className="border-b border-[#E2E8F0] bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        {/* Logo & Subtitle */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Type className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">Count<span className="text-indigo-600">Wise</span></span>
            <span className="block text-[11px] text-slate-500 font-medium">Free Online Character & Word Counter Suite</span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <Link href="/" className="hover:text-indigo-600 transition-colors">All Counters</Link>
          <Link href="/linkedin-character-counter" className="hover:text-indigo-600 transition-colors">LinkedIn</Link>
          <Link href="/twitter-character-counter" className="hover:text-indigo-600 transition-colors">Twitter</Link>
          <Link href="/seo-meta-length-checker" className="hover:text-indigo-600 transition-colors">SEO SERP</Link>
          <Link href="/words-to-time-calculator" className="hover:text-indigo-600 transition-colors">Speech WPM</Link>
        </nav>

        {/* Right CTA / Dropdown */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              onBlur={() => setTimeout(() => setOpen(false), 200)}
              className="btn-ui text-xs bg-slate-50 hover:bg-slate-100"
            >
              <span>Platform Tools</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl p-2 shadow-xl z-50 space-y-1">
                {tools.map((t) => {
                  const Icon = t.icon;
                  return (
                    <Link
                      key={t.href}
                      href={t.href}
                      className="flex items-center gap-3 px-3 py-2.5 text-xs text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors font-medium"
                    >
                      <Icon className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span>{t.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link href="/" className="btn-ui btn-ui-primary text-xs hidden sm:inline-flex">
            <Sparkles className="w-3.5 h-3.5" /> Direct Counter
          </Link>
        </div>
      </div>
    </header>
  );
}
