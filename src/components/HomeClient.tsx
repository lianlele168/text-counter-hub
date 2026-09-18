'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, ArrowRight, Linkedin, 
  Twitter, Search, Instagram, ShoppingBag, Clock, Sparkles, Filter, QrCode
} from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';
import CounterStudio from '@/components/CounterStudio';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const sceneTools = [
    {
      id: 'qr',
      title: 'Vector QR Code Studio',
      desc: 'Create high-res SVG & PNG QR codes for URLs, WiFi, vCards, and logos with 100% privacy.',
      href: 'https://qrcode.robloxwikihub.com',
      icon: QrCode,
      category: 'utility',
      badge: 'QR Code Hub'
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Hook Cutoff Previewer',
      desc: 'Count characters (3,000 max) and test your 210-character "...see more" cutoff line before posting.',
      href: '/linkedin-character-counter',
      icon: Linkedin,
      category: 'social',
      badge: 'LinkedIn'
    },
    {
      id: 'twitter',
      title: 'Twitter / X Thread Splitter',
      desc: 'Auto-split long essays into numbered tweets complying with the 280-character limit.',
      href: '/twitter-character-counter',
      icon: Twitter,
      category: 'social',
      badge: 'Twitter'
    },
    {
      id: 'seo',
      title: 'Google SERP Meta Inspector',
      desc: 'Simulate search engine results. Test title tags (<60 chars) and meta descriptions (<160 chars).',
      href: '/seo-meta-length-checker',
      icon: Search,
      category: 'seo',
      badge: 'SEO Checker'
    },
    {
      id: 'instagram',
      title: 'Instagram Caption & Hashtag Counter',
      desc: 'Monitor 2,200 character limits, test 125-char truncations, and count hashtag quotas (30 max).',
      href: '/instagram-character-counter',
      icon: Instagram,
      category: 'social',
      badge: 'Instagram'
    },
    {
      id: 'amazon',
      title: 'Amazon Seller Listing Inspector',
      desc: 'Verify title lengths (75/200 limit) and bullet point guidelines while flagging promotional words.',
      href: '/amazon-listing-character-counter',
      icon: ShoppingBag,
      category: 'ecommerce',
      badge: 'Amazon'
    },
    {
      id: 'speech',
      title: 'Speech & Reading Time Calculator',
      desc: 'Convert word count into exact speaking minutes and seconds based on custom WPM speech speeds.',
      href: '/words-to-time-calculator',
      icon: Clock,
      category: 'time',
      badge: 'Speech WPM'
    },
  ];

  const filteredTools = activeCategory === 'all' 
    ? sceneTools 
    : sceneTools.filter(t => t.category === activeCategory);

  const faqs = [
    {
      q: "Is my text data private and secure?",
      a: "Yes. All text processing and character counting run 100% client-side inside your browser. No text is ever uploaded or stored on any server."
    },
    {
      q: "How does CountWise calculate word count for CJK (Chinese, Japanese, Korean) characters?",
      a: "Our algorithm intelligently separates Latin words by spaces while counting each CJK ideograph character as an individual word for accurate multi-language analysis."
    },
    {
      q: "What is the LinkedIn '...see more' cutoff limit?",
      a: "LinkedIn truncates posts after approximately 210 characters on desktop feeds. Our inspector tool lets you test your first 3 lines before posting."
    }
  ];

  return (
    <>
      <SchemaMarkup 
        name="CountWise - Free Online Character & Word Counter Suite"
        description="Instant, private online character counter and word counter tool with platform-specific length previews."
        url="https://counter.robloxwikihub.com"
        faqs={faqs}
      />

      <div className="space-y-12">
        {/* Portal Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full text-xs font-bold text-indigo-300 backdrop-blur">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Client-Side Processing • Zero Server Storage
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Character & Word Counter <span className="text-indigo-400">Studio</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
              Analyze character lengths, word counts, sentence breaks, and platform truncation limits in real time with absolute browser privacy.
            </p>
          </div>
        </section>

        {/* Primary Interactive Studio */}
        <section>
          <CounterStudio initialMode="all" />
        </section>

        {/* Specialized Platform Tools Grid */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Platform-Specific Counter Utilities</h2>
              <p className="text-slate-500 text-xs mt-1 font-medium">Select a tool to test platform cutoff rules and live post previews:</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400 font-bold flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              {[
                { id: 'all', label: `All (${sceneTools.length})` },
                { id: 'social', label: 'Social Media' },
                { id: 'seo', label: 'SEO & SERP' },
                { id: 'utility', label: 'Utilities' },
              ].map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`filter-tab ${activeCategory === cat.id ? 'filter-tab-active' : ''}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              const isExternal = tool.href.startsWith('http');
              return (
                <Link 
                  key={tool.id} 
                  href={tool.href} 
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="group bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-indigo-600 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="bg-slate-100 border border-slate-200/80 px-3 py-1 rounded-full text-xs font-extrabold text-slate-700">
                        {tool.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">
                      {tool.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                    <span>{isExternal ? 'Open Tool Site' : 'Launch Inspector'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Minimal FAQ Section */}
        <section className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-10 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-500 font-medium">Everything you need to know about text counting rules and privacy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-2 shadow-sm">
                <h4 className="text-sm font-bold text-slate-900">{faq.q}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
