'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Instagram, Copy, Check, Trash2, ArrowLeft, Hash, AlertCircle } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';

export default function InstagramCounterPage() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const charCount = text.length;
  const maxLimit = 2200;
  const foldLimit = 125; // Instagram feed truncation line

  // Count hashtags in text
  const hashtags = (text.match(/#[a-zA-Z0-9_]+/g) || []);
  const hashtagCount = hashtags.length;
  const hashtagMax = 30;

  const charOver = charCount > maxLimit;
  const hashtagOver = hashtagCount > hashtagMax;

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setText(
      `Unlocking the secret to 10x organic reach on Instagram Reels 🚀✨\n\n` +
      `Stop creating content for everyone. Instead, focus on these 3 micro-hooks that convert scrollers into followers within 3 seconds.\n\n` +
      `Save this post for your next content strategy session! 📌\n\n` +
      `#contentcreator #instagramgrowth #socialmediamarketing #digitalmarketing #marketingtips #growthhacking #viralreels`
    );
  };

  return (
    <>
      <SchemaMarkup
        name="Instagram Caption & Hashtag Limit Counter"
        description="Free online tool to count Instagram caption characters (2,200 limit), preview 125-character feed truncation line, and count hashtags (30 max limit)."
        url="https://countwise.app/instagram-character-counter"
      />

      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All-in-One Counter
        </Link>

        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-pink-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/25">
              <Instagram className="w-5 h-5" />
            </div>
            <span className="badge">Instagram Tool</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Instagram Caption <span className="text-pink-400">& Hashtag Limit Counter</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Instagram allows up to 2,200 characters per caption and a maximum of 30 hashtags. Feed posts truncate after 125 characters—make sure your first sentence hooks scrollers immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Editor */}
          <div className="glass-panel p-5 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-300">Compose Instagram Caption</span>
              <div className="flex items-center gap-2">
                <button onClick={loadSample} className="btn-secondary text-[11px] py-1 px-2.5">Load Sample</button>
                <button onClick={() => setText('')} className="btn-secondary text-[11px] py-1 px-2.5 text-red-400">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>

            <textarea
              className="editor-textarea min-h-[260px]"
              placeholder="Paste or write your Instagram caption and hashtags here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="stat-box">
                <span className="stat-label">Caption Length</span>
                <span className={`stat-value ${charOver ? 'text-red-400' : 'text-pink-400'}`}>
                  {charCount} <span className="text-xs text-gray-400 font-normal">/ {maxLimit}</span>
                </span>
              </div>

              <div className="stat-box">
                <span className="stat-label flex items-center gap-1">
                  <Hash className="w-3 h-3 text-purple-400" /> Hashtags
                </span>
                <span className={`stat-value ${hashtagOver ? 'text-red-400' : 'text-purple-400'}`}>
                  {hashtagCount} <span className="text-xs text-gray-400 font-normal">/ {hashtagMax}</span>
                </span>
              </div>
            </div>

            {/* Warning banners */}
            {hashtagOver && (
              <div className="flex items-center gap-2 text-xs text-red-400 bg-red-950/40 border border-red-800/40 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Instagram blocks captions with more than 30 hashtags. You have {hashtagCount}.</span>
              </div>
            )}

            <button onClick={handleCopy} className="btn-primary w-full justify-center">
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Caption Copied!' : 'Copy Instagram Caption'}
            </button>
          </div>

          {/* Right Simulated Instagram Feed Card */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Instagram className="w-4 h-4 text-pink-400" /> Feed Post Preview
              </span>
              <span>125 Chars Feed Cutoff</span>
            </div>

            <div className="preview-box space-y-3 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-0.5">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-[10px] font-bold">
                      IG
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-900">creator_studio</span>
                </div>
                <span className="text-gray-400 text-xs">•••</span>
              </div>

              {/* Image Placeholder Box */}
              <div className="w-full h-48 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-inner">
                ✨ Photo / Reel Media Asset
              </div>

              {/* Caption Text with 125 char fold */}
              <div className="text-xs text-gray-900 leading-relaxed font-sans">
                <span className="font-bold mr-1.5">creator_studio</span>
                {text ? (
                  <>
                    <span className="bg-pink-100 text-pink-950 px-1 rounded font-medium">
                      {text.slice(0, foldLimit)}
                    </span>
                    {text.length > foldLimit && (
                      <span className="text-gray-400 ml-1 font-semibold">...more</span>
                    )}
                  </>
                ) : (
                  <span className="text-gray-400 italic">
                    Caption text preview will appear here. Highlighted pink text shows what is visible before &quot;...more&quot; is clicked.
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
