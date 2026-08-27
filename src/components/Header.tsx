'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Type, ChevronDown, Linkedin, Twitter, Search, Instagram, ShoppingBag, Clock } from 'lucide-react';

export default function Header() {
  const [open, setOpen] = useState(false);

  const tools = [
    { name: '全能字符与字数统计 (All-in-One Counter)', href: '/', icon: Type },
    { name: 'LinkedIn 帖子折叠线预览 (LinkedIn Hook)', href: '/linkedin-character-counter', icon: Linkedin },
    { name: 'Twitter 推文自动拆分 (Twitter Splitter)', href: '/twitter-character-counter', icon: Twitter },
    { name: 'Google SERP 搜索卡片预览 (SEO Preview)', href: '/seo-meta-length-checker', icon: Search },
    { name: 'Instagram 贴文与 Hashtag 统计', href: '/instagram-character-counter', icon: Instagram },
    { name: 'Amazon Listing 标题描述检测', href: '/amazon-listing-character-counter', icon: ShoppingBag },
    { name: '演讲与朗读时长计算器 (Speech Timer)', href: '/words-to-time-calculator', icon: Clock },
  ];

  return (
    <header className="border-b border-[#30363D] bg-[#161B22]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Type className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-xl text-white tracking-tight">CountWise</span>
            <span className="block text-[11px] text-gray-400 font-normal">在线字数与字符统计工具箱</span>
          </div>
        </Link>

        {/* Dropdown Menu */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            onBlur={() => setTimeout(() => setOpen(false), 200)}
            className="btn text-xs"
          >
            <span>特定平台工具箱 (Platform Tools)</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-72 bg-[#161B22] border border-[#30363D] rounded-xl p-2 shadow-2xl z-50 space-y-1">
              {tools.map((t) => {
                const Icon = t.icon;
                return (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="flex items-center gap-3 px-3 py-2.5 text-xs text-gray-200 hover:text-white hover:bg-[#21262D] rounded-lg transition-colors"
                  >
                    <Icon className="w-4 h-4 text-sky-400 shrink-0" />
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
