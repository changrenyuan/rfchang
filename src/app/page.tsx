import Link from 'next/link';
import {
  Radio,
  Signal,
  Waves,
  Settings,
  Calculator,
  Zap,
  ChevronRight
} from 'lucide-react';

export default function Home() {
  const categories = [
    {
      name: '射频基础',
      description: 'S参数、史密斯圆图、阻抗匹配等基础理论',
      icon: Radio,
      articleCount: 12
    },
    {
      name: '5G基站',
      description: '5G射频前端设计、功率放大器、滤波器',
      icon: Signal,
      articleCount: 8
    },
    {
      name: '阻抗匹配',
      description: '匹配网络设计、调试技巧、实战案例',
      icon: Settings,
      articleCount: 15
    },
    {
      name: '高频电路',
      description: '高频PCB设计、EMC/EMI、信号完整性',
      icon: Zap,
      articleCount: 10
    }
  ];

  const featuredArticles = [
    {
      title: '5G基站PA设计实战：从理论到调试',
      excerpt: '详解功率放大器的设计流程、关键参数和调试技巧...',
      category: '5G基站',
      isPaid: true,
      price: 99
    },
    {
      title: 'Smith Chart 阻抗匹配完全指南',
      excerpt: '手把手教你用史密斯圆图设计匹配网络...',
      category: '阻抗匹配',
      isPaid: false,
      price: 0
    },
    {
      title: '高频PCB设计中的10个常见误区',
      excerpt: '总结多年实战经验，避免踩坑...',
      category: '高频电路',
      isPaid: false,
      price: 0
    }
  ];

  const hotTools = [
    {
      name: '阻抗匹配计算器',
      description: '快速设计匹配网络',
      icon: Settings,
      href: '/tools/impedance-matching'
    },
    {
      name: 'VSWR/回波损耗转换',
      description: '参数转换工具',
      icon: Calculator,
      href: '/tools/vswr-converter'
    },
    {
      name: 'dBm 功率转换',
      description: '功率单位转换',
      icon: Zap,
      href: '/tools/dbm-converter'
    }
  ];

  const rfMetrics = [
    { label: 'n78频段', value: '3300-3800 MHz' },
    { label: 'S11 < -10dB', value: 'Match OK' },
    { label: '特征阻抗 Z0', value: '50 Ω' },
    { label: '光速', value: '≈ 3×10⁸ m/s' },
    { label: '5G Sub-6GHz', value: 'FR1 频段' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* 射频专业背景 - SVG 网格线和波形 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {/* 网格线背景 */}
        <svg className="absolute inset-0 h-full w-full" style={{ opacity: 0.03 }}>
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#grid)"
            className="text-slate-900 dark:text-slate-100"
          />
        </svg>
        {/* 波形装饰 */}
        <svg
          className="absolute right-0 top-20 h-96 w-96 opacity-5 dark:opacity-3"
          viewBox="0 0 100 100"
        >
          <path
            d="M0,50 Q25,20 50,50 T100,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-blue-600"
          />
          <path
            d="M0,60 Q25,30 50,60 T100,60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-blue-600"
          />
        </svg>
      </div>

      {/* 技术指标滚动条 */}
      <div className="bg-slate-100/80 backdrop-blur-sm dark:bg-slate-800/80 py-2 overflow-hidden">
        <div className="flex gap-8 animate-marquee px-4 text-xs text-slate-600 dark:text-slate-400">
          {rfMetrics.map((metric, index) => (
            <span key={index} className="whitespace-nowrap">
              {metric.label}: {metric.value}
            </span>
          ))}
        </div>
      </div>

      {/* 导航栏 */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-xl font-bold text-white">
                RF
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  射频工程师实战平台
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  5G · 阻抗匹配 · 高频电路
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/articles"
                className="text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
              >
                知识库
              </Link>
              <Link
                href="/tools"
                className="text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
              >
                在线工具
              </Link>
              <Link
                href="/consultation"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                预约咨询
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
              射频工程师的实战成长平台
            </h1>
            <p className="mb-8 text-lg text-slate-600 dark:text-slate-300">
              专注 5G 基站射频通信、阻抗匹配、高频电路设计
              <br />
              分享实战经验，解决技术难题
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/articles"
                className="rounded-lg bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors"
              >
                开始学习
              </Link>
              <Link
                href="/tools"
                className="rounded-lg border border-slate-300 px-8 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
              >
                在线工具
              </Link>
              <Link
                href="/consultation"
                className="rounded-lg border border-slate-300 px-8 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
              >
                技术咨询
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 热门工具区域 */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              热门工具
            </h2>
            <Link
              href="/tools"
              className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              查看全部
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hotTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <tool.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-base font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {tool.description}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 分类区域 */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
            技术分类
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/articles?category=${category.name}`}
                className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <category.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {category.name}
                </h3>
                <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
                  {category.description}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  {category.articleCount} 篇文章
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 精选文章 */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              精选文章
            </h2>
            <Link
              href="/articles"
              className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              查看全部
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <Link
                key={article.title}
                href={`/articles/${encodeURIComponent(article.title)}`}
                className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    {article.category}
                  </span>
                  {article.isPaid && (
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                      付费 ¥{article.price}
                    </span>
                  )}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {article.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 咨询服务 CTA */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-white">
              遇到技术难题？预约专家咨询
            </h2>
            <p className="mb-6 text-blue-100">
              射频设计、阻抗调试、5G基站设计等技术咨询
              <br />
              10年+ 实战经验，帮你快速解决问题
            </p>
            <Link
              href="/consultation"
              className="inline-block rounded-lg bg-white px-8 py-3 text-base font-medium text-blue-600 hover:bg-blue-50 transition-colors"
            >
              立即预约
            </Link>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t border-slate-200 py-8 dark:border-slate-700">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>© 2025 射频工程师实战平台. 专注射频设计与实战经验分享.</p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
