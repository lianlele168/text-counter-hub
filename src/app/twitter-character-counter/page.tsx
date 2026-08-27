'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Twitter, Copy, Check, Trash2, ArrowLeft, Layers } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';

export default function TwitterCounterPage() {
  const [text, setText] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const maxPerTweet = 280;

  // Split text into tweets based on 280 character budget
  const tweets: string[] = [];
  if (text.trim()) {
    const paragraphs = text.split(/\n\n+/);
    let currentTweet = '';

    paragraphs.forEach((p) => {
      if ((currentTweet + '\n\n' + p).length <= maxPerTweet - 10) {
        currentTweet = currentTweet ? `${currentTweet}\n\n${p}` : p;
      } else {
        if (currentTweet) tweets.push(currentTweet);
        if (p.length > maxPerTweet - 10) {
          // Chunk long paragraph by sentences
          const sentences = p.match(/[^.!?]+[.!?]+/g) || [p];
          let subTweet = '';
          sentences.forEach((s) => {
            if ((subTweet + s).length <= maxPerTweet - 10) {
              subTweet += s;
            } else {
              if (subTweet) tweets.push(subTweet.trim());
              subTweet = s;
            }
          });
          if (subTweet) currentTweet = subTweet.trim();
        } else {
          currentTweet = p;
        }
      }
    });
    if (currentTweet) tweets.push(currentTweet);
  }

  const handleCopyTweet = (tweetText: string, index: number) => {
    const formatted = `(${index + 1}/${tweets.length}) ${tweetText}`;
    navigator.clipboard.writeText(formatted);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const loadSample = () => {
    setText(
      `Here are 5 counter-intuitive productivity rules that helped our team launch 10 SaaS products in 12 months:\n\n` +
      `Rule 1: Asynchronous First. Never hold a live meeting for an update that can be written in a 2-minute text memo.\n\n` +
      `Rule 2: Ruthless Scoping. Ship the core utility first, then refine aesthetics based on real user feedback.\n\n` +
      `Rule 3: Client-Side Performance. Process user data locally to cut server overhead and deliver instant responsiveness.`
    );
  };

  return (
    <>
      <SchemaMarkup
        name="Twitter / X Thread Splitter & Character Counter"
        description="Free online Twitter thread generator. Automatically split long blog posts into 280-character numbered tweets (1/N)."
        url="https://counter.robloxwikihub.com/twitter-character-counter"
      />

      <div className="space-y-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 font-semibold transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All Counter Workspace
        </Link>

        {/* Title */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-500 font-bold">
              <Twitter className="w-4 h-4" />
            </div>
            <span className="bg-sky-100 text-sky-800 text-xs font-bold px-2.5 py-0.5 rounded-full">Twitter Thread</span>
          </div>
          <h1>
            Twitter / X Thread Splitter
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl font-medium">
            Paste your long post or article below. We automatically segment it into numbered tweets complying with Twitter&apos;s 280-character limit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Editor */}
          <div className="editor-surface space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Source Content</span>
              <div className="flex items-center gap-2">
                <button onClick={loadSample} className="btn-ui text-xs py-1 px-2.5">Load Sample</button>
                <button onClick={() => setText('')} className="btn-ui btn-ui-danger text-xs py-1 px-2.5">
                  <Trash2 className="w-3.5 h-3.5" /> Clear
                </button>
              </div>
            </div>

            <textarea
              className="editor-textarea min-h-[320px]"
              placeholder="Paste your long article or thread draft here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          {/* Right Generated Tweets */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
              <span className="text-slate-800 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-sky-500" /> Generated Tweet Thread ({tweets.length} Tweets)
              </span>
              <span>280 Character Limit</span>
            </div>

            {tweets.length === 0 ? (
              <div className="editor-surface p-8 text-center text-slate-400 text-xs italic font-medium">
                Type or paste content on the left to automatically split it into formatted Twitter thread cards.
              </div>
            ) : (
              <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
                {tweets.map((t, idx) => {
                  const len = t.length + 8; // Including index tag "(1/N) "
                  return (
                    <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-sky-600">Tweet #{idx + 1} of {tweets.length}</span>
                        <span className="font-mono text-slate-400">{len} / 280</span>
                      </div>
                      <p className="text-sm text-slate-800 leading-relaxed font-sans">
                        <span className="font-bold text-slate-400">({idx + 1}/{tweets.length})</span> {t}
                      </p>
                      <button
                        onClick={() => handleCopyTweet(t, idx)}
                        className="btn-ui text-xs w-full py-2 bg-slate-50 hover:bg-slate-100"
                      >
                        {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedIndex === idx ? 'Copied Tweet!' : 'Copy Tweet'}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
