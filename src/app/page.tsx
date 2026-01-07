import Link from 'next/link';
import { BookOpen, Code, FileText, User, ArrowRight, Activity, TrendingUp, Shield } from 'lucide-react';
import { Metadata } from 'next';

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

export default function Home() {
  // 研究方向
  const researchAreas = [
    {
      icon: Activity,
      title: '5G/6G 射频前端设计',
      description: 'Massive MIMO、毫米波功率放大器、滤波器组',
      metrics: [
        { label: '研究方向', value: '3' },
        { label: '项目经验', value: '8+' },
        { label: '技术深度', value: 'Advanced' },
      ],
      focus: ['大规模天线阵列', '毫米波 PA 线性化', '滤波器集成'],
    },
    {
      icon: TrendingUp,
      title: '高频电路与信号完整性',
      description: '高速互连、电磁兼容、阻抗匹配',
      metrics: [
        { label: '设计案例', value: '15+' },
        { label: '测试覆盖', value: '95%' },
        { label: '验证周期', value: '< 2 weeks' },
      ],
      focus: ['差分对设计', '眼图分析', '电源完整性'],
    },
    {
      icon: Shield,
      title: '射频测量与校准',
      description: '矢量网络分析仪、相位噪声、误差矢量幅度',
      metrics: [
        { label: '校准标准', value: 'IEEE' },
        { label: '测试工具', value: '自研' },
        { label: '准确度', value: '±0.5 dB' },
      ],
      focus: ['S 参数测量', '误差修正', '自动化测试'],
    },
  ];

  // 近期技术札记
  const technicalNotes = [
    {
      title: 'Wi-Fi 7 射频前端架构演进',
      excerpt: '探讨 320 MHz 带宽、4096-QAM 调制对射频前端设计的挑战，分析频段干扰抑制方案与射频前端集成策略。',
      date: '2025-01-15',
      category: '技术解读',
      readTime: '12 min',
      isDeep: false,
      tags: ['Wi-Fi 7', '前端架构', '频段干扰'],
    },
    {
      title: '史密斯圆图在阻抗匹配中的深度应用',
      excerpt: '从基础到高级：多种匹配网络的对比分析与优化策略，涵盖 L 型、T 型、π 型匹配网络的适用场景与设计方法。',
      date: '2025-01-10',
      category: '深度研究',
      readTime: '25 min',
      isDeep: true,
      tags: ['史密斯圆图', '阻抗匹配', '优化策略'],
    },
    {
      title: '毫米波功率放大器线性化技术综述',
      excerpt: '数字预失真 (DPD) 与反馈技术在 28 GHz 频段的实现，分析线性化性能与效率权衡关系。',
      date: '2025-01-05',
      category: '学术论文',
      readTime: '18 min',
      isDeep: true,
      tags: ['毫米波', 'PA', '线性化', 'DPD'],
    },
  ];

  // 开源资源
  const openSourceResources = [
    {
      name: 'rf-calculator',
      description: 'Python 射频参数计算工具包，包含 S 参数、驻波比、回波损耗等常用计算模块',
      type: 'Python Package',
      language: 'Python',
      stars: 234,
      link: 'https://github.com/changrenyuan/rf-calculator',
    },
    {
      name: 's-parameter-plotter',
      description: 'Web-based S 参数可视化工具，支持 Touchstone 文件格式导入与矢量网络分析',
      type: 'Web Tool',
      language: 'TypeScript',
      stars: 189,
      link: '/tools/s-parameter-plotter',
    },
    {
      name: 'impedance-matcher',
      description: 'Matlab 阻抗匹配网络自动设计工具，支持多级匹配网络优化与 parasitic 参数补偿',
      type: 'Matlab Script',
      language: 'Matlab',
      stars: 156,
      link: 'https://github.com/changrenyuan/impedance-matcher',
    },
  ];

  // 统计数据
  const stats = [
    { label: '技术札记', value: '42', unit: '篇' },
    { label: '开源项目', value: '8', unit: '个' },
    { label: '学术论文', value: '12', unit: '篇' },
    { label: '工程案例', value: '25', unit: '个' },
  ];

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

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 导航栏 - 极简学术风格 */}
      <nav className="border-b border-thin bg-[var(--bg-secondary)]">
        <div className="main-container">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-xl font-serif font-semibold text-[var(--text-primary)]">
                RF Research
              </Link>
              <p className="mt-0.5 text-xs text-[var(--text-tertiary)]">
                射频工程技术笔记
              </p>
            </div>
            <div className="flex items-center gap-8 text-sm">
              <Link
                href="/notes"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                Notes
              </Link>
              <Link
                href="/publications"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                Publications
              </Link>
              <Link
                href="/tools"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                Tools
              </Link>
              <Link
                href="/about"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero 区域 - 学术格言与统计数据 */}
      <section className="border-b border-thin py-16">
        <div className="content-container">
          <blockquote className="mb-12 text-3xl font-serif font-light leading-relaxed text-[var(--text-primary)]">
            "射频设计不仅是电路计算，更是对电磁波的深度理解与工程智慧的平衡。"
          </blockquote>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="border-thin bg-[var(--bg-secondary)] p-4"
              >
                <div className="text-2xl font-mono font-semibold text-[var(--color-primary)]">
                  {stat.value}
                  <span className="text-sm text-[var(--text-tertiary)] ml-1">{stat.unit}</span>
                </div>
                <div className="mt-1 text-xs text-[var(--text-tertiary)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 研究方向 - 带指标数据 */}
      <section className="py-16">
        <div className="main-container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-serif font-light text-[var(--text-primary)]">
              Research Areas
            </h2>
            <Link
              href="/about"
              className="flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              查看详情
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {researchAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div
                  key={index}
                  className="border-thin bg-[var(--bg-secondary)] p-6 hover:border-[var(--border-color-dark)] transition-colors"
                >
                  <div className="mb-4">
                    <Icon className="h-6 w-6 text-[var(--color-primary)]" />
                  </div>

                  <h3 className="mb-2 text-lg font-serif font-medium text-[var(--text-primary)]">
                    {area.title}
                  </h3>

                  <p className="mb-4 text-sm text-[var(--text-secondary)]">
                    {area.description}
                  </p>

                  {/* 指标数据 */}
                  <div className="mb-4 grid grid-cols-3 gap-2 text-xs">
                    {area.metrics.map((metric, i) => (
                      <div key={i} className="border-thin p-2">
                        <div className="font-mono text-[var(--color-primary)]">{metric.value}</div>
                        <div className="text-[var(--text-tertiary)]">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {area.focus.map((item, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-industrial-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 技术札记 - 增强信息密度 */}
      <section className="border-t border-thin py-16">
        <div className="content-container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-serif font-light text-[var(--text-primary)]">
              Recent Technical Notes
            </h2>
            <Link
              href="/notes"
              className="flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              全部札记 ({technicalNotes.length})
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {technicalNotes.map((note, index) => (
              <Link
                key={index}
                href={`/notes/${encodeURIComponent(note.title)}`}
                className="block border-l-thin pl-4 py-3 hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                <div className="mb-2 flex items-center gap-3 text-xs text-[var(--text-tertiary)]">
                  <span className="font-mono">{note.date}</span>
                  <span>·</span>
                  <span className="px-2 py-0.5 bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
                    {note.category}
                  </span>
                  <span>·</span>
                  <span>{note.readTime}</span>
                  {note.isDeep && (
                    <>
                      <span>·</span>
                      <span className="text-[var(--color-primary)] font-medium">
                        深度研读
                      </span>
                    </>
                  )}
                </div>

                <h3 className="mb-2 text-lg font-serif font-medium text-[var(--text-primary)] hover:text-[var(--color-primary)] transition-colors">
                  {note.title}
                </h3>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {note.excerpt}
                </p>

                <div className="mt-2 flex flex-wrap gap-1">
                  {note.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-xs bg-[var(--bg-code)] text-[var(--text-tertiary)] rounded-industrial-sm font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 开源资源 - 统一列表风格 */}
      <section className="border-t border-thin py-16">
        <div className="main-container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-serif font-light text-[var(--text-primary)]">
              Open Source Resources
            </h2>
            <Link
              href="https://github.com/changrenyuan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              GitHub
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {openSourceResources.map((resource, index) => (
              <a
                key={index}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="border-thin bg-[var(--bg-secondary)] p-5 hover:border-[var(--border-color-dark)] transition-colors group"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-[var(--color-primary)]" />
                    <span className="text-xs font-mono text-[var(--text-tertiary)]">
                      {resource.language}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[var(--text-tertiary)]">
                    {resource.type}
                  </span>
                </div>

                <h3 className="mb-2 text-base font-serif font-medium text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                  {resource.name}
                </h3>

                <p className="mb-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
                    <Activity className="h-3 w-3" />
                    <span className="font-mono">{resource.stars}</span>
                  </div>
                  <div className="text-xs text-[var(--color-primary)]">
                    View →
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 深度研究订阅 */}
      <section className="border-t border-thin py-16">
        <div className="mx-auto max-w-3xl px-8">
          <div className="border-thin bg-[var(--bg-secondary)] p-8">
            <div className="mb-6 flex justify-center">
              <FileText className="h-12 w-12 text-[var(--color-primary)]" />
            </div>

            <h2 className="mb-4 text-2xl font-serif font-light text-center text-[var(--text-primary)]">
              深度研究资料
            </h2>

            <p className="mb-6 text-center text-sm text-[var(--text-secondary)] leading-relaxed">
              研究笔记与核心案例的完整版本，包含详细的数学推导、实验数据与代码实现，
              仅供深度学习者研读。
            </p>

            <div className="grid gap-4 sm:grid-cols-2 mb-6">
              <div className="border-thin p-4">
                <div className="mb-2 text-xs font-mono text-[var(--text-tertiary)]">Mathematical Derivation</div>
                <div className="text-sm text-[var(--text-primary)]">完整的公式推导过程</div>
              </div>
              <div className="border-thin p-4">
                <div className="mb-2 text-xs font-mono text-[var(--text-tertiary)]">Experimental Data</div>
                <div className="text-sm text-[var(--text-primary)]">实测数据与仿真对比</div>
              </div>
              <div className="border-thin p-4">
                <div className="mb-2 text-xs font-mono text-[var(--text-tertiary)]">Code Implementation</div>
                <div className="text-sm text-[var(--text-primary)]">完整的代码实现</div>
              </div>
              <div className="border-thin p-4">
                <div className="mb-2 text-xs font-mono text-[var(--text-tertiary)]">Reference</div>
                <div className="text-sm text-[var(--text-primary)]">完整的参考文献</div>
              </div>
            </div>

            <div className="flex justify-center">
              <Link
                href="/insights"
                className="btn-industrial btn-primary"
              >
                查看研究资料
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t border-thin py-12">
        <div className="mx-auto max-w-6xl px-8">
          <div className="grid gap-8 md:grid-cols-4 mb-8">
            <div className="md:col-span-2">
              <Link
                href="/"
                className="text-xl font-serif font-semibold text-[var(--text-primary)]"
              >
                RF Research
              </Link>
              <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                专注射频电路设计、5G/6G 通信、高频电路工程实践。
                提供技术笔记、工程工具与研究资料，促进射频工程知识分享。
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
                导航
              </h4>
              <div className="space-y-2 text-sm">
                <Link href="/notes" className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Technical Notes
                </Link>
                <Link href="/publications" className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Publications
                </Link>
                <Link href="/tools" className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Tools
                </Link>
                <Link href="/cases" className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  工程案例
                </Link>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
                关于
              </h4>
              <div className="space-y-2 text-sm">
                <Link href="/about" className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Biography
                </Link>
                <Link href="/about#contact" className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Contact
                </Link>
                <Link href="https://github.com/changrenyuan" target="_blank" className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  GitHub
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-thin pt-8 text-center text-xs text-[var(--text-tertiary)]">
            <p className="mb-2">
              © 2025 RF Research. All rights reserved.
            </p>
            <p>
              专注射频电路设计、5G/6G 通信、高频电路工程实践
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
