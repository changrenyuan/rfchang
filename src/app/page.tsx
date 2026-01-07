import { Metadata } from 'next';
import {
  Navbar,
  HeroSection,
  QuickEngineeringTools,
  ResearchAreas,
  EngineeringTasks,
  TechnicalNotes,
  OpenSourceResources,
  DeepResearchSection,
  Footer,
} from '@/components';
import {
  researchAreas,
  technicalNotes,
  openSourceResources,
  engineeringTasks,
  stats,
} from '@/data';

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

      {/* 研究方向 */}
      <ResearchAreas areas={researchAreas} />

      {/* 典型工程任务 */}
      <EngineeringTasks taskGroups={engineeringTasks} />

      {/* 技术札记 */}
      <TechnicalNotes notes={technicalNotes} />

      {/* 开源资源 */}
      <OpenSourceResources resources={openSourceResources} />

      {/* 深度研究订阅 */}
      <DeepResearchSection />

      {/* 页脚 */}
      <Footer />
    </div>
  );
}
