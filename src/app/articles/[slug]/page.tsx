import Link from 'next/link';
import ArticleContent from './ArticleContent';

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 模拟数据 - 实际应该从 API 获取
  const article = {
    title: decodeURIComponent(slug),
    category: '阻抗匹配',
    isPaid: true,
    price: 99,
    readTime: '25 分钟',
    createdAt: '2025-01-05',
    author: '射频专家',
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* 导航栏 */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-xl font-bold text-white">
                RF
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                  射频工程师实战平台
                </h1>
              </div>
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/articles"
                className="text-sm font-medium text-blue-600 dark:text-blue-400"
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

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* 返回按钮 */}
        <Link
          href="/articles"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
        >
          <span>←</span>
          返回文章列表
        </Link>

        {/* 文章头部 */}
        <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              {article.category}
            </span>
            {article.isPaid && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                付费内容 ¥{article.price}
              </span>
            )}
          </div>
          <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
            <span>作者：{article.author}</span>
            <span>•</span>
            <span>{article.readTime} 阅读</span>
            <span>•</span>
            <span>{article.createdAt}</span>
          </div>
        </div>

        {/* 文章内容 */}
        <ArticleContent article={article} />

        {/* 底部 CTA */}
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
            还有疑问？
          </h3>
          <p className="mb-4 text-slate-600 dark:text-slate-400">
            预约专家咨询，针对你的具体项目提供个性化解决方案
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            预约咨询 →
          </Link>
        </div>
      </div>
    </div>
  );
}
