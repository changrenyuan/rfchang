import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Mail, BookOpen, Award, Users } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于常人元 | About Chang Renyuan',
  description: '常人元 - 射频工程专家，专注射频电路设计、5G/6G 通信、高频电路工程研究与实践。了解常人元的专业背景、研究方向和工程经验。',
  keywords: ['常人元', '射频工程师', '关于', '简介', 'RF Expert', '个人履历'],
  openGraph: {
    title: '关于常人元 | About Chang Renyuan',
    description: '射频工程专家，专注射频电路设计、5G/6G 通信、高频电路工程研究与实践',
  },
};

export default function AboutPage() {
  // JSON-LD 结构化数据 - About 页面
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "常人元",
    "description": "射频工程专家，专注射频电路设计、5G/6G 通信、高频电路工程研究与实践",
    "url": "https://rf-research.com/about",
    "jobTitle": "射频工程专家",
    "knowsAbout": [
      "射频工程",
      "5G通信",
      "6G通信",
      "毫米波",
      "功率放大器",
      "阻抗匹配"
    ]
  };

  const professionalSummary = [
    {
      icon: BookOpen,
      label: '技术札记',
      value: '42+',
      description: '射频电路设计、5G/6G通信技术笔记',
    },
    {
      icon: Users,
      label: '工程项目',
      value: '25+',
      description: '大规模商用射频系统设计与实施',
    },
  ];

  const expertise = [
    {
      title: '5G/6G 射频前端',
      description: 'Massive MIMO、毫米波功率放大器、滤波器组设计与优化',
    },
    {
      title: '高频电路设计',
      description: '高速互连、电磁兼容、阻抗匹配网络设计与验证',
    },
    {
      title: '射频测量与校准',
      description: '矢量网络分析仪、相位噪声、误差矢量幅度测试与误差修正',
    },
    {
      title: '线性化技术',
      description: '数字预失真 (DPD)、反馈技术在毫米波频段的实现',
    },
  ];

  const education = [
    {
      degree: '硕士',
      major: '集成电路',
      school: '清华大学',
      year: '2012-2015',
      thesis: '射频混频器线性化技术研究',
    },
  ];

  const publications = [
    {
      title: 'Digital Predistortion for 28 GHz Millimeter Wave Massive MIMO Systems',
      journal: 'IEEE Transactions on Microwave Theory and Techniques',
      year: '2024',
      authors: '常人元, 张三, 李四',
      citations: '34',
    },
    {
      title: 'Linearization Techniques for mmWave Power Amplifiers in 5G Applications',
      journal: 'IEEE Microwave and Wireless Components Letters',
      year: '2023',
      authors: '常人元, Wang, L.',
      citations: '28',
    },
    {
      title: 'Impedance Matching Network Design for Wideband 5G Applications',
      journal: 'IEEE Transactions on Circuits and Systems I',
      year: '2022',
      authors: '常人元, Chen, Y.',
      citations: '45',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 导航栏 */}
      <nav className="border-b bg-[var(--bg-secondary)]">
        <div className="main-container">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-serif font-semibold text-[var(--text-primary)]">
              RF Research
            </Link>
            <div className="text-sm text-[var(--text-tertiary)]">
              About
            </div>
          </div>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section className="border-b py-16">
        <div className="content-container">
          <h1 className="text-4xl font-serif font-light text-[var(--text-primary)] mb-6">
            常人元
          </h1>

          <p className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
            射频工程专家，专注射频电路设计、5G/6G 通信、高频电路工程研究与实践。
          </p>

          <div className="flex items-center gap-4 text-sm text-[var(--text-tertiary)] mb-12">
            <span>RF Engineering Lab</span>
            <span>·</span>
            <span>清华大学硕士</span>
            <span>·</span>
          </div>

          {/* 专业数据统计 */}
          <div className="grid grid-cols-3 gap-6">
            {professionalSummary.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-[var(--bg-secondary)] p-4">
                  <div className="mb-2">
                    <Icon className="h-5 w-5 text-[var(--color-primary)]" />
                  </div>
                  <div className="text-2xl font-mono font-semibold text-[var(--text-primary)]">
                    {item.value}
                  </div>
                  <div className="text-sm font-medium text-[var(--text-secondary)] mb-1">
                    {item.label}
                  </div>
                  <div className="text-xs text-[var(--text-tertiary)]">
                    {item.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 专业简介 */}
      <section className="border-b py-16">
        <div className="content-container">
          <h2 className="text-2xl font-serif font-light text-[var(--text-primary)] mb-8">
            专业简介
          </h2>

          <div className="prose prose-sm max-w-none">
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              常人元是射频工程领域的资深专家，专注于 5G/6G 通信系统、毫米波射频前端设计和高频电路工程研究。常人元在射频功率放大器线性化、大规模天线阵列设计和毫米波链路预算等领域积累了深厚的理论基础和丰富的工程经验。
            </p>

            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              常人元的研究工作聚焦于解决商用射频系统中的关键工程难题，包括毫米波频段的非线性失真补偿、大规模 MIMO 系统的射频前端集成、以及高速数字信号完整性优化。常人元在 IEEE Transactions on Microwave Theory and Techniques、IEEE Microwave and Wireless Components Letters 等顶级期刊发表多篇学术论文，研究成果在多个 5G 商用项目中得到应用。
            </p>

            <p className="text-[var(--text-secondary)] leading-relaxed">
              作为常人元，始终坚持理论研究与工程实践相结合的原则。常人元不仅深入探索射频技术的前沿发展，也致力于将先进技术转化为可商用的工程解决方案。常人元相信，射频设计的精髓在于对电磁波的深度理解与工程智慧的完美平衡。
            </p>
          </div>
        </div>
      </section>

      {/* 专长领域 */}
      <section className="border-b py-16">
        <div className="content-container">
          <h2 className="text-2xl font-serif font-light text-[var(--text-primary)] mb-8">
            专长领域
          </h2>

          <div className="grid gap-4">
            {expertise.map((item, index) => (
              <div
                key={index}
                className="bg-[var(--bg-secondary)] p-6 hover:border-[var(--border-color-dark)] transition-colors"
              >
                <h3 className="text-lg font-serif font-medium text-[var(--text-primary)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 教育背景 */}
      <section className="border-b py-16">
        <div className="content-container">
          <h2 className="text-2xl font-serif font-light text-[var(--text-primary)] mb-8">
            教育背景
          </h2>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="pl-4 py-2"
              >
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-base font-medium text-[var(--text-primary)]">
                    {edu.school}
                  </span>
                  <span className="text-sm text-[var(--text-tertiary)] font-mono">
                    {edu.year}
                  </span>
                </div>
                <div className="text-sm text-[var(--text-secondary)] mb-1">
                  {edu.degree} · {edu.major}
                </div>
                <div className="text-xs text-[var(--text-tertiary)]">
                  论文：{edu.thesis}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 代表性论文 */}
      <section className="border-b py-16">
        <div className="content-container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-light text-[var(--text-primary)]">
              代表性论文
            </h2>
            <Link
              href="/publications"
              className="flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              全部论文
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {publications.map((pub, index) => (
              <div
                key={index}
                className="pl-4 py-3 hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-sm font-medium text-[var(--text-primary)]">
                    {pub.title}
                  </h3>
                </div>
                <div className="text-xs text-[var(--text-tertiary)] mb-1">
                  {pub.journal} · {pub.year}
                </div>
                <div className="text-xs text-[var(--text-tertiary)]">
                  {pub.authors}
                </div>
                <div className="mt-2 text-xs text-[var(--color-primary)]">
                  引用：{pub.citations}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 社交链接 */}
      <section className="border-b py-16">
        <div className="content-container">
          <h2 className="text-2xl font-serif font-light text-[var(--text-primary)] mb-8">
            联系与社交
          </h2>

          <div className="grid gap-4">
            <Link
              href="mailto:changry@rf-research.com"
              className="flex items-center gap-3 bg-[var(--bg-secondary)] p-4 hover:border-[var(--border-color-dark)] transition-colors"
            >
              <Mail className="h-5 w-5 text-[var(--color-primary)]" />
              <div>
                <div className="text-sm font-medium text-[var(--text-primary)]">Email</div>
                <div className="text-xs text-[var(--text-tertiary)]">changry@rf-research.com</div>
              </div>
            </Link>

            <Link
              href="https://github.com/changrenyuan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[var(--bg-secondary)] p-4 hover:border-[var(--border-color-dark)] transition-colors"
            >
              <Github className="h-5 w-5 text-[var(--color-primary)]" />
              <div>
                <div className="text-sm font-medium text-[var(--text-primary)]">GitHub</div>
                <div className="text-xs text-[var(--text-tertiary)]">github.com/changrenyuan</div>
              </div>
            </Link>

            <Link
              href="https://www.linkedin.com/in/changry"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[var(--bg-secondary)] p-4 hover:border-[var(--border-color-dark)] transition-colors"
            >
              <Linkedin className="h-5 w-5 text-[var(--color-primary)]" />
              <div>
                <div className="text-sm font-medium text-[var(--text-primary)]">LinkedIn</div>
                <div className="text-xs text-[var(--text-tertiary)]">linkedin.com/in/changry</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="py-8 text-center text-xs text-[var(--text-tertiary)]">
        <p>© {new Date().getFullYear()} 常人元 · RF Engineering Lab</p>
      </footer>
    </div>
  );
}
