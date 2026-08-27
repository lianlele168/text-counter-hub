'use client';

import React, { useState } from 'react';
import { 
  Copy, Trash2, Check, Sparkles, Type, FileText, 
  Clock, Hash, ShieldCheck, CheckCircle2, Sliders, AlertCircle
} from 'lucide-react';

interface CounterStudioProps {
  initialMode?: 'all' | 'social' | 'case' | 'reading';
}

export default function CounterStudio({ initialMode = 'all' }: CounterStudioProps) {
  const [activeTab, setActiveTab] = useState(initialMode);
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  // Calculations
  const charCount = text.length;
  const charNoSpaces = text.replace(/\s/g, '').length;
  
  // Mixed Language Word Count
  const cjkChars = (text.match(/[\u4e00-\u9fa5\u3040-\u30ff\uac00-\ud7af]/g) || []).length;
  const latinWords = text.replace(/[\u4e00-\u9fa5\u3040-\u30ff\uac00-\ud7af]/g, ' ').trim() 
    ? text.replace(/[\u4e00-\u9fa5\u3040-\u30ff\uac00-\ud7af]/g, ' ').trim().split(/\s+/).filter(Boolean).length 
    : 0;
  const totalWordCount = cjkChars + latinWords;
  
  const sentenceCount = text.trim() ? (text.match(/[^.!?。！？]+[.!?。！？]+/g) || [text]).length : 0;
  const paragraphCount = text.trim() ? text.split(/\n+/).filter(Boolean).length : 0;
  
  // Reading and Speech
  const readingTimeSec = Math.round((totalWordCount / 230) * 60);
  const speakingTimeSec = Math.round((totalWordCount / 150) * 60);

  const formatTime = (seconds: number) => {
    if (seconds === 0) return '0s';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m === 0) return `${s}s`;
    return `${m}m ${s}s`;
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
  };

  const loadSample = () => {
    setText(
      `Welcome to CountWise — the professional real-time text analysis workspace.\n\n` +
      `Type or paste your blog post, essay, or social media caption here to calculate real-time character counts, word density, reading speed, and platform limits.\n\n` +
      `100% Client-Side Privacy: Your content is processed instantly inside your browser and is never stored or transmitted to any server.`
    );
  };

  const applyCaseChange = (type: string) => {
    if (!text) return;
    if (type === 'upper') setText(text.toUpperCase());
    if (type === 'lower') setText(text.toLowerCase());
    if (type === 'title') {
      setText(text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
    }
    if (type === 'slug') {
      setText(
        text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
      );
    }
    if (type === 'trim') {
      setText(text.replace(/\s+/g, ' ').trim());
    }
  };

  // Platform Limit Progress Helpers
  const getProgressColor = (current: number, max: number) => {
    const ratio = current / max;
    if (ratio > 1) return 'bg-red-500';
    if (ratio > 0.85) return 'bg-amber-500';
    return 'bg-indigo-600';
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 space-y-8">
      {/* Studio Header & Mode Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">Interactive Workspace</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">Text & Character Studio</h2>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 overflow-x-auto">
          {[
            { id: 'all', label: 'All-in-One', icon: Type },
            { id: 'social', label: 'Platform Limits', icon: Sliders },
            { id: 'case', label: 'Case Converter', icon: Sparkles },
            { id: 'reading', label: 'Reading & Speech', icon: Clock },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-indigo-600 shadow-sm shadow-slate-200 border border-slate-200/50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Editor Workspace (col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Editor Toolbar */}
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-500" />
              Content Editor
            </label>

            <div className="flex items-center gap-2">
              <button
                onClick={loadSample}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Sample Text
              </button>
            </div>
          </div>

          {/* Text Area Box */}
          <div className="relative group">
            <textarea
              className="w-full min-h-[320px] md:min-h-[380px] bg-slate-50 border border-slate-200 rounded-2xl p-5 text-slate-900 placeholder-slate-400 font-medium text-base md:text-lg leading-relaxed outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-y"
              placeholder="Type or paste your text here to begin instant live counting..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {/* Floating Live Character Counter Badge */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur border border-slate-200 px-3 py-1 rounded-full text-xs font-extrabold text-slate-700 shadow-sm pointer-events-none">
              <span className="text-indigo-600 font-mono">{charCount.toLocaleString()}</span> chars
            </div>
          </div>

          {/* Quick Case Converter Toolbar */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
            <div className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Quick Text Transformation Tools
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => applyCaseChange('upper')} className="btn-ui text-xs bg-white hover:bg-slate-100">UPPERCASE</button>
              <button onClick={() => applyCaseChange('lower')} className="btn-ui text-xs bg-white hover:bg-slate-100">lowercase</button>
              <button onClick={() => applyCaseChange('title')} className="btn-ui text-xs bg-white hover:bg-slate-100">Title Case</button>
              <button onClick={() => applyCaseChange('slug')} className="btn-ui text-xs bg-white hover:bg-slate-100">URL-slug</button>
              <button onClick={() => applyCaseChange('trim')} className="btn-ui text-xs bg-white hover:bg-slate-100">Trim Extra Spaces</button>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleCopy}
              className="flex-1 btn-ui btn-ui-primary py-3.5 text-sm font-bold shadow-lg shadow-indigo-600/20"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
              {copied ? 'Copied to Clipboard!' : 'Copy Formatted Text'}
            </button>
            <button
              onClick={handleClear}
              className="btn-ui btn-ui-danger py-3.5 px-4"
              title="Clear all text"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Real-Time Live Inspection Dashboard (col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Character Gauge Card */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Live Metric Summary</span>
              <span className="inline-flex items-center gap-1 bg-white/10 text-indigo-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Client-Side
              </span>
            </div>

            {/* Giant Stat Display */}
            <div className="space-y-1">
              <div className="text-4xl md:text-5xl font-extrabold tracking-tight font-mono text-white">
                {charCount.toLocaleString()}
              </div>
              <p className="text-xs font-medium text-slate-400">Total Characters (With Spaces)</p>
            </div>

            {/* Sub-metrics Grid */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-1">
                <span className="text-slate-400 font-semibold block text-[11px]">Words</span>
                <span className="text-xl font-bold font-mono text-white">{totalWordCount.toLocaleString()}</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-1">
                <span className="text-slate-400 font-semibold block text-[11px]">No-Space Chars</span>
                <span className="text-xl font-bold font-mono text-white">{charNoSpaces.toLocaleString()}</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-1">
                <span className="text-slate-400 font-semibold block text-[11px]">Sentences</span>
                <span className="text-xl font-bold font-mono text-white">{sentenceCount}</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-1">
                <span className="text-slate-400 font-semibold block text-[11px]">Paragraphs</span>
                <span className="text-xl font-bold font-mono text-white">{paragraphCount}</span>
              </div>
            </div>

            {/* Reading & Speech Speed Panel */}
            <div className="bg-indigo-950/60 border border-indigo-500/20 rounded-2xl p-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-indigo-200 font-semibold">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>Reading / Speaking:</span>
              </div>
              <div className="font-mono text-white font-bold space-x-2">
                <span>📖 {formatTime(readingTimeSec)}</span>
                <span className="text-indigo-400">|</span>
                <span>🗣️ {formatTime(speakingTimeSec)}</span>
              </div>
            </div>
          </div>

          {/* Platform Limits Inspection Gauge */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-600" /> Platform Cutoff Gauges
              </h3>
              <span className="text-[11px] text-slate-400 font-semibold">Real-Time Limits</span>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Twitter 280 */}
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-700">Twitter / X Post Limit</span>
                  <span className={`font-mono ${charCount > 280 ? 'text-red-600 font-bold' : 'text-slate-600'}`}>
                    {charCount} / 280
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${getProgressColor(charCount, 280)}`}
                    style={{ width: `${Math.min(100, (charCount / 280) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* LinkedIn Hook Cutoff 210 */}
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-700">LinkedIn "...see more" Cutoff</span>
                  <span className={`font-mono ${charCount > 210 ? 'text-amber-600 font-bold' : 'text-slate-600'}`}>
                    {charCount} / 210
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${charCount > 210 ? 'bg-amber-500' : 'bg-indigo-600'}`}
                    style={{ width: `${Math.min(100, (charCount / 210) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Instagram Caption 2200 */}
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-700">Instagram Caption Limit</span>
                  <span className={`font-mono ${charCount > 2200 ? 'text-red-600 font-bold' : 'text-slate-600'}`}>
                    {charCount} / 2,200
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${getProgressColor(charCount, 2200)}`}
                    style={{ width: `${Math.min(100, (charCount / 2200) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* SEO Title Tag 60 */}
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-700">SEO SERP Title Tag</span>
                  <span className={`font-mono ${charCount > 60 ? 'text-amber-600 font-bold' : 'text-slate-600'}`}>
                    {charCount} / 60
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${charCount > 60 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                    style={{ width: `${Math.min(100, (charCount / 60) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
