import React from 'react';
import Link from 'next/link';
import { Type, ShieldCheck, Zap, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#060911] text-gray-400 text-sm">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Type className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-extrabold text-white text-base">Count<span className="text-indigo-400">Wise</span></span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed">
              Privacy-first, zero-latency text & character counter suite. 100% client-side processing—your content never leaves your browser.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-full w-fit">
              <Lock className="w-3 h-3" />
              <span>100% Private Client-Side Processing</span>
            </div>
          </div>

          {/* Social & Scene Tools */}
          <div>
            <h4 className="font-heading font-semibold text-white text-xs uppercase tracking-wider mb-3">Platform Tools</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/linkedin-character-counter" className="hover:text-indigo-300 transition-colors">LinkedIn Character Counter & Cutoff</Link></li>
              <li><Link href="/twitter-character-counter" className="hover:text-indigo-300 transition-colors">Twitter Thread Splitter & Counter</Link></li>
              <li><Link href="/instagram-character-counter" className="hover:text-indigo-300 transition-colors">Instagram Caption & Hashtag Limit</Link></li>
              <li><Link href="/amazon-listing-character-counter" className="hover:text-indigo-300 transition-colors">Amazon Seller Listing Limit Checker</Link></li>
            </ul>
          </div>

          {/* SEO & Utility Tools */}
          <div>
            <h4 className="font-heading font-semibold text-white text-xs uppercase tracking-wider mb-3">SEO & Productivity</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/seo-meta-length-checker" className="hover:text-indigo-300 transition-colors">Google SERP Snippet & Pixel Checker</Link></li>
              <li><Link href="/words-to-time-calculator" className="hover:text-indigo-300 transition-colors">Speech Reading & Speaking Time Converter</Link></li>
              <li><Link href="/" className="hover:text-indigo-300 transition-colors">All-in-One Word & Character Counter</Link></li>
            </ul>
          </div>

          {/* Guarantees */}
          <div>
            <h4 className="font-heading font-semibold text-white text-xs uppercase tracking-wider mb-3">Why CountWise?</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-amber-400" /> Real-time instant stats</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> No server storage or logging</li>
              <li className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-indigo-400" /> Free forever, no signup required</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} CountWise Suite. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-gray-400">Home</Link>
            <Link href="/seo-meta-length-checker" className="hover:text-gray-400">SEO Checker</Link>
            <Link href="/linkedin-character-counter" className="hover:text-gray-400">LinkedIn Tool</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
