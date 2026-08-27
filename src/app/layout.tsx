import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://countwise.app'),
  title: {
    default: 'CountWise - Free Character & Word Counter Suite for Social & SEO',
    template: '%s | CountWise'
  },
  description: 'Free, instant, privacy-focused character counter & word counter tools. Optimize text for LinkedIn, Twitter threads, SEO meta descriptions, Instagram captions & Amazon listings.',
  keywords: ['character counter', 'word counter', 'linkedin post character counter', 'twitter character counter', 'seo meta length checker', 'instagram caption limit'],
  authors: [{ name: 'CountWise Suite' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://countwise.app',
    title: 'CountWise - Scene-Specific Character Counter & Text Analyzer Suite',
    description: 'Privacy-focused online character & word counter with specialized tools for LinkedIn, Twitter, SEO, and Instagram.',
    siteName: 'CountWise'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090D16] text-white flex flex-col min-h-screen relative bg-grid">
        <div className="ambient-glow" />
        <Header />
        <main className="flex-1 container py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
