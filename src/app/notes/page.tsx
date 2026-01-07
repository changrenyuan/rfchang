import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '技术札记 | Notes | 常人元射频研究',
  description: '常人元的射频工程技术札记，涵盖阻抗匹配、史密斯圆图、5G/6G 通信、毫米波、功率放大器等核心主题。深度技术解析与实践经验分享。',
  keywords: ['常人元技术札记', '射频技术笔记', '史密斯圆图', '阻抗匹配', '5G设计', '毫米波PA'],
  openGraph: {
    title: '技术札记 | Notes | 常人元射频研究',
    description: '常人元的射频工程技术札记',
  },
};

export default function NotesPage() {
  // 技术札记数据
  const notes = [
    {
      id: 1,
      slug: 'wi-fi-7-rf-frontend-architecture',
      title: 'Wi-Fi 7 射频前端架构演进',
      excerpt: '探讨 320 MHz 带宽、4096-QAM 调制对射频前端设计的挑战，分析频段干扰抑制方案与射频前端集成策略。',
      date: '2025-01-15',
      category: '技术解读',
      readTime: '12 min',
      isDeep: false,
      tags: ['Wi-Fi 7', '前端架构', '频段干扰'],
    },
    {
      id: 2,
      slug: 'smith-chart-impedance-matching',
      title: '史密斯圆图在阻抗匹配中的深度应用',
      excerpt: '从基础到高级：多种匹配网络的对比分析与优化策略，涵盖 L 型、T 型、π 型匹配网络的适用场景与设计方法。',
      date: '2025-01-10',
      category: '深度研究',
      readTime: '25 min',
      isDeep: true,
      tags: ['史密斯圆图', '阻抗匹配', '优化策略'],
    },
    {
      id: 3,
      slug: 'mmwave-pa-linearization',
      title: '毫米波功率放大器线性化技术综述',
      excerpt: '数字预失真 (DPD) 与反馈技术在 28 GHz 频段的实现，分析线性化性能与效率权衡关系。',
      date: '2025-01-05',
      category: '学术论文',
      readTime: '18 min',
      isDeep: true,
      tags: ['毫米波', 'PA', '线性化', 'DPD'],
    },
    {
      id: 4,
      slug: '5g-massive-mimo-design',
      title: '5G Massive MIMO 射频前端设计挑战',
      excerpt: '大规模天线阵列对射频前端的要求，包括功率效率、线性度、互调失真等关键指标的优化策略。',
      date: '2024-12-28',
      category: '深度研究',
      readTime: '20 min',
      isDeep: true,
      tags: ['Massive MIMO', '射频前端', '线性度'],
    },
    {
      id: 5,
      slug: 'high-speed-signal-integrity',
      title: '高速数字信号完整性分析',
      excerpt: '差分对设计、眼图分析、电源完整性等高速信号设计中的关键问题与解决方案。',
      date: '2024-12-20',
      category: '技术解读',
      readTime: '16 min',
      isDeep: false,
      tags: ['信号完整性', '差分对', '眼图'],
    },
    {
      id: 6,
      slug: 's-parameter-measurement',
      title: 'S 参数测量与误差修正技术',
      excerpt: '矢量网络分析仪使用技巧，TRL 校准方法，以及测量误差对设计精度的影响分析。',
      date: '2024-12-15',
      category: '技术解读',
      readTime: '14 min',
      isDeep: false,
      tags: ['S参数', 'VNA', '校准'],
    },
    {
      id: 7,
      slug: 'filter-design-for-5g',
      title: '5G 频段滤波器设计与选择',
      excerpt: 'SAW、BAW、FBAR 等滤波器技术对比，以及在 5G 频段的应用场景和设计考量。',
      date: '2024-12-10',
      category: '技术解读',
      readTime: '18 min',
      isDeep: false,
      tags: ['滤波器', 'SAW', 'BAW', 'FBAR'],
    },
    {
      id: 8,
      slug: 'emc-design-for-rf',
      title: '射频系统中的 EMC 设计与抑制',
      excerpt: 'EMC 干扰的产生机理、传播路径分析和抑制方法，结合实际案例讲解。',
      date: '2024-12-05',
      category: '深度研究',
      readTime: '22 min',
      isDeep: true,
      tags: ['EMC', '干扰抑制', '电磁兼容'],
    },
  ];

  const categories = ['全部', '技术解读', '深度研究', '学术论文'];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* 导航栏 */}
      <nav className="border-b border-thin bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-4xl px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-serif font-semibold text-[var(--text-primary)]">
              RF Research
            </Link>
            <div className="text-sm text-[var(--text-tertiary)]">
              Notes
            </div>
          </div>
        </div>
      </nav>

      {/* 页面头部 */}
      <section className="border-b border-thin py-16">
        <div className="mx-auto max-w-4xl px-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-6 w-6 text-[var(--color-primary)]" />
            <span className="text-sm text-[var(--text-tertiary)] font-mono">
              Technical Notes
            </span>
          </div>

          <h1 className="text-4xl font-serif font-light text-[var(--text-primary)] mb-6">
            技术札记
          </h1>

          <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
            射频工程技术笔记与深度解析，涵盖阻抗匹配、史密斯圆图、5G/6G 通信、毫米波功率放大器等核心主题。
          </p>

          {/* 统计信息 */}
          <div className="flex items-center gap-8 text-sm text-[var(--text-tertiary)]">
            <span>
              <span className="text-2xl font-mono font-semibold text-[var(--text-primary)]">
                {notes.length}
              </span>
              <span className="ml-1">篇札记</span>
            </span>
            <span>·</span>
            <span>持续更新</span>
            <span>·</span>
            <span>深度技术解析</span>
          </div>
        </div>
      </section>

      {/* 分类筛选 */}
      <section className="border-b border-thin py-8">
        <div className="mx-auto max-w-4xl px-8">
          <div className="flex items-center gap-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                className="whitespace-nowrap px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-thin bg-[var(--bg-secondary)] hover:border-[var(--border-color-dark)] transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 札记列表 */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-8">
          <div className="space-y-4">
            {notes.map((note) => (
              <Link
                key={note.id}
                href={`/notes/${note.slug}`}
                className="block border-l-thin pl-4 py-4 hover:bg-[var(--bg-tertiary)] transition-colors"
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

                <div className="mt-3 flex flex-wrap gap-1">
                  {note.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-xs bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] rounded-industrial-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t border-thin py-8 text-center text-xs text-[var(--text-tertiary)]">
        <p>© {new Date().getFullYear()} 常人元 · RF Engineering Lab</p>
      </footer>
    </div>
  );
}
