'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Type, ChevronDown, Linkedin, Twitter, Search, Instagram, ShoppingBag, Clock, Sparkles } from 'lucide-react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'swiss' | 'warm'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('countwise_theme') as 'dark' | 'swiss' | 'warm';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const changeTheme = (newTheme: 'dark' | 'swiss' | 'warm') => {
    setTheme(newTheme);
    localStorage.setItem('countwise_theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  };

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
    <header className="border-b border-[var(--border-main)] bg-[var(--bg-card)] sticky top-0 z-50 transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
            <Type className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-[var(--text-primary)]">CountWise</span>
            <span className="block text-[11px] text-[var(--text-secondary)] font-normal">在线字数与字符统计工具</span>
          </div>
        </Link>

        {/* Right Action Bar */}
        <div className="flex items-center gap-4">
          {/* Theme Preset Switcher */}
          <div className="hidden sm:flex items-center gap-1 bg-[var(--bg-input)] p-1 rounded-lg border border-[var(--border-main)] text-xs">
            <span className="text-[10px] text-[var(--text-muted)] px-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-sky-400" /> 主题:
            </span>
            <button
              onClick={() => changeTheme('dark')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                theme === 'dark'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              北欧黑
            </button>
            <button
              onClick={() => changeTheme('swiss')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                theme === 'swiss'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              瑞士白
            </button>
            <button
              onClick={() => changeTheme('warm')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                theme === 'warm'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              柔光灰
            </button>
          </div>

          {/* Tools Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              onBlur={() => setTimeout(() => setOpen(false), 200)}
              className="btn text-xs"
            >
              <span>特定场景工具</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-72 bg-[var(--bg-card)] border border-[var(--border-main)] rounded-xl p-2 shadow-2xl z-50 space-y-1">
                {tools.map((t) => {
                  const Icon = t.icon;
                  return (
                    <Link
                      key={t.href}
                      href={t.href}
                      className="flex items-center gap-3 px-3 py-2.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] rounded-lg transition-colors"
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
      </div>
    </header>
  );
}
