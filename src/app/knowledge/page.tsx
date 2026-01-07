import Link from 'next/link';
import { BookOpen, ArrowRight, Search, FileText, Clock, User } from 'lucide-react';

export const metadata = {
  title: '知识库 - RF Knowledge Base',
  description: '射频工程知识库，涵盖基础理论、电路设计、测量技术',
};

export default function KnowledgePage() {
  const categories = [
    {
      title: '基础理论',
      description: '射频电路的理论基础，包括传输线理论、史密斯圆图、S参数等核心概念',
      icon: '📚',
      topics: [
        { name: '传输线理论', path: '/knowledge/fundamentals/transmission-line' },
        { name: '史密斯圆图', path: '/knowledge/fundamentals/smith-chart' },
        { name: '阻抗匹配网络', path: '/knowledge/fundamentals/impedance-matching' },
        { name: 'S参数基础', path: '/knowledge/fundamentals/s-parameters' },
      ],
      count: 4,
    },
    {
      title: '电路设计',
      description: '射频电路设计实战，包括功率放大器、低噪声放大器、滤波器等',
      icon: '⚡',
      topics: [
        { name: '功率放大器设计', path: '/knowledge/circuit-design/pa-design' },
        { name: '低噪声放大器设计', path: '/knowledge/circuit-design/lna-design' },
        { name: '滤波器设计', path: '/knowledge/circuit-design/filter-design' },
        { name: '混频器设计', path: '/knowledge/circuit-design/mixer-design' },
      ],
      count: 4,
    },
    {
      title: '测量技术',
      description: '射频测量工具使用指南，包括VNA、频谱仪、功率计等',
      icon: '📊',
      topics: [
        { name: 'VNA使用指南', path: '/knowledge/measurement/vna-usage' },
        { name: '频谱仪应用', path: '/knowledge/measurement/spectrum-analyzer' },
        { name: '功率测量', path: '/knowledge/measurement/power-measurement' },
        { name: '噪声系数测量', path: '/knowledge/measurement/noise-measurement' },
      ],
      count: 4,
    },
  ];

  const recentArticles = [
    {
      title: '史密斯圆图',
      description: '史密斯圆图是射频工程师必备的可视化工具，用于阻抗匹配网络的设计与分析',
      category: '基础理论',
      readTime: '15 min',
      author: 'RF Engineer',
      date: '2024-01-15',
      path: '/knowledge/fundamentals/smith-chart',
    },
    {
      title: '阻抗匹配网络',
      description: '深入讲解阻抗匹配网络的设计方法，包括L型、T型和π型匹配网络',
      category: '基础理论',
      readTime: '20 min',
      author: 'RF Engineer',
      date: '2024-01-20',
      path: '/knowledge/fundamentals/impedance-matching',
    },
    {
      title: 'S参数基础',
      description: 'S参数是射频网络分析的核心工具，本文将详细讲解S参数的定义、应用和测量方法',
      category: '基础理论',
      readTime: '18 min',
      author: 'RF Engineer',
      date: '2024-01-25',
      path: '/knowledge/fundamentals/s-parameters',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="content-container py-12">
        {/* 页面头部 */}
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-semibold text-[var(--text-primary)] mb-4">
            知识库
          </h1>
          <p className="text-lg text-[var(--text-secondary)] mb-8">
            射频工程核心知识，从基础理论到实战应用
          </p>

          {/* 搜索框 */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-tertiary)]" />
            <input
              type="text"
              placeholder="搜索文章、知识点..."
              className="w-full pl-12 pr-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-colors"
            />
          </div>
        </div>

        {/* 分类卡片 */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-semibold text-[var(--text-primary)] mb-6">
            按分类浏览
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.title}
                href={category.topics[0].path}
                className="group bg-[var(--bg-secondary)] p-6 hover:border-[var(--border-color-dark)] transition-all"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-4xl">{category.icon}</span>
                  <span className="text-xs px-2 py-1 bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] rounded">
                    {category.count} 篇
                  </span>
                </div>

                <h3 className="mb-2 text-xl font-serif font-medium text-[var(--text-primary)]">
                  {category.title}
                </h3>

                <p className="mb-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {category.description}
                </p>

                <div className="space-y-2">
                  {category.topics.map((topic) => (
                    <div
                      key={topic.name}
                      className="flex items-center gap-2 text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors"
                    >
                      <ArrowRight className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{topic.name}</span>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 最新文章 */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-semibold text-[var(--text-primary)] mb-6">
            最新文章
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {recentArticles.map((article) => (
              <Link
                key={article.title}
                href={article.path}
                className="group bg-[var(--bg-secondary)] p-6 hover:border-[var(--border-color-dark)] transition-all"
              >
                <div className="mb-3">
                  <span className="text-xs px-2 py-1 bg-[var(--color-primary-light)] text-[var(--color-primary)] rounded font-medium">
                    {article.category}
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-serif font-medium text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                  {article.title}
                </h3>

                <p className="mb-4 text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                  {article.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-[var(--text-tertiary)]">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 使用指南 */}
        <div className="bg-[var(--bg-secondary)] p-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="h-8 w-8 text-[var(--color-primary)]" />
            <h2 className="text-2xl font-serif font-medium text-[var(--text-primary)]">
              如何使用知识库
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center font-medium">
                1
              </div>
              <div>
                <h3 className="mb-2 font-medium text-[var(--text-primary)]">
                  系统学习
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  按照分类导航的顺序，从基础理论开始，逐步学习电路设计和测量技术。每个分类都有系统的知识体系。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center font-medium">
                2
              </div>
              <div>
                <h3 className="mb-2 font-medium text-[var(--text-primary)]">
                  随时查阅
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  使用搜索功能快速找到你需要的内容，或通过左侧导航栏快速跳转到相关知识点。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center font-medium">
                3
              </div>
              <div>
                <h3 className="mb-2 font-medium text-[var(--text-primary)]">
                  工具结合
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  知识库中的理论知识点与在线工具页面结合，可以边学边练，加深理解。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center font-medium">
                4
              </div>
              <div>
                <h3 className="mb-2 font-medium text-[var(--text-primary)]">
                  深度探索
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  每个知识点都包含详细的推导、案例和实践经验，帮助您深入理解射频工程的核心概念。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-serif font-semibold text-[var(--color-primary)] mb-1">
              12
            </div>
            <div className="text-sm text-[var(--text-secondary)]">
              知识点
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-serif font-semibold text-[var(--color-primary)] mb-1">
              3
            </div>
            <div className="text-sm text-[var(--text-secondary)]">
              主要分类
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-serif font-semibold text-[var(--color-primary)] mb-1">
              50+
            </div>
            <div className="text-sm text-[var(--text-secondary)]">
              公式推导
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-serif font-semibold text-[var(--color-primary)] mb-1">
              20+
            </div>
            <div className="text-sm text-[var(--text-secondary)]">
              实战案例
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
