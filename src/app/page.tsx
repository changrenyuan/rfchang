import { Metadata } from 'next';
import {
  Navbar,
  HeroSection,
  QuickEngineeringTools,
  Footer,
} from '@/components';
import {
  stats,
} from '@/data';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '常人元 - 射频工程专家 | RF Engineering Lab',
  description: '常人元 - 射频工程专家，专注射频电路设计、5G/6G 通信、高频电路工程研究与实践。研究方向包括大规模天线阵列、毫米波 PA 线性化、阻抗匹配网络设计等。',
  keywords: ['常人元', '射频工程', 'RF Engineering', '5G', '6G', '毫米波', '射频PA线性化', '阻抗匹配', '链路预算'],
  openGraph: {
    title: '常人元 - 射频工程专家 | RF Engineering Lab',
    description: '专注射频电路设计、5G/6G 通信、高频电路工程研究与实践',
    type: 'website',
  },
};

// JSON-LD 结构化数据 - Person + Expert
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "常人元",
  "givenName": "人元",
  "familyName": "常",
  "jobTitle": "射频工程专家",
  "description": "专注射频电路设计、5G/6G 通信、高频电路工程研究与实践",
  "url": "https://rf-research.com",
  "sameAs": [
    "https://github.com/changrenyuan",
    "https://www.linkedin.com/in/changry",
    "https://scholar.google.com/citations?user=changry"
  ],
  "knowsAbout": [
    "射频工程",
    "RF Engineering",
    "5G通信",
    "6G通信",
    "毫米波",
    "Massive MIMO",
    "功率放大器",
    "阻抗匹配",
    "S参数",
    "线性化技术"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "RF Engineering Lab"
  },
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "电子科技大学"
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 导航栏 */}
      <Navbar />

      {/* Hero 区域 */}
      <HeroSection stats={stats} />

      {/* RF 工程快捷入口 */}
      <QuickEngineeringTools />

      {/* 知识库入口 */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="content-container">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="h-8 w-8 text-[var(--color-primary)]" />
            <h2 className="text-3xl font-serif font-semibold text-[var(--text-primary)]">
              知识库
            </h2>
          </div>

          <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-3xl">
            记录射频工程核心知识，从基础理论到实战应用。涵盖传输线理论、史密斯圆图、阻抗匹配、功率放大器设计、VNA 使用等内容。
          </p>

          <Link
            href="/knowledge"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            浏览知识库
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 页脚 */}
      <Footer />
    </div>
  );
}
