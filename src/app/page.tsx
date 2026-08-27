'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Copy, Trash2, Check, Sparkles, ArrowRight, Linkedin, 
  Twitter, Search, Instagram, ShoppingBag, Clock
} from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';

export default function HomePage() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  // Core Metrics
  const charCount = text.length;
  const charNoSpaces = text.replace(/\s/g, '').length;
  
  const words = text.trim() ? text.trim().split(/\s+/) : [];
  const wordCount = text.trim() ? words.length : 0;
  
  const sentenceCount = text.trim() ? (text.match(/[^.!?]+[.!?]+/g) || [text]).length : 0;
  const paragraphCount = text.trim() ? text.split(/\n+/).filter(Boolean).length : 0;
  
  // Reading & speaking time estimates
  const readingTimeMinutes = Math.ceil(wordCount / 200);
  const speakingTimeMinutes = Math.ceil(wordCount / 130);
  
  // Character breakdowns
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
      `CountWise is a privacy-first, ultra-fast character counter and text analysis workspace built for digital creators, writers, and SEO professionals.\n\n` +
      `Paste or write your content here to instantly calculate character count, word count, reading duration, and sentence structure. Choose specialized platform tools below to optimize LinkedIn hooks, Twitter threads, and Google SERP snippets.`
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
      title: 'LinkedIn Hook Previewer',
      desc: 'Visualize the 210-character "See More" desktop & mobile fold line before scrollers truncated your post.',
      href: '/linkedin-character-counter',
      icon: Linkedin,
      badge: 'Hook Optimizer'
    },
    {
      title: 'Twitter Thread Splitter',
      desc: 'Automatically split long articles into numbered 280-character Twitter/X tweet cards ready to post.',
      href: '/twitter-character-counter',
      icon: Twitter,
      badge: 'Thread Splitter'
    },
    {
      title: 'Google SERP Previewer',
      desc: 'Simulate live Google desktop and mobile search snippets with pixel width and character count rules.',
      href: '/seo-meta-length-checker',
      icon: Search,
      badge: 'SEO Tool'
    },
    {
      title: 'Instagram Caption & Hashtags',
      desc: 'Track 2,200 character limit, preview 125-char cutoff line, and count maximum 30 hashtag allowance.',
      href: '/instagram-character-counter',
      icon: Instagram,
      badge: 'Caption Tool'
    },
    {
      title: 'Amazon Listing Checker',
      desc: 'Validate Amazon product title (75/200 chars) and bullet points while flagging forbidden promo words.',
      href: '/amazon-listing-character-counter',
      icon: ShoppingBag,
      badge: 'FBA Seller'
    },
    {
      title: 'Speech & Keynote Timer',
      desc: 'Convert word count into exact speaking minutes and seconds for keynote presentations and videos.',
      href: '/words-to-time-calculator',
      icon: Clock,
      badge: 'Speech Estimator'
    },
  ];

  return (
    <>
      <SchemaMarkup 
        name="CountWise - Character & Word Counter Workspace"
        description="Free real-time character counter, word counter, and text analysis suite with privacy-first client-side processing."
        url="https://countwise.app"
      />

      <div className="space-y-12 py-4">
        {/* Hero Header */}
        <section className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="ui-badge mx-auto">
            <Sparkles className="w-3.5 h-3.5" /> Privacy-First Client-Side Suite
          </div>
          <h1>
            Real-Time <span className="text-gradient">Text Analysis Workspace</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Instant character and word metrics with live platform previews for creators, marketers, and SEO specialists.
          </p>
        </section>

        {/* Primary Editor Workspace */}
        <section className="surface-card p-6 md:p-8 space-y-6">
          {/* Top Metrics Strip */}
          <div className="metrics-strip">
            <div className="metric-card">
              <span className="metric-label">Characters</span>
              <span className="metric-value metric-value-primary">{charCount.toLocaleString()}</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">Words</span>
              <span className="metric-value">{wordCount.toLocaleString()}</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">No Spaces</span>
              <span className="metric-value">{charNoSpaces.toLocaleString()}</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">Sentences</span>
              <span className="metric-value">{sentenceCount}</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">Paragraphs</span>
              <span className="metric-value">{paragraphCount}</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">Reading Time</span>
              <span className="metric-value">{readingTimeMinutes} <span className="text-xs text-gray-500 font-normal">min</span></span>
            </div>
          </div>

          {/* Text Area Input */}
          <textarea
            className="main-textarea"
            placeholder="Type or paste your content here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Bottom Toolbar & Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/5 text-xs">
            {/* Secondary Character Breakdown */}
            <div className="flex items-center gap-4 text-gray-400 font-mono">
              <span>Letters: <strong className="text-white">{letterCount}</strong></span>
              <span>Digits: <strong className="text-white">{digitCount}</strong></span>
              <span>Spaces: <strong className="text-white">{spaceCount}</strong></span>
              <span>Speaking: <strong className="text-white">{speakingTimeMinutes}m</strong></span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Case Converters */}
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/5 mr-2">
                <button onClick={() => applyCaseChange('upper')} className="ui-btn text-[11px] py-1 px-2">UPPER</button>
                <button onClick={() => applyCaseChange('lower')} className="ui-btn text-[11px] py-1 px-2">lower</button>
                <button onClick={() => applyCaseChange('title')} className="ui-btn text-[11px] py-1 px-2">Title</button>
                <button onClick={() => applyCaseChange('slug')} className="ui-btn text-[11px] py-1 px-2">slug</button>
              </div>

              <button onClick={loadSample} className="ui-btn text-xs">Sample</button>
              <button onClick={handleCopy} className="ui-btn ui-btn-primary text-xs">
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button onClick={handleClear} className="ui-btn ui-btn-danger text-xs">
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            </div>
          </div>
        </section>

        {/* Platform Tools Grid */}
        <section className="space-y-6">
          <div>
            <h2>Platform & Scenario Tools</h2>
            <p className="text-gray-400 text-xs mt-1">Specialized text counters with visual feed previews and platform constraints.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sceneTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link 
                  key={tool.href} 
                  href={tool.href} 
                  className="surface-card surface-card-interactive p-6 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="ui-badge text-[10px]">{tool.badge}</span>
                    </div>
                    <h3 className="group-hover:text-indigo-400 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-medium text-indigo-400">
                    <span>Open Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
