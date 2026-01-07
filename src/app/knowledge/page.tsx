import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';

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
      topics: ['传输线理论', '史密斯圆图', '阻抗匹配网络', 'S参数基础'],
      href: '/knowledge/fundamentals/transmission-line',
    },
    {
      title: '电路设计',
      description: '射频电路设计实战，包括功率放大器、低噪声放大器、滤波器等',
      icon: '⚡',
      topics: ['功率放大器设计', '低噪声放大器设计', '滤波器设计', '混频器设计'],
      href: '/knowledge/circuit-design/pa-design',
    },
    {
      title: '测量技术',
      description: '射频测量工具使用指南，包括VNA、频谱仪、功率计等',
      icon: '📊',
      topics: ['VNA使用指南', '频谱仪应用', '功率测量', '噪声系数测量'],
      href: '/knowledge/measurement/vna-usage',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="content-container py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-semibold text-[var(--text-primary)] mb-4">
            知识库
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">
            射频工程核心知识，从基础理论到实战应用
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="bg-[var(--bg-secondary)] p-6 hover:border-[var(--border-color-dark)] transition-colors"
            >
              <div className="mb-4 text-4xl">{category.icon}</div>
              <h2 className="mb-2 text-xl font-serif font-medium text-[var(--text-primary)]">
                {category.title}
              </h2>
              <p className="mb-4 text-sm text-[var(--text-secondary)]">
                {category.description}
              </p>
              <div className="space-y-2">
                {category.topics.map((topic) => (
                  <div key={topic} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <ArrowRight className="h-4 w-4" />
                    {topic}
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-[var(--bg-secondary)] p-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-[var(--color-primary)]" />
            <h2 className="text-2xl font-serif font-medium text-[var(--text-primary)]">
              如何使用知识库
            </h2>
          </div>
          <div className="space-y-4 text-[var(--text-secondary)]">
            <p>
              <strong className="text-[var(--text-primary)]">1. 系统学习：</strong>
              按照左侧导航栏的顺序，从基础理论开始，逐步学习电路设计和测量技术。
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">2. 随时查阅：</strong>
              在左侧导航栏中快速找到你需要的内容，点击即可跳转。
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">3. 工具结合：</strong>
              知识库中的理论知识点与右侧工具页面结合，边学边练。
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">4. 深度探索：</strong>
              每个知识点都包含详细的推导、案例和实践经验。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
