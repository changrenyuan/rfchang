import Link from 'next/link';

export default function Home() {
  const categories = [
    {
      name: '射频基础',
      description: 'S参数、史密斯圆图、阻抗匹配等基础理论',
      icon: '📡',
      articleCount: 12
    },
    {
      name: '5G基站',
      description: '5G射频前端设计、功率放大器、滤波器',
      icon: '📶',
      articleCount: 8
    },
    {
      name: '阻抗匹配',
      description: '匹配网络设计、调试技巧、实战案例',
      icon: '🔧',
      articleCount: 15
    },
    {
      name: '高频电路',
      description: '高频PCB设计、EMC/EMI、信号完整性',
      icon: '⚡',
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* 导航栏 */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-xl font-bold text-white">
                RF
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                  射频工程师实战平台
                </h1>
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
            <h2 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
              射频工程师的实战成长平台
            </h2>
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

      {/* 分类区域 */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
            技术分类
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/articles?category=${category.name}`}
                className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="mb-3 text-4xl">{category.icon}</div>
                <h4 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {category.name}
                </h4>
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
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              精选文章
            </h3>
            <Link
              href="/articles"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              查看全部 →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <Link
                key={article.title}
                href={`/articles/${encodeURIComponent(article.title)}`}
                className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
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
                <h4 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {article.title}
                </h4>
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
            <h3 className="mb-4 text-2xl font-bold text-white">
              遇到技术难题？预约专家咨询
            </h3>
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
    </div>
  );
}
