import Link from 'next/link';
import { Metadata } from 'next';
import KnowledgeBlock from '@/components/KnowledgeBlock';

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
  // 研究方向 - 使用数学符号替代图标
  const researchAreas = [
    {
      symbol: 'λ',
      title: '5G/6G 射频前端设计',
      description: 'Massive MIMO、毫米波功率放大器、滤波器组',
      metrics: [
        { label: '研究方向', value: '3' },
        { label: '项目经验', value: '8+' },
        { label: '技术深度', value: 'Advanced' },
      ],
      focus: ['大规模天线阵列', '毫米波 PA 线性化', '滤波器集成'],
      constant: 'c = 299792458 m/s',
    },
    {
      symbol: 'Γ',
      title: '高频电路与信号完整性',
      description: '高速互连、电磁兼容、阻抗匹配',
      metrics: [
        { label: '设计案例', value: '15+' },
        { label: '测试覆盖', value: '95%' },
        { label: '验证周期', value: '< 2 weeks' },
      ],
      focus: ['差分对设计', '眼图分析', '电源完整性'],
      constant: 'ε₀ = 8.854 × 10⁻¹² F/m',
    },
    {
      symbol: 'Ω',
      title: '射频测量与校准',
      description: '矢量网络分析仪、相位噪声、误差矢量幅度',
      metrics: [
        { label: '校准标准', value: 'IEEE' },
        { label: '测试工具', value: '自研' },
        { label: '准确度', value: '±0.5 dB' },
      ],
      focus: ['S 参数测量', '误差修正', '自动化测试'],
      constant: 'Z₀ = 50 Ω',
    },
  ];

  // 近期技术札记
  const technicalNotes = [
    {
      id: 'Art_001',
      title: 'Wi-Fi 7 射频前端架构演进',
      excerpt: '探讨 320 MHz 带宽、4096-QAM 调制对射频前端设计的挑战，分析频段干扰抑制方案与射频前端集成策略。',
      date: '2025-01-15',
      category: '技术解读',
      readTime: '12 min',
      isDeep: false,
      tags: ['Wi-Fi 7', '前端架构', '频段干扰'],
    },
    {
      id: 'Art_002',
      title: '史密斯圆图在阻抗匹配中的深度应用',
      excerpt: '从基础到高级：多种匹配网络的对比分析与优化策略，涵盖 L 型、T 型、π 型匹配网络的适用场景与设计方法。',
      date: '2025-01-10',
      category: '深度研究',
      readTime: '25 min',
      isDeep: true,
      tags: ['史密斯圆图', '阻抗匹配', '优化策略'],
    },
    {
      id: 'Art_003',
      title: '毫米波功率放大器线性化技术综述',
      excerpt: '数字预失真 (DPD) 与反馈技术在 28 GHz 频段的实现，分析线性化性能与效率权衡关系。',
      date: '2025-01-05',
      category: '学术论文',
      readTime: '18 min',
      isDeep: true,
      tags: ['毫米波', 'PA', '线性化', 'DPD'],
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
    <div className="min-h-screen">
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 导航栏 - 极简手稿风格 */}
      <nav className="border-t border-dashed" style={{ borderColor: '#E5E5E5', padding: 'var(--space-4) 0' }}>
        <div className="content-container">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="font-serif font-medium" style={{ fontSize: '1.125rem', color: 'var(--text-primary)' }}>
                RF Research
              </Link>
              <p className="mt-0.5" style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)' }}>
                射频工程技术笔记
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/notes"
                style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
              >
                Notes
              </Link>
              <Link
                href="/publications"
                style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
              >
                Publications
              </Link>
              <Link
                href="/tools"
                style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
              >
                Tools
              </Link>
              <Link
                href="/about"
                style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero 区域 - 学术格言 */}
      <KnowledgeBlock
        title="Research Philosophy"
        subtitle="研究理念"
      >
        <blockquote className="font-serif font-light" style={{ fontSize: '1.5rem', lineHeight: 1.6, color: 'var(--text-primary)', marginBottom: 'var(--space-8)' }}>
          "射频设计不仅是电路计算，更是对电磁波的深度理解与工程智慧的平衡。"
        </blockquote>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-4)' }}>
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="font-mono font-semibold" style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}>
                {stat.value}
                <span className="text-sm" style={{ color: 'var(--text-tertiary)', marginLeft: '2px' }}>{stat.unit}</span>
              </div>
              <div className="mt-1" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </KnowledgeBlock>

      {/* 研究方向 - 数学符号 + 物理常数 */}
      <KnowledgeBlock
        title="Research Areas"
        subtitle="研究方向"
      >
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
          {researchAreas.map((area, index) => (
            <div
              key={index}
              style={{ padding: 'var(--space-6)' }}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="font-serif font-bold" style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>
                  {area.symbol}
                </span>
                <span className="font-mono text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                  {area.constant}
                </span>
              </div>

              <h3 className="font-serif font-medium mb-2" style={{ fontSize: '1.125rem', color: 'var(--text-primary)' }}>
                {area.title}
              </h3>

              <p className="mb-4" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {area.description}
              </p>

              {/* 指标数据 */}
              <div className="mb-4 grid gap-2" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {area.metrics.map((metric, i) => (
                  <div key={i}>
                    <div className="font-mono" style={{ color: 'var(--color-primary)', fontSize: '0.875rem' }}>{metric.value}</div>
                    <div style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)' }}>{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1">
                {area.focus.map((item, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '2px 8px',
                      fontSize: '0.75rem',
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </KnowledgeBlock>

      {/* 技术札记 - 文章索引号 */}
      <KnowledgeBlock
        title="Technical Notes"
        subtitle="近期技术札记"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {technicalNotes.map((note, index) => (
            <Link
              key={index}
              href={`/notes/${encodeURIComponent(note.title)}`}
              style={{
                textDecoration: 'none',
                padding: 'var(--space-4)',
                color: 'inherit',
              }}
            >
              <div className="mb-2 flex items-center gap-3" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                <span className="font-mono text-[10px] opacity-50">{note.id}</span>
                <span className="font-mono">{note.date}</span>
                <span>·</span>
                <span style={{
                  padding: '2px 8px',
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)',
                }}>
                  {note.category}
                </span>
                <span>·</span>
                <span>{note.readTime}</span>
                {note.isDeep && (
                  <>
                    <span>·</span>
                    <span style={{ color: 'var(--color-primary)', fontWeight: 500 }}>
                      深度研读
                    </span>
                  </>
                )}
              </div>

              <h3 className="font-serif font-medium mb-2" style={{ fontSize: '1.125rem', color: 'var(--text-primary)' }}>
                {note.title}
              </h3>

              <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {note.excerpt}
              </p>

              <div className="mt-2 flex flex-wrap gap-1">
                {note.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="font-mono"
                    style={{
                      padding: '2px 8px',
                      fontSize: '0.75rem',
                      backgroundColor: 'var(--bg-code)',
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </KnowledgeBlock>
    </div>
  );
}
