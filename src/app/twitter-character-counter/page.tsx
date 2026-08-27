'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Twitter, Copy, Check, Trash2, ArrowLeft, Scissors, AlertTriangle } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';

export default function TwitterCounterPage() {
  const [text, setText] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Helper to split text into 280-char tweet chunks intelligently by sentence/line
  const splitIntoTweets = (rawText: string): string[] => {
    if (!rawText.trim()) return [];
    
    const maxLen = 270; // Reserve 10 chars for thread counter e.g. "(1/5)"
    const paragraphs = rawText.split(/\n+/);
    const tweets: string[] = [];
    let currentTweet = '';

    paragraphs.forEach((p) => {
      if ((currentTweet + '\n\n' + p).length <= maxLen) {
        currentTweet = currentTweet ? `${currentTweet}\n\n${p}` : p;
      } else {
        if (currentTweet) tweets.push(currentTweet);
        // Handle long paragraph
        if (p.length > maxLen) {
          const words = p.split(' ');
          let temp = '';
          words.forEach((w) => {
            if ((temp + ' ' + w).length <= maxLen) {
              temp = temp ? `${temp} ${w}` : w;
            } else {
              tweets.push(temp);
              temp = w;
            }
          });
          currentTweet = temp;
        } else {
          currentTweet = p;
        }
      }
    });

    if (currentTweet) tweets.push(currentTweet);
    return tweets;
  };

  const tweets = splitIntoTweets(text);
  const tweetLimit = 280;

  const handleCopyTweet = (tweetText: string, index: number, total: number) => {
    const formatted = total > 1 ? `${tweetText}\n\n(${index + 1}/${total})` : tweetText;
    navigator.clipboard.writeText(formatted);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const loadSample = () => {
    setText(
      `1/ Building a 6-figure SaaS without VC funding isn't about code. It's about distribution.\n\n` +
      `Here are the 4 non-intuitive marketing loops we used to scale to $15k MRR in 90 days 🧵👇\n\n` +
      `2/ Loop #1: Programmatic SEO Landing Pages\n` +
      `Instead of competing for 1 high-volume keyword, we generated 120 scenario-specific pages targeting zero-competition long-tail queries.\n\n` +
      `3/ Loop #2: Free Interactive Micro-Tools\n` +
      `We built a simple 1-page calculator that solves an annoying daily task for our ICP. It attracted 450+ organic backlinks in 2 months.\n\n` +
      `4/ Loop #3: Automated LinkedIn & Twitter Teardowns\n` +
      `Every week, we published teardowns of successful tools in our niche. Founders retweeted us, giving us free viral distribution.`
    );
  };

  return (
    <>
      <SchemaMarkup
        name="Twitter Thread Splitter & 280 Character Counter"
        description="Free tool to count Twitter/X characters and automatically split long text articles into numbered 280-character tweet cards."
        url="https://countwise.app/twitter-character-counter"
      />

      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All-in-One Counter
        </Link>

        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/25">
              <Twitter className="w-5 h-5" />
            </div>
            <span className="badge">Twitter / X Tool</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Twitter Thread Splitter <span className="text-sky-400">& 280 Character Counter</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Paste any long essay or blog post. Our tool automatically formats and splits your content into perfectly-sized 280-character tweets with thread numbering (1/N).
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Editor */}
          <div className="glass-panel p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-300">Paste Full Article or Thread Draft</span>
              <div className="flex items-center gap-2">
                <button onClick={loadSample} className="btn-secondary text-[11px] py-1 px-2.5">
                  Load Sample
                </button>
                <button onClick={() => setText('')} className="btn-secondary text-[11px] py-1 px-2.5 text-red-400">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>

            <textarea
              className="editor-textarea min-h-[320px]"
              placeholder="Paste your long thread or essay here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="flex items-center justify-between text-xs text-gray-400 border-t border-white/10 pt-3">
              <span>Total Characters: <strong className="text-white">{text.length}</strong></span>
              <span className="text-sky-400 font-semibold flex items-center gap-1">
                <Scissors className="w-3.5 h-3.5" /> Generated {tweets.length} Tweet Cards
              </span>
            </div>
          </div>

          {/* Right Splitted Tweet Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Twitter className="w-4 h-4 text-sky-400" /> Tweet Cards ({tweets.length})
              </span>
              <span>280 Chars Max</span>
            </div>

            {tweets.length === 0 ? (
              <div className="glass-panel p-8 text-center text-gray-400 text-xs space-y-2">
                <Twitter className="w-8 h-8 mx-auto text-gray-600 animate-bounce" />
                <p>Paste text on the left to automatically split it into individual tweet cards.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {tweets.map((t, idx) => {
                  const len = t.length + 6; // Add (1/N) suffix length
                  const over = len > tweetLimit;

                  return (
                    <div key={idx} className="preview-box dark space-y-2.5 text-xs relative border border-gray-700">
                      <div className="flex items-center justify-between text-gray-400">
                        <span className="font-bold text-sky-400">Tweet {idx + 1} of {tweets.length}</span>
                        <span className={`font-semibold ${over ? 'text-red-400' : 'text-gray-300'}`}>
                          {len} / 280
                        </span>
                      </div>

                      <p className="text-gray-200 leading-relaxed font-sans whitespace-pre-wrap">
                        {t}
                        <span className="text-sky-400 font-semibold block mt-1">({idx + 1}/{tweets.length})</span>
                      </p>

                      {over && (
                        <div className="flex items-center gap-1 text-[11px] text-red-400">
                          <AlertTriangle className="w-3.5 h-3.5" /> Exceeds 280 characters by {len - 280} chars!
                        </div>
                      )}

                      <button
                        onClick={() => handleCopyTweet(t, idx, tweets.length)}
                        className="btn-secondary text-[11px] py-1 px-2.5 w-full justify-center mt-2"
                      >
                        {copiedIndex === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        {copiedIndex === idx ? 'Copied Tweet!' : `Copy Tweet ${idx + 1}`}
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
