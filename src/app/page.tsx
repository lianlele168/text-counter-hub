'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Type, Copy, Trash2, Check, Sparkles, ArrowRight, Linkedin, 
  Twitter, Search, Instagram, ShoppingBag, Clock, FileText, BarChart2, Zap
} from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';

export default function HomePage() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  // Statistics calculation
  const charCount = text.length;
  const charNoSpaces = text.replace(/\s/g, '').length;
  
  const words = text.trim() ? text.trim().split(/\s+/) : [];
  const wordCount = text.trim() ? words.length : 0;
  
  const sentenceCount = text.trim() ? (text.match(/[^.!?]+[.!?]+/g) || [text]).length : 0;
  const paragraphCount = text.trim() ? text.split(/\n+/).filter(Boolean).length : 0;
  
  // Reading & speaking time estimates
  const readingTimeMinutes = (wordCount / 200).toFixed(1);
  const speakingTimeMinutes = (wordCount / 130).toFixed(1);
  
  // Letter / Digit / Symbol breakdown
  const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
  const digitCount = (text.match(/[0-9]/g) || []).length;
  const spaceCount = (text.match(/\s/g) || []).length;

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
      `CountWise is a privacy-first, zero-latency text and character counter designed for modern creators, marketers, and SEO specialists.\n\n` +
      `Whether you are crafting a high-engagement LinkedIn hook, splitting a long essay into a 280-character Twitter/X thread, or optimizing Google title tags and meta descriptions, CountWise provides instantaneous real-time metrics right in your browser.`
    );
  };

  const applyCaseChange = (type: string) => {
    if (!text) return;
    if (type === 'upper') setText(text.toUpperCase());
    if (type === 'lower') setText(text.toLowerCase());
    if (type === 'title') {
      setText(
        text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
      );
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
      title: 'LinkedIn Hook Preview',
      desc: 'Check 3,000 char post limit and visualize the exact 210-character "See More" desktop/mobile fold cutoff line.',
      href: '/linkedin-character-counter',
      icon: Linkedin,
      color: 'from-blue-600 to-cyan-500',
      badge: 'Hook Optimizer'
    },
    {
      title: 'Twitter Thread Splitter',
      desc: 'Split long articles into auto-numbered 280-character Twitter/X tweet cards ready to copy & post.',
      href: '/twitter-character-counter',
      icon: Twitter,
      color: 'from-sky-500 to-indigo-500',
      badge: 'Auto Splitter'
    },
    {
      title: 'Google SERP Snippet Preview',
      desc: 'Simulate live Google desktop and mobile search snippet results with pixel width & character limits.',
      href: '/seo-meta-length-checker',
      icon: Search,
      color: 'from-emerald-500 to-teal-600',
      badge: 'SEO Tool'
    },
    {
      title: 'Instagram Caption & Hashtag',
      desc: 'Track 2,200 character limit, caption preview, and count maximum 30 hashtags.',
      href: '/instagram-character-counter',
      icon: Instagram,
      color: 'from-pink-500 to-rose-600',
      badge: 'Caption Checker'
    },
    {
      title: 'Amazon Listing Checker',
      desc: 'Verify Amazon product titles (75/200 chars) and bullet point guidelines for FBA sellers.',
      href: '/amazon-listing-character-counter',
      icon: ShoppingBag,
      color: 'from-amber-500 to-orange-600',
      badge: 'FBA Seller'
    },
    {
      title: 'Speech & Reading Timer',
      desc: 'Convert word count into exact speaking minutes for keynote speeches, presentations, and videos.',
      href: '/words-to-time-calculator',
      icon: Clock,
      color: 'from-purple-600 to-indigo-600',
      badge: 'Speech Estimator'
    },
  ];

  return (
    <>
      <SchemaMarkup 
        name="CountWise - All-in-One Character & Word Counter"
        description="Free real-time character counter, word counter, and text analysis suite with privacy-first client-side processing."
        url="https://countwise.app"
      />

      <div className="space-y-10">
        {/* Hero Banner */}
        <section className="text-center space-y-4 max-w-3xl mx-auto pt-4">
          <div className="badge mx-auto">
            <Sparkles className="w-3.5 h-3.5" /> 100% Client-Side & Private Text Suite
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Real-Time <span className="gradient-text">Character & Word Counter</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg">
            Instant live text analysis with word count, character count, reading time, and custom platform tools for LinkedIn, Twitter, and SEO.
          </p>
        </section>

        {/* Primary Workspace Panel */}
        <section className="glass-panel p-6 space-y-6">
          {/* Main Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2 text-gray-400">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span className="font-semibold text-white">Live Text Editor</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={loadSample} className="btn-secondary text-xs py-1.5 px-3">
                Load Sample
              </button>
              <button onClick={handleCopy} className="btn-secondary text-xs py-1.5 px-3">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Text'}
              </button>
              <button onClick={handleClear} className="btn-secondary text-xs py-1.5 px-3 text-red-400 hover:text-red-300">
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            className="editor-textarea"
            placeholder="Type or paste your text here to count characters, words, sentences, and reading duration in real-time..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Primary Quick Stats Grid */}
          <div className="stats-grid">
            <div className="stat-box">
              <span className="stat-label">Characters</span>
              <span className="stat-value accent">{charCount.toLocaleString()}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Words</span>
              <span className="stat-value">{wordCount.toLocaleString()}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Without Spaces</span>
              <span className="stat-value">{charNoSpaces.toLocaleString()}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Sentences</span>
              <span className="stat-value">{sentenceCount}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Paragraphs</span>
              <span className="stat-value">{paragraphCount}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Reading Time</span>
              <span className="stat-value text-indigo-400">{readingTimeMinutes} <span className="text-xs text-gray-400 font-normal">min</span></span>
            </div>
          </div>

          {/* Secondary Detail Stats & Case Convert Bar */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-4 text-gray-400">
              <span>Letters: <strong className="text-white">{letterCount}</strong></span>
              <span>Digits: <strong className="text-white">{digitCount}</strong></span>
              <span>Spaces: <strong className="text-white">{spaceCount}</strong></span>
              <span>Speaking: <strong className="text-white">{speakingTimeMinutes} min</strong></span>
            </div>

            {/* Quick Case Conversions */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-gray-500 font-medium mr-1">Case:</span>
              <button onClick={() => applyCaseChange('upper')} className="btn-secondary text-[11px] py-1 px-2.5">UPPER</button>
              <button onClick={() => applyCaseChange('lower')} className="btn-secondary text-[11px] py-1 px-2.5">lower</button>
              <button onClick={() => applyCaseChange('title')} className="btn-secondary text-[11px] py-1 px-2.5">Title Case</button>
              <button onClick={() => applyCaseChange('slug')} className="btn-secondary text-[11px] py-1 px-2.5">url-slug</button>
            </div>
          </div>
        </section>

        {/* Scene-Specific Specialized Tools Showcase Grid */}
        <section className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Platform & Scenario Specialized Tools</h2>
              <p className="text-gray-400 text-sm">Optimize your content for specific platforms with visual previews & limits.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sceneTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.href} href={tool.href} className="glass-card group flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${tool.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="badge text-[10px]">{tool.badge}</span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-white group-hover:text-indigo-400 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                    <span>Open Specialized Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Informational SEO Guide & FAQ */}
        <section className="glass-panel p-8 space-y-6 text-sm text-gray-300">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            Why Accurate Character Counting Matters for Social Media & SEO
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
            <div className="space-y-2">
              <h3 className="font-semibold text-white">Social Media Limits & Hook Optimization</h3>
              <p className="text-xs text-gray-400">
                Platforms like LinkedIn truncate posts after approximately 210 characters with a &quot;See More&quot; button. If your hook isn&apos;t catchy within those first 210 characters, your reach drops dramatically. Similarly, Twitter imposes a 280-character hard limit per tweet.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-white">SEO Title & Meta Description Snippets</h3>
              <p className="text-xs text-gray-400">
                Google truncates search titles over ~60 characters (or ~580 pixels) and meta descriptions over ~160 characters. Staying within optimal limits prevents your snippets from being cut off with ellipsis in search engine results.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
