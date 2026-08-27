'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Copy, Check, Trash2, ArrowLeft, ShieldAlert, CheckCircle2 } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';

export default function AmazonCounterPage() {
  const [title, setTitle] = useState('');
  const [bullet1, setBullet1] = useState('');
  const [bullet2, setBullet2] = useState('');
  const [copied, setCopied] = useState(false);

  const titleLen = title.length;
  const titleMax = 200;
  const titleRecommended = 75; // Amazon 2026 search index recommendation

  const b1Len = bullet1.length;
  const b2Len = bullet2.length;
  const bulletMax = 200;

  // Flag promotional words forbidden by Amazon guidelines
  const forbiddenWords = ['best', 'free', 'cheap', '#1', 'top rated', 'guaranteed', 'discount'];
  const titleForbidden = forbiddenWords.filter((w) => title.toLowerCase().includes(w));

  const loadSample = () => {
    setTitle('Ergonomic Wireless Vertical Mouse - 2.4G Rechargeable Optical Computer Mouse with 3 Adjustable DPI');
    setBullet1('ERGONOMIC HEALTHY DESIGN: Encourages neutral wrist & arm positions for smoother movement and less overall strain.');
    setBullet2('AUTO-SLEEP POWER SAVING: Enters sleep mode after 8 minutes of inactivity to conserve battery life.');
  };

  const handleCopy = () => {
    const formatted = `PRODUCT TITLE:\n${title}\n\nBULLET 1:\n${bullet1}\n\nBULLET 2:\n${bullet2}`;
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SchemaMarkup
        name="Amazon Product Listing Character Counter & Guidelines Checker"
        description="Free online character counter tool for Amazon FBA sellers to verify product title length (75-200 chars), bullet point guidelines, and forbidden promo words."
        url="https://countwise.app/amazon-listing-character-counter"
      />

      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All-in-One Counter
        </Link>

        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/25">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="badge">Amazon Seller Tool</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Amazon Product Listing <span className="text-amber-400">Character Counter</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Amazon search indexing prioritizes titles under 75-150 characters (max 200) and bullet points under 200 characters each. Ensure compliance to avoid suppression.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Inputs */}
          <div className="glass-panel p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">Listing Fields Editor</span>
              <div className="flex items-center gap-2">
                <button onClick={loadSample} className="btn-secondary text-[11px] py-1 px-2.5">Load Sample</button>
                <button onClick={() => { setTitle(''); setBullet1(''); setBullet2(''); }} className="btn-secondary text-[11px] py-1 px-2.5 text-red-400">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Title input */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="text-gray-300 font-medium">Product Title</label>
                <span className={titleLen > titleMax ? 'text-red-400 font-bold' : 'text-amber-400'}>
                  {titleLen} / 200 chars ({titleLen <= titleRecommended ? 'Optimal Search Display' : 'Acceptable'})
                </span>
              </div>
              <textarea
                className="editor-textarea min-h-[90px]"
                placeholder="Enter Amazon Product Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Bullet Point 1 */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="text-gray-300 font-medium">Bullet Point 1</label>
                <span className={b1Len > bulletMax ? 'text-red-400 font-bold' : 'text-gray-400'}>
                  {b1Len} / 200 chars
                </span>
              </div>
              <textarea
                className="editor-textarea min-h-[70px]"
                placeholder="Enter Bullet Point 1..."
                value={bullet1}
                onChange={(e) => setBullet1(e.target.value)}
              />
            </div>

            {/* Bullet Point 2 */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="text-gray-300 font-medium">Bullet Point 2</label>
                <span className={b2Len > bulletMax ? 'text-red-400 font-bold' : 'text-gray-400'}>
                  {b2Len} / 200 chars
                </span>
              </div>
              <textarea
                className="editor-textarea min-h-[70px]"
                placeholder="Enter Bullet Point 2..."
                value={bullet2}
                onChange={(e) => setBullet2(e.target.value)}
              />
            </div>

            <button onClick={handleCopy} className="btn-primary w-full justify-center">
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Listing Text Copied!' : 'Copy Amazon Listing Text'}
            </button>
          </div>

          {/* Right Amazon Live Preview & Alerts */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-amber-400" /> Amazon PDP Snippet
              </span>
              <span>Guideline Compliance</span>
            </div>

            {/* Simulated Amazon Card */}
            <div className="preview-box space-y-3 border border-amber-200">
              <div className="flex gap-3">
                <div className="w-20 h-20 rounded bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] text-gray-400 shrink-0 font-bold">
                  📦 Product Image
                </div>
                <div className="space-y-1 text-xs">
                  <h3 className="font-semibold text-blue-900 leading-snug">
                    {title || 'Amazon Product Title Will Appear Here'}
                  </h3>
                  <div className="text-amber-500 text-[11px] font-bold">⭐⭐⭐⭐☆ 4.6 (1,240 ratings)</div>
                  <div className="text-red-700 font-bold text-sm">$29.99</div>
                </div>
              </div>

              {/* Bullet Points */}
              <div className="pt-2 border-t border-gray-100 text-xs text-gray-800 space-y-1.5">
                <p className="font-bold text-gray-900">About this item:</p>
                <ul className="list-disc list-inside space-y-1 text-[11px]">
                  <li>{bullet1 || 'Bullet point 1 content...'}</li>
                  <li>{bullet2 || 'Bullet point 2 content...'}</li>
                </ul>
              </div>
            </div>

            {/* Forbidden Term Alerts */}
            {titleForbidden.length > 0 ? (
              <div className="flex items-center gap-2 text-xs text-red-400 bg-red-950/40 border border-red-800/40 p-3 rounded-lg">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>
                  Amazon Style Guide flags promotional terms like: <strong>{titleForbidden.join(', ')}</strong>. Remove them to prevent suppression.
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 p-3 rounded-lg">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>No forbidden promotional keywords detected. Good job!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
