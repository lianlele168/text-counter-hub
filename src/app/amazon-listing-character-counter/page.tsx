'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Copy, Check, Trash2, ArrowLeft, AlertTriangle } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';

export default function AmazonCounterPage() {
  const [title, setTitle] = useState('');
  const [bullet, setBullet] = useState('');
  const [copied, setCopied] = useState(false);

  const titleLen = title.length;
  const bulletLen = bullet.length;

  const titleLimitMobile = 75;
  const titleLimitMax = 200;
  const bulletLimitMax = 500;

  // Prohibited Seller Claim Words
  const restrictedWords = ['best seller', 'free shipping', 'guaranteed', '100% quality', '#1', 'cheap', 'discount'];
  const foundWords = restrictedWords.filter(w => 
    title.toLowerCase().includes(w) || bullet.toLowerCase().includes(w)
  );

  const handleCopy = () => {
    const text = `TITLE:\n${title}\n\nBULLET POINT:\n${bullet}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setTitle('Ergonomic Memory Foam Office Seat Cushion for Back Pain Relief');
    setBullet('PREMIUM DENSITY MEMORY FOAM: Crafted with 100% pure memory foam with zero additive fillers to support your lower lumbar spine and posture.');
  };

  return (
    <>
      <SchemaMarkup
        name="Amazon Seller Listing Character Counter & Inspector"
        description="Free online Amazon product listing length tool. Verify title length limits (75 mobile / 200 max) and scan for prohibited promotional words."
        url="https://countwise.app/amazon-listing-character-counter"
      />

      <div className="space-y-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 font-semibold transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All Counter Workspace
        </Link>

        {/* Title */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full">Amazon Seller</span>
          </div>
          <h1>
            Amazon Seller Listing Character Inspector
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl font-medium">
            Keep product titles under 75 characters for mobile optimization (200 max) and bullet points under 500 characters while flagging restricted policy terms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor */}
          <div className="editor-surface space-y-5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Edit Listing Copy</span>
              <button onClick={loadSample} className="btn-ui text-xs py-1 px-2.5">Load Sample</button>
            </div>

            {/* Product Title */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <label className="text-slate-700">Product Title (75 Mobile Cutoff / 200 Max)</label>
                <span className={`font-mono ${titleLen > titleLimitMax ? 'text-red-600 font-bold' : 'text-slate-500'}`}>
                  {titleLen} / {titleLimitMax} Chars
                </span>
              </div>
              <input
                type="text"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-600 text-slate-900 font-medium"
                placeholder="Enter Amazon product title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <p className="text-[11px] text-slate-400 font-medium">
                {titleLen > titleLimitMobile ? `⚠️ Mobile users may experience truncation after char 75.` : `✓ Optimal mobile title length.`}
              </p>
            </div>

            {/* Feature Bullet */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <label className="text-slate-700">Feature Bullet Point (500 Max)</label>
                <span className={`font-mono ${bulletLen > bulletLimitMax ? 'text-red-600 font-bold' : 'text-slate-500'}`}>
                  {bulletLen} / {bulletLimitMax} Chars
                </span>
              </div>
              <textarea
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-sm outline-none focus:border-indigo-600 text-slate-900 font-medium min-h-[120px] resize-y"
                placeholder="Enter feature bullet point text..."
                value={bullet}
                onChange={(e) => setBullet(e.target.value)}
              />
            </div>

            <button onClick={handleCopy} className="btn-ui btn-ui-primary w-full py-3">
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
              {copied ? 'Copied Amazon Listing!' : 'Copy Listing Copy'}
            </button>
          </div>

          {/* Compliance & Guidelines */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
              <span className="text-slate-800 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Amazon Policy Check
              </span>
              <span>Policy Audit</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Restricted Promotional Claims Scan</h3>
              {foundWords.length > 0 ? (
                <div className="bg-red-50 border border-red-200 p-3.5 rounded-xl space-y-1">
                  <span className="text-xs font-bold text-red-700">⚠️ Prohibited Terms Found:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {foundWords.map((w, idx) => (
                      <span key={idx} className="bg-red-200 text-red-900 text-xs font-mono font-bold px-2 py-0.5 rounded">
                        {w}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-red-600 pt-1 font-medium">
                    Amazon suppresses listings containing subjective claims like &quot;best seller&quot; or promotional text in titles.
                  </p>
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl text-xs font-bold text-emerald-800">
                  ✓ No restricted promotional terms detected in listing text.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
