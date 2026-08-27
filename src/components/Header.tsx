'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Type, ChevronDown, Linkedin, Twitter, Search, Instagram, ShoppingBag, Clock } from 'lucide-react';

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const tools = [
    { name: 'All-in-One Counter', href: '/', icon: Type },
    { name: 'LinkedIn Hook Preview', href: '/linkedin-character-counter', icon: Linkedin },
    { name: 'Twitter Thread Splitter', href: '/twitter-character-counter', icon: Twitter },
    { name: 'Google SERP Snippet Preview', href: '/seo-meta-length-checker', icon: Search },
    { name: 'Instagram Caption & Hashtag', href: '/instagram-character-counter', icon: Instagram },
    { name: 'Amazon Listing Checker', href: '/amazon-listing-character-counter', icon: ShoppingBag },
    { name: 'Speech & Reading Timer', href: '/words-to-time-calculator', icon: Clock },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0A0C10]/80 border-b border-white/5">
      <div className="app-container h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
            <Type className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            Count<span className="text-indigo-400">Wise</span>
          </span>
        </Link>

        {/* Navigation & Tools Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
            className="ui-btn text-xs font-medium py-1.5 px-3 bg-white/5 hover:bg-white/10"
          >
            <span>Platform Tools</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 surface-card p-1.5 shadow-2xl z-50 border border-white/10 space-y-0.5 animate-fade-in">
              {tools.map((t) => {
                const Icon = t.icon;
                return (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <Icon className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>{t.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
