'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Copy, Check, Trash2, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';

export default function SeoCheckerPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('https://example.com/blog/seo-guide');
  const [copied, setCopied] = useState(false);

  const titleChars = title.length;
  const descChars = description.length;

  const titleMaxChars = 60;
  const descMaxChars = 160;

  const loadSample = () => {
    setTitle('CountWise - Free Character & Word Counter Text Tool Suite');
    setDescription('Instant real-time character counter and word count tool. Optimizes text for LinkedIn hooks, Twitter threads, and Google SERP snippet pixel limits.');
    setUrl('https://countwise.app');
  };

  const handleCopy = () => {
    const formatted = `TITLE: ${title}\nDESCRIPTION: ${description}\nURL: ${url}`;
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SchemaMarkup
        name="Google SERP Snippet & Meta Length Previewer"
        description="Free real-time tool to check SEO title tag character/pixel limits and meta description length for Google desktop & mobile results."
        url="https://countwise.app/seo-meta-length-checker"
      />

      <div className="space-y-8 py-4">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All-in-One Workspace
        </Link>

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Search className="w-4 h-4" />
            </div>
            <span className="ui-badge">SEO Tool</span>
          </div>
          <h1>
            Google SERP Snippet <span className="text-gradient">& Meta Checker</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl">
            Simulate how your website appears on Google search results. Google truncates titles over ~60 chars and meta descriptions over ~160 chars.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Inputs */}
          <div className="surface-card p-6 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-300">Meta Tags Editor</span>
              <div className="flex items-center gap-2">
                <button onClick={loadSample} className="ui-btn text-xs py-1 px-2.5">Sample</button>
                <button onClick={() => { setTitle(''); setDescription(''); }} className="ui-btn ui-btn-danger text-xs py-1 px-2.5">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Target URL */}
            <div className="space-y-1 text-xs">
              <label className="text-gray-400">Page URL</label>
              <input
                type="text"
                className="main-textarea min-h-[42px] py-2 px-3 text-xs"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            {/* Title Tag Input */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <label className="text-gray-400">Title Tag</label>
                <span className={`font-mono ${titleChars > titleMaxChars ? 'text-red-400 font-bold' : 'text-emerald-400'}`}>
                  {titleChars} / 60 chars
                </span>
              </div>
              <textarea
                className="main-textarea min-h-[70px] py-2 px-3 text-xs"
                placeholder="Enter page title tag..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Meta Description Input */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <label className="text-gray-400">Meta Description</label>
                <span className={`font-mono ${descChars > descMaxChars ? 'text-red-400 font-bold' : 'text-emerald-400'}`}>
                  {descChars} / 160 chars
                </span>
              </div>
              <textarea
                className="main-textarea min-h-[100px] py-2 px-3 text-xs"
                placeholder="Enter meta description snippet..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button onClick={handleCopy} className="ui-btn ui-btn-primary w-full py-2.5">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy SEO Meta Tags'}
            </button>
          </div>

          {/* Right Live Google Card */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Search className="w-4 h-4 text-emerald-400" /> Simulated Google SERP Card
              </span>
              <span>Live Preview</span>
            </div>

            <div className="serp-card-preview space-y-2">
              <div className="text-xs text-gray-700 flex items-center gap-1 font-sans">
                <span className="text-gray-900 font-semibold">{url ? new URL(url || 'https://example.com').hostname : 'example.com'}</span>
                <span className="text-gray-400">› blog</span>
              </div>

              <h3 className="text-blue-800 text-lg font-normal hover:underline cursor-pointer leading-snug">
                {title || 'Page Title Tag Placeholder Preview'}
              </h3>

              <p className="text-xs text-gray-600 leading-relaxed">
                {description || 'Meta description preview snippet will render here as scrollers see it on Google Search.'}
              </p>
            </div>

            {/* Compliance Alerts */}
            {titleChars > titleMaxChars || descChars > descMaxChars ? (
              <div className="surface-card p-4 flex items-center gap-3 text-xs text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Title tag or meta description exceeds Google truncated length standards.</span>
              </div>
            ) : (
              <div className="surface-card p-4 flex items-center gap-3 text-xs text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Meta tag character lengths are perfectly optimized for Google search results!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
