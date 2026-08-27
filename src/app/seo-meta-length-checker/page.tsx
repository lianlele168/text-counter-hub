'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Copy, Check, Trash2, ArrowLeft, Monitor, Smartphone, AlertCircle, Globe } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';

export default function SeoMetaCheckerPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('https://example.com/blog/my-guide');
  const [keyword, setKeyword] = useState('');
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);

  const titleLen = title.length;
  const descLen = description.length;

  const titleMax = 60;
  const descMax = 160;

  const titleOver = titleLen > titleMax;
  const descOver = descLen > descMax;

  // Approximate pixel widths
  const titlePx = Math.round(titleLen * 9.5);
  const descPx = Math.round(descLen * 6.2);

  const loadSample = () => {
    setTitle('CountWise: Scene-Specific Character & Word Counter Tools');
    setDescription('Free privacy-first character counter & word counter tools. Preview LinkedIn post hooks, Twitter thread splitters, and Google SERP title tags instantly.');
    setUrl('https://countwise.app');
    setKeyword('character counter');
  };

  const handleCopy = () => {
    const code = `<title>${title}</title>\n<meta name="description" content="${description}" />`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Highlight keyword in title and snippet
  const highlightKeyword = (text: string) => {
    if (!keyword.trim() || !text) return text;
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === keyword.toLowerCase() ? (
        <strong key={i} className="font-bold text-gray-900 bg-yellow-100 px-0.5 rounded">{part}</strong>
      ) : part
    );
  };

  return (
    <>
      <SchemaMarkup
        name="Google SERP Snippet & Meta Description Length Checker"
        description="Free tool to simulate Google desktop and mobile search snippets, check title tag character & pixel limits, and optimize meta descriptions."
        url="https://countwise.app/seo-meta-length-checker"
      />

      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All-in-One Counter
        </Link>

        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25">
              <Search className="w-5 h-5" />
            </div>
            <span className="badge">SEO SERP Tool</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Google SERP Snippet Preview <span className="text-emerald-400">& Pixel Checker</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Google truncates page titles over 60 characters (~580px) and meta descriptions over 160 characters (~990px). Test how your webpage appears on Google Search in real-time.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Inputs */}
          <div className="glass-panel p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">SEO Meta Tag Inputs</span>
              <div className="flex items-center gap-2">
                <button onClick={loadSample} className="btn-secondary text-[11px] py-1 px-2.5">Load Sample</button>
                <button onClick={() => { setTitle(''); setDescription(''); }} className="btn-secondary text-[11px] py-1 px-2.5 text-red-400">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Target Keyword */}
            <div className="space-y-1">
              <label className="text-gray-300 font-medium">Target Focus Keyword (Optional)</label>
              <input
                type="text"
                placeholder="e.g. character counter"
                className="w-full bg-slate-900 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-indigo-500"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>

            {/* Page URL */}
            <div className="space-y-1">
              <label className="text-gray-300 font-medium">Page URL</label>
              <input
                type="text"
                className="w-full bg-slate-900 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-indigo-500"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            {/* Meta Title */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="text-gray-300 font-medium">SEO Meta Title Tag</label>
                <span className={titleOver ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                  {titleLen} / 60 chars ({titlePx}px / 580px)
                </span>
              </div>
              <input
                type="text"
                placeholder="Enter page title..."
                className="w-full bg-slate-900 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-indigo-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {titleOver && <p className="text-red-400 text-[11px]">Title may be cut off with &quot;...&quot; on Google SERP.</p>}
            </div>

            {/* Meta Description */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="text-gray-300 font-medium">Meta Description</label>
                <span className={descOver ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                  {descLen} / 160 chars ({descPx}px / 990px)
                </span>
              </div>
              <textarea
                className="editor-textarea min-h-[110px]"
                placeholder="Enter meta description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {descOver && <p className="text-red-400 text-[11px]">Meta description exceeds recommended 160-character limit.</p>}
            </div>

            <button onClick={handleCopy} className="btn-primary w-full justify-center">
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              {copied ? 'HTML Tags Copied!' : 'Copy HTML Meta Code'}
            </button>
          </div>

          {/* Right Preview Card */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-400" /> Google Search Preview
              </span>
              
              {/* Desktop / Mobile Switch */}
              <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5">
                <button
                  onClick={() => setDevice('desktop')}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium ${device === 'desktop' ? 'bg-indigo-600 text-white' : 'text-gray-400'}`}
                >
                  <Monitor className="w-3 h-3" /> Desktop
                </button>
                <button
                  onClick={() => setDevice('mobile')}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium ${device === 'mobile' ? 'bg-indigo-600 text-white' : 'text-gray-400'}`}
                >
                  <Smartphone className="w-3 h-3" /> Mobile
                </button>
              </div>
            </div>

            {/* Simulated Google Card */}
            <div className={`serp-card transition-all ${device === 'mobile' ? 'max-w-[360px] mx-auto' : ''}`}>
              <div className="serp-url">
                <span className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[10px]">🌐</span>
                <span className="truncate">{url || 'https://example.com'}</span>
              </div>

              <h3 className="serp-title">
                {title ? highlightKeyword(title.slice(0, titleMax)) : 'Your SEO Page Title Appears Here'}
                {titleLen > titleMax && '...'}
              </h3>

              <p className="serp-snippet">
                {description ? highlightKeyword(description.slice(0, descMax)) : 'Your meta description snippet will be rendered here. Google highlights matching target search keywords in bold text.'}
                {descLen > descMax && '...'}
              </p>
            </div>

            {/* SEO Rules Alert */}
            <div className="glass-panel p-4 text-xs space-y-2 text-gray-300">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-emerald-400" /> Google Snippet Best Practices
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li>Keep Title tags between <strong>50 - 60 characters</strong> (580px limit).</li>
                <li>Keep Meta descriptions between <strong>120 - 160 characters</strong>.</li>
                <li>Include your primary keyword near the beginning of the title tag.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
