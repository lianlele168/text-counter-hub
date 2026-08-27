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
  const foldLimit = 210; // LinkedIn fold threshold

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
      `Most content creators fail on LinkedIn because they write 500-word posts without a strong hook.\n\n` +
      `Here is the 3-step formula we used to generate 1.2M organic impressions last month:\n\n` +
      `1. The 210-Character Hook: Place your biggest paradox or metric in the first line before "...see more" cuts it off.\n\n` +
      `2. Short Sentences: Keep paragraphs under 15 words to prevent reading fatigue.\n\n` +
      `3. Single Call to Action: Ask one engaging question at the end to drive community comments.`
    );
  };

  return (
    <>
      <SchemaMarkup
        name="LinkedIn Post & Hook Cutoff Previewer"
        description="Free online LinkedIn post character counter (3,000 max limit) with real-time 210-character see-more cutoff preview."
        url="https://countwise.app/linkedin-character-counter"
      />

      <div className="space-y-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 font-semibold transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All Counter Workspace
        </Link>

        {/* Title */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
              <Linkedin className="w-4 h-4" />
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">LinkedIn Inspector</span>
          </div>
          <h1>
            LinkedIn Post & Hook Cutoff Inspector
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl font-medium">
            LinkedIn allows up to 3,000 characters per post, but automatically truncates text after the first 210 characters with a "...see more" button.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Editor */}
          <div className="editor-surface space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Compose LinkedIn Post</span>
              <div className="flex items-center gap-2">
                <button onClick={loadSample} className="btn-ui text-xs py-1 px-2.5">Load Sample</button>
                <button onClick={() => setText('')} className="btn-ui btn-ui-danger text-xs py-1 px-2.5">
                  <Trash2 className="w-3.5 h-3.5" /> Clear
                </button>
              </div>
            </div>

            <textarea
              className="editor-textarea min-h-[280px]"
              placeholder="Type or paste your LinkedIn post copy here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-medium">
                <span className="text-slate-500">Character Limit Progress</span>
                <span className={`font-mono font-bold ${isOverLimit ? 'text-red-600' : 'text-indigo-600'}`}>
                  {charCount} / {maxLimit} Chars
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div 
                  className={`h-full transition-all ${isOverLimit ? 'bg-red-500' : 'bg-indigo-600'}`}
                  style={{ width: `${percentUsed}%` }}
                />
              </div>
            </div>

            <button onClick={handleCopy} className="btn-ui btn-ui-primary w-full py-3">
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
              {copied ? 'Copied LinkedIn Post!' : 'Copy LinkedIn Post'}
            </button>
          </div>

          {/* Right Live Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
              <span className="text-slate-800 flex items-center gap-1.5">
                <Linkedin className="w-4 h-4 text-blue-600" /> LinkedIn Feed Card Preview
              </span>
              <span>210 Character Fold Cutoff</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                  IN
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">Digital Marketing Strategist</h3>
                  <p className="text-[11px] text-slate-400 font-medium">10k Followers • 1h • 🌐</p>
                </div>
              </div>

              {/* Text Preview */}
              <div className="text-sm text-slate-800 leading-relaxed font-sans pt-1">
                {text ? (
                  <>
                    <span className="bg-blue-50 text-blue-900 px-1 rounded font-semibold border border-blue-200">
                      {text.slice(0, foldLimit)}
                    </span>
                    {text.length > foldLimit && (
                      <span className="text-slate-400 font-bold ml-1 cursor-pointer">...see more</span>
                    )}
                  </>
                ) : (
                  <span className="text-slate-400 italic">
                    Your post preview will render here in real-time. The highlighted box represents the crucial first 210 characters visible before readers must click "...see more".
                  </span>
                )}
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-start gap-3 text-xs text-indigo-900 font-medium">
              <AlertCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span>
                Tip: Place your core outcome or counter-intuitive insight within the first 210 characters to maximize your "...see more" click-through rate.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
