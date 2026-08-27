'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Copy, Check, ArrowLeft, Globe } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';

export default function SeoMetaPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('https://countwise.app');
  const [copied, setCopied] = useState(false);

  const titleLen = title.length;
  const descLen = description.length;

  const maxTitle = 60;
  const maxDesc = 160;

  const handleCopyMeta = () => {
    const code = `<title>${title}</title>\n<meta name="description" content="${description}" />`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setTitle('CountWise - Free Online Character & Word Counter Suite');
    setDescription('Instant, private online character counter and word counter tool. Measure characters, words, sentences, and reading time with real-time platform previews.');
    setUrl('https://countwise.app');
  };

  return (
    <>
      <SchemaMarkup
        name="Google SERP Snippet & Meta Tag Length Checker"
        description="Free online Google search preview simulator. Test title tag (60 char max) and meta description (160 char max) length optimization."
        url="https://countwise.app/seo-meta-length-checker"
      />

      <div className="space-y-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 font-semibold transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All Counter Workspace
        </Link>

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold">
              <Search className="w-4 h-4" />
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">SEO SERP Inspector</span>
          </div>
          <h1>
            Google SERP Meta Snippet Inspector
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl font-medium">
            Test title tags (60 chars / ~580px max) and meta descriptions (160 chars / ~990px max) to prevent truncation in Google search results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inputs Panel */}
          <div className="editor-surface space-y-5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Edit Meta Tags</span>
              <button onClick={loadSample} className="btn-ui text-xs py-1 px-2.5">Load Sample Meta</button>
            </div>

            {/* Page Title */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <label className="text-slate-700">Meta Title Tag</label>
                <span className={`font-mono ${titleLen > maxTitle ? 'text-red-600 font-bold' : 'text-slate-500'}`}>
                  {titleLen} / {maxTitle} Chars
                </span>
              </div>
              <input
                type="text"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm outline-none focus:border-indigo-600 text-slate-900 font-medium"
                placeholder="e.g. CountWise - Free Online Character Counter"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Meta Description */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <label className="text-slate-700">Meta Description</label>
                <span className={`font-mono ${descLen > maxDesc ? 'text-red-600 font-bold' : 'text-slate-500'}`}>
                  {descLen} / {maxDesc} Chars
                </span>
              </div>
              <textarea
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-sm outline-none focus:border-indigo-600 text-slate-900 font-medium min-h-[100px] resize-y"
                placeholder="e.g. Free online character and word counter. Measure words, sentences, and reading time..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Target Page URL</label>
              <input
                type="text"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm outline-none focus:border-indigo-600 text-slate-900 font-medium"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <button onClick={handleCopyMeta} className="btn-ui btn-ui-primary w-full py-3">
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
              {copied ? 'Copied HTML Meta Code!' : 'Copy HTML Meta Code'}
            </button>
          </div>

          {/* SERP Card Live Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
              <span className="text-slate-800 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-600" /> Live Google Search Result Card
              </span>
              <span>Desktop SERP View</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-bold">
                  G
                </div>
                <span className="truncate">{url || 'https://countwise.app'}</span>
              </div>

              <h3 className="text-lg font-semibold text-[#1a0dab] hover:underline cursor-pointer leading-snug">
                {title ? (
                  titleLen > maxTitle ? `${title.slice(0, maxTitle)}...` : title
                ) : (
                  'Your Meta Title Will Render Here in Google Blue'
                )}
              </h3>

              <p className="text-sm text-[#4d5156] leading-relaxed font-sans">
                {description ? (
                  descLen > maxDesc ? `${description.slice(0, maxDesc)}...` : description
                ) : (
                  'Your meta description snippet preview will render here. Ensure it stays under 160 characters to avoid being replaced by Google auto-summaries.'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
