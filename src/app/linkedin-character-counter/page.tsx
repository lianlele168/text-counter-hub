'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Linkedin, Copy, Check, Trash2, ArrowLeft, AlertCircle } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';

export default function LinkedInCounterPage() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const charCount = text.length;
  const maxLimit = 3000;
  const foldLimit = 210; // LinkedIn truncation line

  const percentUsed = Math.min((charCount / maxLimit) * 100, 100);
  const isOverLimit = charCount > maxLimit;

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setText(
      `Most creators fail on LinkedIn because they write 500-word essays without a clear hook. Here is the 3-step formula we used to generate 1.2M impressions with zero ad spend.\n\n` +
      `1. The 210-Character Hook: Put your biggest paradox or metric in the first line before "See More" truncates it.\n\n` +
      `2. Short Paragraphs: Keep sentences under 12 words so scrollers don't get fatigue.\n\n` +
      `3. Single Call-to-Action: Ask one question at the end to drive comments.`
    );
  };

  return (
    <>
      <SchemaMarkup
        name="LinkedIn Post Character Counter & Hook Previewer"
        description="Free online tool to count LinkedIn post characters (3,000 limit) and preview the 210-character 'See More' cutoff line on mobile and desktop."
        url="https://countwise.app/linkedin-character-counter"
      />

      <div className="space-y-8 py-4">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All-in-One Workspace
        </Link>

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Linkedin className="w-4 h-4" />
            </div>
            <span className="ui-badge">LinkedIn Tool</span>
          </div>
          <h1>
            LinkedIn Post <span className="text-gradient">Hook Previewer & Counter</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl">
            LinkedIn limits posts to 3,000 characters and truncates posts after the first 210 characters with a &quot;...see more&quot; button.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Editor */}
          <div className="surface-card p-6 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-300">Compose LinkedIn Post</span>
              <div className="flex items-center gap-2">
                <button onClick={loadSample} className="ui-btn text-xs py-1 px-2.5">Sample</button>
                <button onClick={() => setText('')} className="ui-btn ui-btn-danger text-xs py-1 px-2.5">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>

            <textarea
              className="main-textarea min-h-[260px]"
              placeholder="Paste or write your LinkedIn post text..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {/* Metrics */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Character Limit</span>
                <span className={`font-mono font-semibold ${isOverLimit ? 'text-red-400' : 'text-indigo-400'}`}>
                  {charCount} / {maxLimit}
                </span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all ${isOverLimit ? 'bg-red-500' : 'bg-indigo-500'}`}
                  style={{ width: `${percentUsed}%` }}
                />
              </div>
            </div>

            <button onClick={handleCopy} className="ui-btn ui-btn-primary w-full py-2.5">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied to Clipboard' : 'Copy LinkedIn Post'}
            </button>
          </div>

          {/* Right Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Linkedin className="w-4 h-4 text-blue-400" /> LinkedIn Feed Preview
              </span>
              <span>210 Chars Cutoff Line</span>
            </div>

            <div className="preview-card space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                  IN
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 leading-tight">Digital Creator</h3>
                  <p className="text-[11px] text-gray-500">Content Strategist • 1h • 🌐</p>
                </div>
              </div>

              {/* Text Preview with 210 Fold */}
              <div className="text-sm text-gray-800 leading-relaxed font-sans pt-1">
                {text ? (
                  <>
                    <span className="bg-indigo-50 text-indigo-950 px-1 rounded font-medium">
                      {text.slice(0, foldLimit)}
                    </span>
                    {text.length > foldLimit && (
                      <span className="text-gray-400 ml-1 font-semibold cursor-pointer">...see more</span>
                    )}
                  </>
                ) : (
                  <span className="text-gray-400 italic">
                    Post preview will appear here. The highlighted portion indicates text visible before the &quot;...see more&quot; fold.
                  </span>
                )}
              </div>
            </div>

            {/* Tip box */}
            <div className="surface-card p-4 flex items-start gap-3 text-xs text-gray-400">
              <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                Keep your core takeaway or question within the first 210 characters to maximize click-through rate.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
