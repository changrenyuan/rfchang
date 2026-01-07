import Link from 'next/link';
import { BookOpen, Code, FileText, User, ArrowRight } from 'lucide-react';

export default function Home() {
  // 研究方向
  const researchAreas = [
    {
      title: '5G/6G 射频前端设计',
      description: 'Massive MIMO、毫米波功率放大器、滤波器组',
      focus: ['大规模天线阵列', '毫米波 PA 线性化', '滤波器集成']
    },
    {
      title: '高频电路与信号完整性',
      description: '高速互连、电磁兼容、阻抗匹配',
      focus: ['差分对设计', '眼图分析', '电源完整性']
    },
    {
      title: '射频测量与校准',
      description: '矢量网络分析仪、相位噪声、误差矢量幅度',
      focus: ['S 参数测量', '误差修正', '自动化测试']
    }
  ];

  // 近期技术札记
  const technicalNotes = [
    {
      title: 'Wi-Fi 7 射频前端架构演进',
      excerpt: '探讨 320 MHz 带宽、4096-QAM 调制对射频前端设计的挑战...',
      date: '2025-01-15',
      category: '技术解读',
      readTime: '12 min',
      isDeep: false
    },
    {
      title: '史密斯圆图在阻抗匹配中的深度应用',
      excerpt: '从基础到高级：多种匹配网络的对比分析与优化策略...',
      date: '2025-01-10',
      category: '深度研究',
      readTime: '25 min',
      isDeep: true
    },
    {
      title: '毫米波功率放大器线性化技术综述',
      excerpt: '数字预失真 (DPD) 与反馈技术在 28 GHz 频段的实现...',
      date: '2025-01-05',
      category: '学术论文',
      readTime: '18 min',
      isDeep: true
    }
  ];

  // 开源资源
  const openSourceResources = [
    {
      name: 'rf-calculator',
      description: 'Python 射频参数计算工具包',
      type: 'Python Package',
      link: 'https://github.com/your-repo/rf-calculator'
    },
    {
      name: 's-parameter-plotter',
      description: 'Web-based S 参数可视化工具',
      type: 'Web Tool',
      link: '/tools/s-parameter-plotter'
    },
    {
      name: 'impedance-matcher',
      description: 'Matlab 阻抗匹配网络自动设计',
      type: 'Matlab Script',
      link: '/resources/impedance-matcher'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* 导航栏 - 极简学术风格 */}
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95">
        <div className="mx-auto max-w-4xl px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-lg font-semibold text-slate-900 dark:text-slate-100 hover:text-slate-700 dark:hover:text-slate-300">
                RF Research
              </Link>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                射频工程技术笔记
              </p>
            </div>
            <div className="flex items-center gap-8 text-sm">
              <Link
                href="/notes"
                className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
              >
                Technical Notes
              </Link>
              <Link
                href="/resources"
                className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
              >
                Resources
              </Link>
              <Link
                href="/insights"
                className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
              >
                Insights
              </Link>
              <Link
                href="/about"
                className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 学术格言区域 */}
      <section className="border-b border-slate-100 dark:border-slate-900 py-20">
        <div className="mx-auto max-w-3xl px-8 text-center">
          <blockquote className="mb-6 text-3xl font-light leading-relaxed text-slate-900 dark:text-slate-100 serif">
            "射频设计不仅是电路计算，更是对电磁波的深度理解与工程智慧的平衡。"
          </blockquote>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            — Research Philosophy
          </p>
        </div>
      </section>

      {/* 研究方向 */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-8">
          <h2 className="mb-12 text-2xl font-light text-slate-900 dark:text-slate-100">
            Research Areas
          </h2>
          <div className="space-y-8">
            {researchAreas.map((area, index) => (
              <div
                key={index}
                className="border-l-2 border-slate-200 dark:border-slate-800 pl-6 hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
              >
                <h3 className="mb-2 text-lg font-medium text-slate-900 dark:text-slate-100">
                  {area.title}
                </h3>
                <p className="mb-4 text-slate-600 dark:text-slate-400">
                  {area.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {area.focus.map((item, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 技术札记 */}
      <section className="border-t border-slate-100 dark:border-slate-900 py-16">
        <div className="mx-auto max-w-4xl px-8">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-2xl font-light text-slate-900 dark:text-slate-100">
              Technical Notes
            </h2>
            <Link
              href="/notes"
              className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            >
              全部札记
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-6">
            {technicalNotes.map((note, index) => (
              <Link
                key={index}
                href={`/notes/${encodeURIComponent(note.title)}`}
                className="block border-l-2 border-slate-100 dark:border-slate-800 pl-6 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-all py-2"
              >
                <div className="mb-2 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span>{note.date}</span>
                  <span>·</span>
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800">
                    {note.category}
                  </span>
                  <span>·</span>
                  <span>{note.readTime}</span>
                  {note.isDeep && (
                    <>
                      <span>·</span>
                      <span className="text-amber-700 dark:text-amber-400">
                        深度研读
                      </span>
                    </>
                  )}
                </div>
                <h3 className="mb-2 text-lg font-medium text-slate-900 dark:text-slate-100 hover:text-slate-700 dark:hover:text-slate-300">
                  {note.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {note.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 开源资源 */}
      <section className="border-t border-slate-100 dark:border-slate-900 py-16">
        <div className="mx-auto max-w-4xl px-8">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-2xl font-light text-slate-900 dark:text-slate-100">
              Open Source Resources
            </h2>
            <Link
              href="/resources"
              className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            >
              更多资源
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {openSourceResources.map((resource, index) => (
              <a
                key={index}
                href={resource.link}
                className="border border-slate-200 dark:border-slate-800 p-6 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Code className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {resource.type}
                  </span>
                </div>
                <h3 className="mb-2 text-base font-medium text-slate-900 dark:text-slate-100">
                  {resource.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {resource.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 深度研究订阅 */}
      <section className="border-t border-slate-100 dark:border-slate-900 py-16">
        <div className="mx-auto max-w-3xl px-8 text-center">
          <FileText className="mx-auto mb-6 h-12 w-12 text-slate-400 dark:text-slate-600" />
          <h2 className="mb-4 text-2xl font-light text-slate-900 dark:text-slate-100">
            深度研究订阅
          </h2>
          <p className="mb-8 text-slate-600 dark:text-slate-400">
            研究笔记与核心案例的完整版本，仅供深度学习者研读
          </p>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
          >
            查看研究资料
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="mx-auto max-w-4xl px-8">
          <div className="flex flex-col items-center text-center text-sm text-slate-600 dark:text-slate-400">
            <p className="mb-4">
              专注射频电路设计、5G/6G 通信、高频电路工程实践
            </p>
            <div className="flex items-center gap-6 text-xs">
              <Link href="/about" className="hover:text-slate-900 dark:hover:text-slate-100">
                Biography
              </Link>
              <Link href="/publications" className="hover:text-slate-900 dark:hover:text-slate-100">
                Publications
              </Link>
              <Link href="/projects" className="hover:text-slate-900 dark:hover:text-slate-100">
                Projects
              </Link>
            </div>
            <p className="mt-6 text-xs text-slate-500 dark:text-slate-500">
              © 2025 RF Research. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .serif {
          font-family: Georgia, 'Times New Roman', Times, serif;
        }
      `}</style>
    </div>
  );
}
