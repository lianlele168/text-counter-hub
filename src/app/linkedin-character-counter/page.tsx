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
      `Most creators fail on LinkedIn because they write 500-word essays without a clear hook. Here is the 3-step formula we used to generate 1.2M impressions with zero ad spend.\n\n` +
      `1. The 210-Character Hook: Put your biggest paradox or metric in the first line before "See More" truncates it.\n\n` +
      `2. Short Paragraphs: Keep sentences under 12 words so scrollers don't get fatigue.\n\n` +
      `3. Single Call-to-Action: Ask one question at the end to drive comments.`
    );
  };

  return (
    <>
      <SchemaMarkup
        name="LinkedIn 帖子折叠线预览与字数统计工具"
        description="免费在线 LinkedIn 帖子字符统计工具（上限 3000 字符），实时预览前 210 字符折叠隐藏效果。"
        url="https://countwise.app/linkedin-character-counter"
      />

      <div className="space-y-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> 返回全能字符与字数统计工具箱
        </Link>

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Linkedin className="w-4 h-4" />
            </div>
            <span className="pill-badge">LinkedIn 专用</span>
          </div>
          <h1>
            LinkedIn 帖子折叠线预览与字数统计
          </h1>
          <p className="text-[var(--text-secondary)] text-sm max-w-2xl">
            LinkedIn 限制贴文为 3,000 字符，且前 210 个字符后会被自动隐藏为“...查看更多”按钮。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Editor */}
          <div className="card-panel space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[var(--text-primary)]">编辑 LinkedIn 贴文</span>
              <div className="flex items-center gap-2">
                <button onClick={loadSample} className="btn text-xs py-1 px-2.5">示例文本</button>
                <button onClick={() => setText('')} className="btn btn-danger text-xs py-1 px-2.5">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>

            <textarea
              className="editor-box min-h-[260px]"
              placeholder="在此输入或粘贴你的 LinkedIn 贴文..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {/* Metrics */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[var(--text-secondary)]">字符进度</span>
                <span className={`font-mono font-semibold ${isOverLimit ? 'text-red-400' : 'text-sky-400'}`}>
                  {charCount} / {maxLimit} 字符
                </span>
              </div>
              <div className="w-full h-2 bg-[var(--bg-input)] rounded-full overflow-hidden border border-[var(--border-main)]">
                <div 
                  className={`h-full transition-all ${isOverLimit ? 'bg-red-500' : 'bg-blue-600'}`}
                  style={{ width: `${percentUsed}%` }}
                />
              </div>
            </div>

            <button onClick={handleCopy} className="btn btn-blue w-full py-2.5">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? '已复制贴文' : '复制 LinkedIn 贴文'}
            </button>
          </div>

          {/* Right Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                <Linkedin className="w-4 h-4 text-blue-400" /> LinkedIn 动态流实机预览
              </span>
              <span>210 字符折叠分界线</span>
            </div>

            <div className="card-panel bg-white text-gray-900 border border-gray-200 space-y-3 shadow-md">
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
                    <span className="bg-blue-50 text-blue-950 px-1 rounded font-medium border border-blue-200">
                      {text.slice(0, foldLimit)}
                    </span>
                    {text.length > foldLimit && (
                      <span className="text-gray-500 ml-1 font-semibold cursor-pointer">...查看更多</span>
                    )}
                  </>
                ) : (
                  <span className="text-gray-400 italic">
                    预览效果将在此处实时显示。高亮部分为用户无需点击“查看更多”即可在首屏看到的 210 字符 Hook...
                  </span>
                )}
              </div>
            </div>

            {/* Tip box */}
            <div className="card-panel p-4 flex items-start gap-3 text-xs text-[var(--text-secondary)]">
              <AlertCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>
                建议将贴文最吸引人的核心结论或反直觉观点写在前 210 字符内，吸引读者点击“查看更多”。
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
