'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Copy, Trash2, Check, ShieldCheck, ArrowRight, Linkedin, 
  Twitter, Search, Instagram, ShoppingBag, Clock, Sparkles, Filter
} from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';

export default function HomePage() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  // Metrics Calculation
  const charCount = text.length;
  const charNoSpaces = text.replace(/\s/g, '').length;
  
  // Mixed English words and CJK characters
  const cjkChars = (text.match(/[\u4e00-\u9fa5\u3040-\u30ff\uac00-\ud7af]/g) || []).length;
  const latinWords = text.replace(/[\u4e00-\u9fa5\u3040-\u30ff\uac00-\ud7af]/g, ' ').trim() 
    ? text.replace(/[\u4e00-\u9fa5\u3040-\u30ff\uac00-\ud7af]/g, ' ').trim().split(/\s+/).filter(Boolean).length 
    : 0;
  const totalWordCount = cjkChars + latinWords;
  
  const sentenceCount = text.trim() ? (text.match(/[^.!?。！？]+[.!?。！？]+/g) || [text]).length : 0;
  const paragraphCount = text.trim() ? text.split(/\n+/).filter(Boolean).length : 0;
  const readingTimeMinutes = totalWordCount === 0 ? 0 : Math.max(1, Math.ceil(totalWordCount / 250));

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
  };

  const loadSample = () => {
    setText(
      `Welcome to CountWise—the professional real-time text analysis & character counter workspace.\n\n` +
      `Paste or write your essay, blog post, or social media caption here to instantly calculate character length, word counts, sentence breaks, and estimated reading time.\n\n` +
      `Key Feature: All text processing runs 100% locally in your web browser. Your content is never transmitted or saved on any server, guaranteeing maximum data privacy.`
    );
  };

  const applyCaseChange = (type: string) => {
    if (!text) return;
    if (type === 'upper') setText(text.toUpperCase());
    if (type === 'lower') setText(text.toLowerCase());
    if (type === 'title') {
      setText(text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
    }
    if (type === 'slug') {
      setText(
        text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
      );
    }
  };

  const sceneTools = [
    {
      id: 'linkedin',
      title: 'LinkedIn Hook Previewer & Counter',
      desc: 'Count characters (3,000 max) and test your 210-character "...see more" cutoff line before publishing on LinkedIn.',
      href: '/linkedin-character-counter',
      icon: Linkedin,
      category: 'social',
      badge: 'LinkedIn'
    },
    {
      id: 'twitter',
      title: 'Twitter / X Thread Splitter',
      desc: 'Auto-split long essays into numbered tweets (1/N) complying with the 280-character limit with one-click copying.',
      href: '/twitter-character-counter',
      icon: Twitter,
      category: 'social',
      badge: 'Twitter Thread'
    },
    {
      id: 'seo',
      title: 'Google SERP Snippet Previewer',
      desc: 'Simulate search engine results. Verify title tags (<60 chars) and meta descriptions (<160 chars) to prevent truncation.',
      href: '/seo-meta-length-checker',
      icon: Search,
      category: 'seo',
      badge: 'SEO Checker'
    },
    {
      id: 'instagram',
      title: 'Instagram Caption & Hashtags Inspector',
      desc: 'Monitor 2,200 character limits, test 125-character first-line truncations, and count hashtag quotas (30 max).',
      href: '/instagram-character-counter',
      icon: Instagram,
      category: 'social',
      badge: 'Instagram'
    },
    {
      id: 'amazon',
      title: 'Amazon Seller Listing Inspector',
      desc: 'Check title lengths (75/200 limit) and bullet point guidelines while flagging prohibited seller promotional words.',
      href: '/amazon-listing-character-counter',
      icon: ShoppingBag,
      category: 'ecommerce',
      badge: 'Amazon Seller'
    },
    {
      id: 'speech',
      title: 'Speech & Reading Time Calculator',
      desc: 'Convert word count into exact speaking minutes and seconds based on slow, average, and fast speech speeds (WPM).',
      href: '/words-to-time-calculator',
      icon: Clock,
      category: 'time',
      badge: 'Speech Timer'
    },
  ];

  const filteredTools = activeCategory === 'all' 
    ? sceneTools 
    : sceneTools.filter(t => t.category === activeCategory);

  return (
    <>
      <SchemaMarkup 
        name="CountWise - Free Online Character & Word Counter Suite"
        description="Instant, private online character counter and word counter tool with platform-specific length previews."
        url="https://countwise.app"
      />

      <div className="space-y-10">
        {/* Portal Hero Banner */}
        <section className="hero-banner flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-indigo-100/80 border border-indigo-200 px-3 py-1 rounded-full text-xs font-bold text-indigo-800">
              <ShieldCheck className="w-4 h-4 text-indigo-600" /> 100% Client-Side Processing • Maximum Privacy
            </div>
            <h1>
              Character & Word Counter Workspace
            </h1>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
              Type or paste your text below to instantly analyze characters, words, sentences, and estimated reading time.
            </p>
          </div>

          {/* Quick Metrics Summary Box */}
          <div className="bg-white/80 backdrop-blur border border-indigo-100 rounded-2xl p-5 shadow-sm space-y-2 shrink-0 min-w-[240px]">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Status</div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-3xl font-extrabold text-indigo-600">{charCount.toLocaleString()}</span>
              <span className="text-xs font-semibold text-slate-500">Characters</span>
            </div>
            <div className="text-xs text-slate-500 font-medium pt-1 border-t border-slate-100 flex justify-between">
              <span>Words: <strong>{totalWordCount}</strong></span>
              <span>Paragraphs: <strong>{paragraphCount}</strong></span>
            </div>
          </div>
        </section>

        {/* Primary Workspace Panel */}
        <section className="editor-surface space-y-6">
          {/* Top 5 Stat Cards */}
          <div className="stat-pill-grid">
            <div className="stat-pill">
              <span className="stat-label">Total Characters</span>
              <span className="stat-value stat-value-primary">{charCount.toLocaleString()}</span>
            </div>
            <div className="stat-pill">
              <span className="stat-label">Word Count</span>
              <span className="stat-value">{totalWordCount.toLocaleString()}</span>
            </div>
            <div className="stat-pill">
              <span className="stat-label">No-Space Chars</span>
              <span className="stat-value">{charNoSpaces.toLocaleString()}</span>
            </div>
            <div className="stat-pill">
              <span className="stat-label">Paragraphs</span>
              <span className="stat-value">{paragraphCount}</span>
            </div>
            <div className="stat-pill">
              <span className="stat-label">Est. Reading Time</span>
              <span className="stat-value">{readingTimeMinutes} <span className="text-xs text-slate-400 font-normal">min</span></span>
            </div>
          </div>

          {/* Text Area Input */}
          <textarea
            className="editor-textarea"
            placeholder="Type or paste your content here to begin real-time analysis..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Toolbar Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200 text-xs">
            {/* Breakdown Stats */}
            <div className="flex items-center gap-4 text-slate-500 font-medium">
              <span>Sentences: <strong className="text-slate-800">{sentenceCount}</strong></span>
              <span>Asian Chars: <strong className="text-slate-800">{cjkChars}</strong></span>
              <span>Latin Words: <strong className="text-slate-800">{latinWords}</strong></span>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Case Converters */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                <button onClick={() => applyCaseChange('upper')} className="btn-ui text-[11px] py-1 px-2.5">UPPER</button>
                <button onClick={() => applyCaseChange('lower')} className="btn-ui text-[11px] py-1 px-2.5">lower</button>
                <button onClick={() => applyCaseChange('title')} className="btn-ui text-[11px] py-1 px-2.5">Title Case</button>
                <button onClick={() => applyCaseChange('slug')} className="btn-ui text-[11px] py-1 px-2.5">URL Slug</button>
              </div>

              <button onClick={loadSample} className="btn-ui">Load Sample</button>
              <button onClick={handleCopy} className="btn-ui btn-ui-primary">
                {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Text'}
              </button>
              <button onClick={handleClear} className="btn-ui btn-ui-danger">
                <Trash2 className="w-4 h-4" /> Clear
              </button>
            </div>
          </div>
        </section>

        {/* Specialized Sub-tools Portal Section (Inspired by BSide Reference Portal) */}
        <section className="space-y-6 pt-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2>Platform-Specific Length & Formatting Tools</h2>
              <p className="text-slate-500 text-xs mt-1 font-medium">Select a tool to test platform cutoff rules and live post previews:</p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400 font-bold flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              <button 
                onClick={() => setActiveCategory('all')}
                className={`filter-tab ${activeCategory === 'all' ? 'filter-tab-active' : ''}`}
              >
                All Tools ({sceneTools.length})
              </button>
              <button 
                onClick={() => setActiveCategory('social')}
                className={`filter-tab ${activeCategory === 'social' ? 'filter-tab-active' : ''}`}
              >
                Social Media
              </button>
              <button 
                onClick={() => setActiveCategory('seo')}
                className={`filter-tab ${activeCategory === 'seo' ? 'filter-tab-active' : ''}`}
              >
                SEO & SERP
              </button>
              <button 
                onClick={() => setActiveCategory('ecommerce')}
                className={`filter-tab ${activeCategory === 'ecommerce' ? 'filter-tab-active' : ''}`}
              >
                E-Commerce
              </button>
            </div>
          </div>

          {/* Tools Grid Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link 
                  key={tool.id} 
                  href={tool.href} 
                  className="tool-tile group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-slate-600">
                        {tool.badge}
                      </span>
                    </div>
                    <h3 className="group-hover:text-indigo-600 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">
                      {tool.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                    <span>Open Inspector</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
