import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://countwise.app'),
  title: {
    default: 'CountWise - 在线字数与字符统计工具箱 (Free Character & Word Counter)',
    template: '%s | CountWise'
  },
  description: '免费、实时、隐私安全的在线字数与字符统计工具。支持汉字、单词、空格、段落统计，并提供 LinkedIn、Twitter、SEO 搜索卡片场景化长度预览。',
  keywords: ['字数统计', '字符数统计', '在线字数计算器', 'character counter', 'word counter', 'linkedin post length', 'twitter thread splitter'],
  authors: [{ name: 'CountWise' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://countwise.app',
    title: 'CountWise - 在线字数与字符统计工具箱',
    description: '100% 纯前端处理，隐私安全。一键统计字数、字符数、行数、阅读时长。',
    siteName: 'CountWise'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="bg-[#0D1117] text-[#F0F6FC] flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <div className="page-container">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
