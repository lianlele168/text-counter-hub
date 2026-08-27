'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, Copy, Check, Trash2, ArrowLeft, Mic } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';

export default function SpeechTimerPage() {
  const [text, setText] = useState('');
  const [wpm, setWpm] = useState(140); // 140 WPM average speech speed
  const [copied, setCopied] = useState(false);

  // Calculate words
  const cjkChars = (text.match(/[\u4e00-\u9fa5\u3040-\u30ff\uac00-\ud7af]/g) || []).length;
  const latinWords = text.replace(/[\u4e00-\u9fa5\u3040-\u30ff\uac00-\ud7af]/g, ' ').trim() 
    ? text.replace(/[\u4e00-\u9fa5\u3040-\u30ff\uac00-\ud7af]/g, ' ').trim().split(/\s+/).filter(Boolean).length 
    : 0;
  const totalWords = cjkChars + latinWords;

  // Calculate times
  const totalSeconds = Math.ceil((totalWords / wpm) * 60);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Speeds
  const slowSecs = Math.ceil((totalWords / 110) * 60);
  const fastSecs = Math.ceil((totalWords / 170) * 60);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setText(
      `Good morning everyone. Today I am excited to announce our brand new suite of privacy-first text analysis software.\n\n` +
      `Over the last six months, our engineering team focused on one primary metric: speed and data isolation.\n\n` +
      `By executing all text tokenization 100% locally inside the client browser, we deliver instantaneous results while ensuring zero server logging.`
    );
  };

  return (
    <>
      <SchemaMarkup
        name="Speech & Reading Time Calculator (WPM)"
        description="Free online speech reading time converter. Calculate speaking time in minutes and seconds based on custom words per minute (WPM)."
        url="https://counter.robloxwikihub.com/words-to-time-calculator"
      />

      <div className="space-y-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 font-semibold transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All Counter Workspace
        </Link>

        {/* Title */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 font-bold">
              <Clock className="w-4 h-4" />
            </div>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2.5 py-0.5 rounded-full">Speech WPM Timer</span>
          </div>
          <h1>
            Speech & Reading Time Calculator
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl font-medium">
            Calculate the exact speaking or voiceover duration for your presentation or YouTube script based on Words Per Minute (WPM).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Editor */}
          <div className="editor-surface space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Speech Script Draft</span>
              <div className="flex items-center gap-2">
                <button onClick={loadSample} className="btn-ui text-xs py-1 px-2.5">Load Sample Script</button>
                <button onClick={() => setText('')} className="btn-ui btn-ui-danger text-xs py-1 px-2.5">
                  <Trash2 className="w-3.5 h-3.5" /> Clear
                </button>
              </div>
            </div>

            <textarea
              className="editor-textarea min-h-[280px]"
              placeholder="Paste your speech or presentation script here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {/* WPM Slider */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs font-semibold">
                <label className="text-slate-700 flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-indigo-600" /> Target Speaking Speed
                </label>
                <span className="font-mono text-indigo-600 font-bold">{wpm} WPM (Words / Min)</span>
              </div>
              <input
                type="range"
                min="90"
                max="220"
                step="5"
                value={wpm}
                onChange={(e) => setWpm(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>Slow / Presentation (110 WPM)</span>
                <span>Normal Speech (140 WPM)</span>
                <span>Fast / Podcast (180 WPM)</span>
              </div>
            </div>

            <button onClick={handleCopy} className="btn-ui btn-ui-primary w-full py-3">
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
              {copied ? 'Copied Script!' : 'Copy Script Text'}
            </button>
          </div>

          {/* Right Duration Output */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
              <span className="text-slate-800 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-600" /> Estimated Duration Results
              </span>
              <span>WPM Breakdown</span>
            </div>

            {/* Big Duration Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-4 text-center">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Calculated Duration</div>
              <div className="font-mono text-4xl font-extrabold text-indigo-600">
                {minutes > 0 && `${minutes}m `}{seconds}s
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Based on <strong className="text-slate-800">{totalWords} words</strong> spoken at <strong className="text-indigo-600">{wpm} WPM</strong>
              </p>
            </div>

            {/* Speed Comparison */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 text-xs font-medium">
              <div className="font-bold text-slate-800">Speed Benchmark Comparisons</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                  <span className="text-slate-400 text-[11px]">Slow (110 WPM)</span>
                  <div className="font-mono font-bold text-slate-800">
                    {Math.floor(slowSecs / 60)}m {slowSecs % 60}s
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                  <span className="text-slate-400 text-[11px]">Fast (170 WPM)</span>
                  <div className="font-mono font-bold text-slate-800">
                    {Math.floor(fastSecs / 60)}m {fastSecs % 60}s
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
