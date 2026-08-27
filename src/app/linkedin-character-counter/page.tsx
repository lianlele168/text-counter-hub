'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Linkedin, Copy, Check, Trash2, AlertCircle, ArrowLeft, Eye } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';

export default function LinkedInCounterPage() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [authorName, setAuthorName] = useState('Alex Rivera');
  const [authorTitle, setAuthorTitle] = useState('Founder & Growth Strategist');

  const charCount = text.length;
  const maxLimit = 3000;
  const hookLimit = 210; // "See More" fold line

  const percentUsed = Math.min(100, Math.round((charCount / maxLimit) * 100));
  const isOverLimit = charCount > maxLimit;

  // Split text into hook (first 210 chars) and remaining text
  const hookText = text.slice(0, hookLimit);
  const hiddenText = text.slice(hookLimit);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setText(
      `Most founders waste 80% of their LinkedIn reach because of one simple mistake.\n\n` +
      `They write incredible 1,000-word posts, but their first 2 lines are boring.\n\n` +
      `Here is the 3-step hook structure that generated over 2.4M impressions for our team last quarter:\n\n` +
      `1. The Pattern Interrupt (Make them stop scrolling)\n` +
      `2. The Curiosity Gap (Promise high value below the fold)\n` +
      `3. The Specific Proof (Real numbers & case studies)\n\n` +
      `Comment "HOOK" below and I'll send you our 15 highest-converting LinkedIn post templates for free!`
    );
  };

  return (
    <>
      <SchemaMarkup
        name="LinkedIn Post Character Counter & Hook Preview"
        description="Free tool to check LinkedIn post character limit (3,000) and preview the exact 210-character 'See More' desktop and mobile fold cutoff."
        url="https://countwise.app/linkedin-character-counter"
      />

      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All-in-One Counter
        </Link>

        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
              <Linkedin className="w-5 h-5" />
            </div>
            <span className="badge">LinkedIn Optimizer</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            LinkedIn Post Character Counter <span className="text-blue-400">& Hook Preview</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            LinkedIn truncates posts after ~210 characters with a &quot;...see more&quot; button. Ensure your hook grabs attention before the fold while staying within LinkedIn&apos;s 3,000 character limit.
          </p>
        </div>

        {/* Main Grid: Left Editor / Right Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Editor */}
          <div className="glass-panel p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-300">Compose LinkedIn Post</span>
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
              className="editor-textarea min-h-[280px]"
              placeholder="Paste your LinkedIn post here to preview where the 'see more' cutoff line will appear..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {/* Progress Bar & Counters */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Character Limit (3,000)</span>
                <span className={`font-bold ${isOverLimit ? 'text-red-400' : 'text-blue-400'}`}>
                  {charCount.toLocaleString()} / {maxLimit.toLocaleString()}
                </span>
              </div>
              <div className="progress-bar-bg">
                <div 
                  className={`progress-bar-fill ${isOverLimit ? 'bg-red-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'}`}
                  style={{ width: `${percentUsed}%` }}
                />
              </div>
            </div>

            {/* Warning alerts */}
            {isOverLimit && (
              <div className="flex items-center gap-2 text-xs text-red-400 bg-red-950/40 border border-red-800/40 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Your post exceeds LinkedIn&apos;s maximum 3,000 character limit by {charCount - maxLimit} characters.</span>
              </div>
            )}

            {/* Action Bar */}
            <button onClick={handleCopy} className="btn-primary w-full justify-center">
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied to Clipboard!' : 'Copy LinkedIn Post'}
            </button>
          </div>

          {/* Right Live LinkedIn Post Preview Card */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <Eye className="w-4 h-4 text-blue-400" /> Live Feed Preview
              </span>
              <span>Visualizing &quot;See More&quot; Cutoff</span>
            </div>

            {/* Simulated LinkedIn Card */}
            <div className="preview-box space-y-3">
              {/* Feed Header */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-sm">
                  AR
                </div>
                <div className="text-xs">
                  <p className="font-bold text-gray-900">{authorName}</p>
                  <p className="text-gray-500">{authorTitle}</p>
                  <p className="text-gray-400 text-[10px]">1h • Edited • 🌐</p>
                </div>
              </div>

              {/* Feed Post Content with Visual Fold Line */}
              <div className="text-xs text-gray-900 leading-relaxed whitespace-pre-line font-sans border-t border-b border-gray-100 py-3 relative">
                {text ? (
                  <>
                    <span className="bg-emerald-100 text-emerald-950 px-1 py-0.5 rounded font-medium">
                      {hookText}
                    </span>
                    {hiddenText && (
                      <span className="text-blue-600 font-bold ml-1 cursor-pointer underline">
                        ...see more
                      </span>
                    )}
                    {hiddenText && (
                      <div className="mt-3 p-2 bg-gray-50 border border-dashed border-blue-300 rounded text-gray-500 text-[11px]">
                        <span className="text-blue-600 font-semibold block mb-1">⬇ Below the Fold Content:</span>
                        {hiddenText}
                      </div>
                    )}
                  </>
                ) : (
                  <span className="text-gray-400 italic">
                    Your post content will render here. The highlighted green text indicates what users see before clicking &quot;...see more&quot;.
                  </span>
                )}
              </div>

              {/* Stat footer */}
              <div className="flex justify-between text-[11px] text-gray-500 font-medium pt-1">
                <span>👍 148 Likes</span>
                <span>32 Comments • 12 Reposts</span>
              </div>
            </div>

            {/* Hook Optimization Tip */}
            <div className="glass-panel p-4 text-xs space-y-1.5 text-gray-300">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                💡 LinkedIn Hook Rule of Thumb
              </h4>
              <p className="text-gray-400 leading-relaxed">
                LinkedIn displays the first <strong>210 characters</strong> on desktop (and ~140 chars on mobile) before truncating with &quot;...see more&quot;. Treat your first 2 lines as a headline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
