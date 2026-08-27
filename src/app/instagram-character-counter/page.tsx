'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Instagram, Copy, Check, Trash2, ArrowLeft, Hash } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';

export default function InstagramCounterPage() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const charCount = text.length;
  const maxLimit = 2200;
  const foldLimit = 125; // First line cutoff threshold

  // Count Hashtags
  const hashtags = text.match(/#[^\s#]+/g) || [];
  const hashtagCount = hashtags.length;
  const maxHashtags = 30;

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setText(
      `5 Minimalist workspace upgrades that boosted our focus in 2026 ☕✨\n\n` +
      `Keeping your desk clutter-free directly reduces cognitive load and keeps creativity flowing.\n\n` +
      `#minimalism #productivity #workspace #setup #desksetup #software #designer`
    );
  };

  return (
    <>
      <SchemaMarkup
        name="Instagram Caption & Hashtag Counter"
        description="Free online Instagram caption character counter (2,200 max) and hashtag counter (30 max) with first-line 125-character truncation preview."
        url="https://counter.robloxwikihub.com/instagram-character-counter"
      />

      <div className="space-y-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 font-semibold transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All Counter Workspace
        </Link>

        {/* Title */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-600 font-bold">
              <Instagram className="w-4 h-4" />
            </div>
            <span className="bg-pink-100 text-pink-800 text-xs font-bold px-2.5 py-0.5 rounded-full">Instagram Caption</span>
          </div>
          <h1>
            Instagram Caption & Hashtag Inspector
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl font-medium">
            Instagram allows up to 2,200 characters and 30 hashtags per post. Captions are truncated after the first 125 characters in the user feed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor */}
          <div className="editor-surface space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Instagram Caption Draft</span>
              <div className="flex items-center gap-2">
                <button onClick={loadSample} className="btn-ui text-xs py-1 px-2.5">Load Sample</button>
                <button onClick={() => setText('')} className="btn-ui btn-ui-danger text-xs py-1 px-2.5">
                  <Trash2 className="w-3.5 h-3.5" /> Clear
                </button>
              </div>
            </div>

            <textarea
              className="editor-textarea min-h-[260px]"
              placeholder="Write or paste your Instagram caption and #hashtags here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 text-xs font-medium">
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center justify-between">
                <span className="text-slate-500">Caption Limit</span>
                <span className={`font-mono font-bold ${charCount > maxLimit ? 'text-red-600' : 'text-slate-800'}`}>
                  {charCount} / {maxLimit}
                </span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1"><Hash className="w-3.5 h-3.5 text-pink-500" /> Hashtags</span>
                <span className={`font-mono font-bold ${hashtagCount > maxHashtags ? 'text-red-600' : 'text-slate-800'}`}>
                  {hashtagCount} / {maxHashtags}
                </span>
              </div>
            </div>

            <button onClick={handleCopy} className="btn-ui btn-ui-primary w-full py-3">
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
              {copied ? 'Copied Caption!' : 'Copy Instagram Caption'}
            </button>
          </div>

          {/* Feed Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
              <span className="text-slate-800 flex items-center gap-1.5">
                <Instagram className="w-4 h-4 text-pink-600" /> Feed Truncation Preview
              </span>
              <span>125 Character Fold</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-pink-600 flex items-center justify-center text-white text-[10px]">
                  IG
                </div>
                <span>instagram_creator</span>
              </div>

              <div className="text-xs text-slate-800 leading-relaxed font-sans pt-1">
                {text ? (
                  <>
                    <span className="bg-pink-50 text-pink-900 px-1 rounded font-semibold border border-pink-200">
                      {text.slice(0, foldLimit)}
                    </span>
                    {text.length > foldLimit && (
                      <span className="text-slate-400 font-bold ml-1 cursor-pointer">...more</span>
                    )}
                  </>
                ) : (
                  <span className="text-slate-400 italic">
                    Your caption preview will render here. Highlighted text shows the first 125 characters visible before users tap "...more".
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
