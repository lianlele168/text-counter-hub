import React from 'react';
import Link from 'next/link';
import { Type, ShieldCheck, Zap, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Type className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-slate-900 text-base">Count<span className="text-indigo-600">Wise</span></span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed">
              Privacy-focused, instant online character and word counter suite. 100% client-side calculation—your content never leaves your browser.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full w-fit font-medium">
              <Lock className="w-3 h-3" />
              <span>100% Private Client-Side Processing</span>
            </div>
          </div>

          {/* Social Tools */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">Social Media Tools</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/linkedin-character-counter" className="hover:text-indigo-600 transition-colors">LinkedIn Post & Hook Previewer</Link></li>
              <li><Link href="/twitter-character-counter" className="hover:text-indigo-600 transition-colors">Twitter Thread Splitter & Counter</Link></li>
              <li><Link href="/instagram-character-counter" className="hover:text-indigo-600 transition-colors">Instagram Caption & Hashtag Inspector</Link></li>
              <li><Link href="/amazon-listing-character-counter" className="hover:text-indigo-600 transition-colors">Amazon Listing Limit Checker</Link></li>
            </ul>
          </div>

          {/* SEO & Time Tools */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">SEO & Productivity</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/seo-meta-length-checker" className="hover:text-indigo-600 transition-colors">Google SERP Snippet Length Checker</Link></li>
              <li><Link href="/words-to-time-calculator" className="hover:text-indigo-600 transition-colors">Speech WPM Reading Time Converter</Link></li>
              <li><Link href="/" className="hover:text-indigo-600 transition-colors">All-in-One Character & Word Counter</Link></li>
            </ul>
          </div>

          {/* Value Props */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">Why CountWise?</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-amber-500" /> Real-time live character metrics</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Zero server logging or storage</li>
              <li className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-indigo-500" /> Free forever, no signup needed</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4 font-medium">
          <p>© {new Date().getFullYear()} CountWise Suite. All rights reserved.</p>
          <p className="w-full text-center sm:text-left text-[11px] text-slate-400">Reviewed by Hlele · Content AI-assisted, human-reviewed · Data sources cited on page · Contact: lianlele168@gmail.com</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <Link href="/seo-meta-length-checker" className="hover:text-slate-900">SEO Checker</Link>
            <Link href="/linkedin-character-counter" className="hover:text-slate-900">LinkedIn Tool</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
