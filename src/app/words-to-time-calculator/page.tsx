'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, Copy, Check, Trash2, ArrowLeft, Mic, Play } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';

export default function WordsToTimePage() {
  const [text, setText] = useState('');
  const [wpm, setWpm] = useState(140); // Default speaking pace
  const [copied, setCopied] = useState(false);

  const words = text.trim() ? text.trim().split(/\s+/) : [];
  const wordCount = text.trim() ? words.length : 0;
  const charCount = text.length;

  // Calculate total seconds needed
  const totalSeconds = Math.round((wordCount / wpm) * 60);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  // Estimated slides (assuming 1 slide per 1.5 mins)
  const estimatedSlides = Math.ceil(totalSeconds / 90) || 1;

  const loadSample = () => {
    setText(
      `Good morning everyone, thank you for joining today's keynote on the future of generative AI in web development.\n\n` +
      `Over the last 12 months, we have witnessed a massive shift in how websites are designed and deployed. ` +
      `Instead of spending weeks manually configuring boilerplate code, AI agents now collaborate with engineers in real time to deliver production-ready applications in minutes.\n\n` +
      `Today, I want to share three core insights we discovered while building over 20 high-traffic web platforms...`
    );
  };

  const handleCopy = () => {
    const info = `Word Count: ${wordCount} words\nSpeaking Pace: ${wpm} WPM\nEstimated Duration: ${minutes} min ${remainingSeconds} sec\nEstimated Slides: ${estimatedSlides} slides`;
    navigator.clipboard.writeText(info);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SchemaMarkup
        name="Words to Time Calculator & Speech Reading Estimator"
        description="Free speech timer calculator to convert word count into exact speaking minutes and seconds based on WPM reading speed presets."
        url="https://countwise.app/words-to-time-calculator"
      />

      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All-in-One Counter
        </Link>

        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/25">
              <Clock className="w-5 h-5" />
            </div>
            <span className="badge">Speech & Keynote Timer</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Words to Time Calculator <span className="text-purple-400">& Speech Estimator</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Convert your speech text or presentation script into precise speaking minutes and seconds. Adjust WPM (words per minute) pace for keynote presentations, YouTube videos, and podcasts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Editor */}
          <div className="glass-panel p-5 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-300">Speech / Presentation Script</span>
              <div className="flex items-center gap-2">
                <button onClick={loadSample} className="btn-secondary text-[11px] py-1 px-2.5">Load Sample</button>
                <button onClick={() => setText('')} className="btn-secondary text-[11px] py-1 px-2.5 text-red-400">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>

            <textarea
              className="editor-textarea min-h-[260px]"
              placeholder="Paste your speech, video script, or presentation slides text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {/* WPM Pace Controls */}
            <div className="space-y-2 text-xs pt-2 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-medium flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-purple-400" /> Speaking Speed (WPM):
                </span>
                <span className="text-purple-400 font-bold text-sm">{wpm} WPM</span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="100"
                max="260"
                step="5"
                value={wpm}
                onChange={(e) => setWpm(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />

              {/* Presets */}
              <div className="flex gap-2 pt-1 flex-wrap">
                <button onClick={() => setWpm(115)} className={`btn-secondary text-[10px] py-1 px-2 ${wpm === 115 ? 'border-purple-500 text-purple-300' : ''}`}>
                  Slow (115 WPM)
                </button>
                <button onClick={() => setWpm(140)} className={`btn-secondary text-[10px] py-1 px-2 ${wpm === 140 ? 'border-purple-500 text-purple-300' : ''}`}>
                  Normal Keynote (140 WPM)
                </button>
                <button onClick={() => setWpm(170)} className={`btn-secondary text-[10px] py-1 px-2 ${wpm === 170 ? 'border-purple-500 text-purple-300' : ''}`}>
                  Fast Speech (170 WPM)
                </button>
                <button onClick={() => setWpm(210)} className={`btn-secondary text-[10px] py-1 px-2 ${wpm === 210 ? 'border-purple-500 text-purple-300' : ''}`}>
                  Silent Reading (210 WPM)
                </button>
              </div>
            </div>
          </div>

          {/* Right Live Time Output Card */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Play className="w-4 h-4 text-purple-400" /> Estimated Duration Output
              </span>
              <span>Live Calculation</span>
            </div>

            {/* Giant Output Card */}
            <div className="glass-panel p-6 space-y-6 text-center border-purple-500/30">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Total Speech Duration</span>
                <div className="text-4xl md:text-5xl font-extrabold gradient-text">
                  {minutes} <span className="text-lg text-gray-300 font-normal">min</span> {remainingSeconds} <span className="text-lg text-gray-300 font-normal">sec</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs">
                <div className="stat-box">
                  <span className="stat-label">Total Words</span>
                  <span className="stat-value">{wordCount.toLocaleString()}</span>
                </div>

                <div className="stat-box">
                  <span className="stat-label">Total Characters</span>
                  <span className="stat-value">{charCount.toLocaleString()}</span>
                </div>

                <div className="stat-box">
                  <span className="stat-label">Pace</span>
                  <span className="stat-value text-purple-400">{wpm} WPM</span>
                </div>

                <div className="stat-box">
                  <span className="stat-label">Est. Slides</span>
                  <span className="stat-value text-indigo-400">~{estimatedSlides}</span>
                </div>
              </div>

              <button onClick={handleCopy} className="btn-primary w-full justify-center">
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Duration Metrics Copied!' : 'Copy Time Summary'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
