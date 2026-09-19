import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://counter.robloxwikihub.com'),
  title: {
    default: 'CountWise - Free Online Character & Word Counter Suite',
    template: '%s | CountWise'
  },
  description: 'Instant, private online character counter and word counter tool. Measure characters, words, sentences, paragraphs, and reading time with live platform length previews.',
  keywords: ['character counter', 'word counter', 'online text counter', 'linkedin character count', 'twitter thread splitter', 'seo meta length checker'],
  authors: [{ name: 'Hlele' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://counter.robloxwikihub.com',
    title: 'CountWise - Character & Word Counter Suite',
    description: '100% client-side privacy-first text counter tool.',
    siteName: 'CountWise'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F8FAFC] text-slate-900 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <div className="portal-container">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
