'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Copy, Trash2, Check, ShieldCheck, ArrowRight, Linkedin, 
  Twitter, Search, Instagram, ShoppingBag, Clock
} from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';

export default function HomePage() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  // Stats calculation
  const charCount = text.length;
  const charNoSpaces = text.replace(/\s/g, '').length;
  
  // Chinese & English mixed word counter
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = text.replace(/[\u4e00-\u9fa5]/g, ' ').trim() ? text.replace(/[\u4e00-\u9fa5]/g, ' ').trim().split(/\s+/).filter(Boolean).length : 0;
  const totalWordCount = chineseChars + englishWords;
  
  const sentenceCount = text.trim() ? (text.match(/[^.!?。！？]+[.!?。！？]+/g) || [text]).length : 0;
  const paragraphCount = text.trim() ? text.split(/\n+/).filter(Boolean).length : 0;
  const readingTimeMinutes = totalWordCount === 0 ? 0 : Math.max(1, Math.ceil(totalWordCount / 250));

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
      `欢迎使用 CountWise 在线字数与字符统计工具箱！\n\n` +
      `这是一个专注于文字字数统计、文章长度校验与社交媒体文案预览的免费工具。` +
      `在上方文本框中粘贴或写下你的文章，即可实时查看字符总数、中英文字数、空格数、段落行数以及预计阅读时长。\n\n` +
      `提示：我们采用 100% 浏览器本地计算技术，你的文章内容绝对不会被上传到任何服务器，隐私安全 100% 有保障。`
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
  };

  const sceneTools = [
    {
      title: 'LinkedIn 帖子折叠线预览',
      desc: 'LinkedIn 允许 3,000 字符，但前 210 字符后会被隐藏为“查看更多”，帮你在发布前优化首句 Hook 吸睛度。',
      href: '/linkedin-character-counter',
      icon: Linkedin,
      badge: 'LinkedIn 专用'
    },
    {
      title: 'Twitter / X 推文自动拆分',
      desc: '输入长文章，自动按照单条推文 280 字符上限拆分为带有 (1/N) 序号的推文串，支持一键单独复制。',
      href: '/twitter-character-counter',
      icon: Twitter,
      badge: 'Twitter 拆分'
    },
    {
      title: 'Google SERP 搜索卡片预览',
      desc: '模拟 Google 搜索结果卡片，实时校验标题 Tag (建议 <60字) 与 Meta 描述 (建议 <160字) 避免被剪切。',
      href: '/seo-meta-length-checker',
      icon: Search,
      badge: 'SEO 检查器'
    },
    {
      title: 'Instagram 贴文与 Hashtag 统计',
      desc: '实时检测 2,200 字符贴文上限，计算首行 125 字符截断线，并自动统计 Hashtag 标签数（上限 30 个）。',
      href: '/instagram-character-counter',
      icon: Instagram,
      badge: 'Instagram 专用'
    },
    {
      title: 'Amazon Listing 标题描述检测',
      desc: '为亚马逊卖家提供标题（75/200 字符）与五点描述长度校验，自动标注被禁止使用的违规促销词。',
      href: '/amazon-listing-character-counter',
      icon: ShoppingBag,
      badge: '卖家必备'
    },
    {
      title: '演讲与朗读时长计算器',
      desc: '根据文章总字数与不同语速（慢速、演讲、快速），精准换算为所需的演讲或视频朗读分钟数与秒数。',
      href: '/words-to-time-calculator',
      icon: Clock,
      badge: '演讲换算'
    },
  ];

  return (
    <>
      <SchemaMarkup 
        name="CountWise - 在线字数与字符统计工具箱"
        description="免费、实时、隐私安全的在线字数与字符统计工具。支持中英文混合字数、行数及阅读时长统计。"
        url="https://countwise.app"
      />

      <div className="space-y-10">
        {/* Page Hero Header */}
        <section className="space-y-3 max-w-2xl">
          <div className="pill-badge">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% 浏览器本地计算 • 隐私安全不留痕
          </div>
          <h1>
            在线字数与字符统计工具箱
          </h1>
          <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
            在下方框中粘贴或输入文字，实时计算中英文字数、字符数、段落行数及阅读时间。
          </p>
        </section>

        {/* Primary Editor Container */}
        <section className="card-panel space-y-6">
          {/* Top 5 Stat Cards */}
          <div className="metrics-row">
            <div className="metric-box">
              <span className="metric-title">字符总数 (含空格)</span>
              <span className="metric-num metric-num-highlight">{charCount.toLocaleString()}</span>
            </div>
            <div className="metric-box">
              <span className="metric-title">中英文总字数</span>
              <span className="metric-num">{totalWordCount.toLocaleString()}</span>
            </div>
            <div className="metric-box">
              <span className="metric-title">字符数 (不含空格)</span>
              <span className="metric-num">{charNoSpaces.toLocaleString()}</span>
            </div>
            <div className="metric-box">
              <span className="metric-title">段落 / 行数</span>
              <span className="metric-num">{paragraphCount}</span>
            </div>
            <div className="metric-box">
              <span className="metric-title">预估阅读时间</span>
              <span className="metric-num">{readingTimeMinutes} <span className="text-xs text-[var(--text-muted)] font-normal">分钟</span></span>
            </div>
          </div>

          {/* Main Text Input Area */}
          <textarea
            className="editor-box"
            placeholder="请在此处粘贴或输入你需要统计字数的文本内容..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[var(--border-main)] text-xs">
            {/* Secondary Breakdown */}
            <div className="flex items-center gap-4 text-[var(--text-secondary)]">
              <span>句子数: <strong className="text-[var(--text-primary)]">{sentenceCount}</strong></span>
              <span>中文汉字: <strong className="text-[var(--text-primary)]">{chineseChars}</strong></span>
              <span>英文单词: <strong className="text-[var(--text-primary)]">{englishWords}</strong></span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Case Converters */}
              <div className="flex items-center gap-1 bg-[var(--bg-input)] p-1 rounded-lg border border-[var(--border-main)]">
                <button onClick={() => applyCaseChange('upper')} className="btn text-[11px] py-1 px-2">全大写</button>
                <button onClick={() => applyCaseChange('lower')} className="btn text-[11px] py-1 px-2">全小写</button>
                <button onClick={() => applyCaseChange('title')} className="btn text-[11px] py-1 px-2">首字母大写</button>
                <button onClick={() => applyCaseChange('slug')} className="btn text-[11px] py-1 px-2">URL 短链格式</button>
              </div>

              <button onClick={loadSample} className="btn">填入示例文本</button>
              <button onClick={handleCopy} className="btn btn-blue">
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                {copied ? '已复制文本' : '复制文本'}
              </button>
              <button onClick={handleClear} className="btn btn-danger">
                <Trash2 className="w-4 h-4" /> 清空
              </button>
            </div>
          </div>
        </section>

        {/* Specialized Platform Tools Section */}
        <section className="space-y-6 pt-4">
          <div>
            <h2>特定社交平台与 SEO 专用检测工具</h2>
            <p className="text-[var(--text-secondary)] text-xs mt-1">针对特定平台长度限制与卡片预览设计的专用工具：</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sceneTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link 
                  key={tool.href} 
                  href={tool.href} 
                  className="card-panel card-panel-interactive flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-lg bg-[var(--bg-input)] border border-[var(--border-main)] flex items-center justify-center text-sky-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="pill-badge text-[10px]">{tool.badge}</span>
                    </div>
                    <h3 className="group-hover:text-sky-400 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-xs leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[var(--border-main)] flex items-center justify-between text-xs font-semibold text-sky-400">
                    <span>打开此专用工具</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
