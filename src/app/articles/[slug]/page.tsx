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
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* 导航栏 */}
      <nav className="border-b bg-[var(--bg-secondary)]">
        <div className="main-container">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-serif font-semibold text-[var(--text-primary)]">
              RF Research
            </Link>
            <div className="text-sm text-[var(--text-tertiary)]">
              Articles
            </div>
          </div>
        </div>
      </nav>

      <div className="content-container py-12">
        {/* 返回按钮 */}
        <Link
          href="/articles"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          <span>←</span>
          返回文章列表
        </Link>

        {/* 文章头部 */}
        <div className="mb-8 bg-[var(--bg-secondary)] p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="px-2 py-0.5 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-xs">
              {article.category}
            </span>
            {article.isPaid && (
              <span className="px-2 py-0.5 bg-[var(--bg-tertiary)] text-[var(--color-primary)] text-xs">
                付费内容 ¥{article.price}
              </span>
            )}
          </div>
          <h1 className="mb-4 text-3xl font-serif font-semibold text-[var(--text-primary)]">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-[var(--text-tertiary)]">
            <span>作者：{article.author}</span>
            <span>·</span>
            <span>{article.readTime} 阅读</span>
            <span>·</span>
            <span>{article.createdAt}</span>
          </div>
        </div>

        {/* 文章内容 */}
        <div className="prose prose-sm max-w-none">
          <ArticleContent article={article} />
        </div>
      </div>
    </div>
  );
}
