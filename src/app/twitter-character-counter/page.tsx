'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Twitter, Copy, Check, Trash2, ArrowLeft } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';

export default function TwitterCounterPage() {
  const [text, setText] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const maxLimit = 280;

  // Split text logic into ~280 char tweet blocks
  const splitTweets = (input: string): string[] => {
    if (!input.trim()) return [];

    const paragraphs = input.split(/\n+/).filter(Boolean);
    const tweets: string[] = [];
    let currentTweet = '';

    paragraphs.forEach((p) => {
      if ((currentTweet + '\n\n' + p).length <= maxLimit - 10) {
        currentTweet = currentTweet ? `${currentTweet}\n\n${p}` : p;
      } else {
        if (currentTweet) tweets.push(currentTweet);
        if (p.length > maxLimit - 10) {
          // Break paragraph by sentences
          const sentences = p.match(/[^.!?]+[.!?]+/g) || [p];
          let subTweet = '';
          sentences.forEach((s) => {
            if ((subTweet + s).length <= maxLimit - 10) {
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
    return tweets.map((t, idx, arr) => `${t}\n\n(${idx + 1}/${arr.length})`);
  };

  const tweets = splitTweets(text);

  const copySingleTweet = (tweetText: string, index: number) => {
    navigator.clipboard.writeText(tweetText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const loadSample = () => {
    setText(
      `Building a SaaS in 2026 requires a fundamentally different playbook than 5 years ago.\n\n` +
      `Instead of spending months writing complex backends, modern solo developers deploy specialized AI agents that generate, test, and ship features in hours.\n\n` +
      `Here are the 4 core tools we used to scale our text suite to 50,000 monthly active users...`
    );
  };

  return (
    <>
      <SchemaMarkup
        name="Twitter/X Thread Splitter & 280-Character Counter"
        description="Free online tool to split long essays into formatted 280-character Twitter thread cards with auto-numbering."
        url="https://countwise.app/twitter-character-counter"
      />

      <div className="space-y-8 py-4">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All-in-One Workspace
        </Link>

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Twitter className="w-4 h-4" />
            </div>
            <span className="ui-badge">Twitter / X Tool</span>
          </div>
          <h1>
            Twitter Thread <span className="text-gradient">Splitter & Counter</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl">
            Split long articles or threads into formatted 280-character Twitter cards with automated `(1/N)` numbering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Editor */}
          <div className="surface-card p-6 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-300">Input Essay or Post Text</span>
              <div className="flex items-center gap-2">
                <button onClick={loadSample} className="ui-btn text-xs py-1 px-2.5">Sample</button>
                <button onClick={() => setText('')} className="ui-btn ui-btn-danger text-xs py-1 px-2.5">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>

            <textarea
              className="main-textarea min-h-[300px]"
              placeholder="Paste long text to automatically split into 280-character tweet cards..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          {/* Right Cards Stream */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Twitter className="w-4 h-4 text-sky-400" /> Generated Tweet Cards ({tweets.length})
              </span>
              <span>280 Chars / Card</span>
            </div>

            {tweets.length === 0 ? (
              <div className="surface-card p-8 text-center text-xs text-gray-500">
                Type or paste text on the left to see auto-formatted tweet cards.
              </div>
            ) : (
              <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                {tweets.map((t, idx) => {
                  const isOver = t.length > maxLimit;
                  return (
                    <div key={idx} className="preview-card space-y-2">
                      <div className="flex justify-between items-center text-xs border-b border-gray-100 pb-2">
                        <span className="font-bold text-gray-900">Tweet #{idx + 1}</span>
                        <span className={`font-mono text-[11px] ${isOver ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
                          {t.length} / {maxLimit}
                        </span>
                      </div>
                      <p className="text-xs text-gray-800 leading-relaxed font-sans whitespace-pre-wrap">{t}</p>
                      <button
                        onClick={() => copySingleTweet(t, idx)}
                        className="w-full ui-btn text-xs py-1.5 mt-2 bg-gray-900 text-white hover:bg-gray-800"
                      >
                        {copiedIndex === idx ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedIndex === idx ? 'Copied' : `Copy Tweet #${idx + 1}`}
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
