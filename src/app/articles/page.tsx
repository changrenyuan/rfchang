'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['全部', '射频基础', '5G基站', '阻抗匹配', '高频电路'];

  // 模拟数据 - 实际应该从 API 获取
  const articles = [
    {
      id: 1,
      title: 'Smith Chart 阻抗匹配完全指南',
      excerpt: '手把手教你用史密斯圆图设计匹配网络，包含实战案例和调试技巧',
      category: '阻抗匹配',
      isPaid: false,
      price: 0,
      readTime: '15 分钟',
      createdAt: '2025-01-05'
    },
    {
      id: 2,
      title: '5G基站PA设计实战：从理论到调试',
      excerpt: '详解功率放大器的设计流程、关键参数、测试方法和常见问题解决',
      category: '5G基站',
      isPaid: true,
      price: 99,
      readTime: '30 分钟',
      createdAt: '2025-01-03'
    },
    {
      id: 3,
      title: '高频PCB设计中的10个常见误区',
      excerpt: '总结多年实战经验，避免踩坑，提升设计质量',
      category: '高频电路',
      isPaid: false,
      price: 0,
      readTime: '12 分钟',
      createdAt: '2025-01-02'
    },
    {
      id: 4,
      title: 'S参数测量与解析实战',
      excerpt: '如何正确测量和解析S参数，网络分析仪使用技巧',
      category: '射频基础',
      isPaid: false,
      price: 0,
      readTime: '20 分钟',
      createdAt: '2025-01-01'
    },
    {
      id: 5,
      title: '射频前端电路设计：滤波器选型与调试',
      excerpt: 'SAW、BAW、LC滤波器的选型原则和调试方法',
      category: '5G基站',
      isPaid: true,
      price: 79,
      readTime: '25 分钟',
      createdAt: '2024-12-30'
    },
    {
      id: 6,
      title: '阻抗匹配网络设计的5种方法',
      excerpt: '从L型到多级匹配，不同场景下的最优方案',
      category: '阻抗匹配',
      isPaid: true,
      price: 59,
      readTime: '18 分钟',
      createdAt: '2024-12-28'
    },
    {
      id: 7,
      title: '射频电路中的EMC设计与抑制',
      excerpt: 'EMC问题的产生机理和实用抑制方法',
      category: '高频电路',
      isPaid: false,
      price: 0,
      readTime: '22 分钟',
      createdAt: '2024-12-25'
    },
    {
      id: 8,
      title: '射频信号完整性分析：眼图与时序',
      excerpt: '如何通过眼图分析信号质量，优化时序参数',
      category: '射频基础',
      isPaid: false,
      price: 0,
      readTime: '16 分钟',
      createdAt: '2024-12-22'
    }
  ];

  const filteredArticles = articles.filter(article => {
    const categoryMatch = selectedCategory === '全部' || article.category === selectedCategory;
    const searchMatch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

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

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* 页面标题 */}
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">
            知识库
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            分享射频设计实战经验，助力工程师成长
          </p>
        </div>

        {/* 搜索和筛选 */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="搜索文章..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* 文章列表 */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredArticles.map(article => (
            <Link
              key={article.id}
              href={`/articles/${encodeURIComponent(article.title)}`}
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="mb-3 flex items-center justify-between">
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
              <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
                <span>{article.readTime} 阅读</span>
                <span>•</span>
                <span>{article.createdAt}</span>
              </div>
            </Link>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-slate-500 dark:text-slate-400">
              没有找到相关文章
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
