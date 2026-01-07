import Link from 'next/link';
import { BookOpen, Code, FileText, User, ArrowRight, Activity, TrendingUp, Shield } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { S21CurveDecoration } from '@/components/S21CurveDecoration';

export const metadata = {
  title: `${siteConfig.name} | RF Engineering Lab`,
  description: siteConfig.description,
  keywords: siteConfig.seo.keywords,
  openGraph: {
    ...siteConfig.seo.openGraph,
    title: `${siteConfig.name} | RF Engineering Lab`,
    description: siteConfig.description,
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": siteConfig.author,
            "jobTitle": "射频工程专家",
            "description": siteConfig.description,
            "url": siteConfig.url,
            "sameAs": [siteConfig.social.github],
            "knowsAbout": siteConfig.knowsAbout,
            "worksFor": {
              "@type": "Organization",
              "name": siteConfig.name
            }
          })
        }}
      />

      {/* 导航栏 - 毛玻璃效果 + 半透明背景 */}
      <nav className="sticky top-0 z-50 border-b-thin backdrop-blur-md bg-white/80">
        <div className="main-container">
          <div className="flex items-center justify-between" style={{ padding: 'var(--space-4) 0' }}>
            <div>
              <Link href="/" className="text-xl font-serif font-semibold text-[var(--text-primary)]">
                RF Research
              </Link>
              <p className="mt-0.5 text-xs text-[var(--text-tertiary)]">
                射频工程技术笔记
              </p>
            </div>
            <div className="flex items-center gap-8 text-sm">
              {Object.entries(siteConfig.navigation).slice(1).map(([key, path]) => (
                <Link
                  key={key}
                  href={path}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero 区域 - 学术格言与统计数据 */}
      <section className="border-b-thin" style={{ padding: 'var(--space-20) 0' }}>
        <div className="content-container">
          <blockquote className="quote-block mb-12 text-center">
            {siteConfig.home.hero.title}
          </blockquote>

          <p className="mb-8 text-center text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
            {siteConfig.home.hero.subtitle}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: '技术札记', value: '42', unit: '篇' },
              { label: '开源项目', value: '8', unit: '个' },
              { label: '学术论文', value: '12', unit: '篇' },
              { label: '工程案例', value: '25', unit: '个' },
            ].map((stat, index) => (
              <div
                key={index}
                className="border-thin bg-[var(--bg-secondary)] p-4"
              >
                <div className="text-2xl font-mono font-semibold text-[var(--color-primary)]">
                  {stat.value}
                  <span className="text-sm text-[var(--text-tertiary)] ml-1">{stat.unit}</span>
                </div>
                <div className="mt-1 text-xs text-[var(--text-tertiary)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <Link
              href={siteConfig.home.hero.cta.primary.href}
              className="btn-industrial btn-primary"
            >
              {siteConfig.home.hero.cta.primary.label}
            </Link>
            <Link
              href={siteConfig.home.hero.cta.secondary.href}
              className="btn-industrial"
            >
              {siteConfig.home.hero.cta.secondary.label}
            </Link>
          </div>
        </div>
      </section>

      {/* 研究方向 - 底线对齐，无四周边框 */}
      <section style={{ padding: 'var(--space-20) 0' }}>
        <div className="main-container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-serif font-light text-[var(--text-primary)]">
              {siteConfig.home.research.title}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {siteConfig.home.research.items.map((area, index) => {
              const icons = [Activity, TrendingUp, Shield, BookOpen];
              const Icon = icons[index];
              return (
                <div
                  key={index}
                  className="border-b-2 bg-[var(--bg-secondary)] p-6"
                  style={{ borderColor: 'var(--color-primary)' }}
                >
                  <div className="mb-4 text-3xl">{area.icon}</div>

                  <h3 className="mb-2 text-lg font-serif font-medium text-[var(--text-primary)]">
                    {area.title}
                  </h3>

                  <p className="mb-4 text-sm text-[var(--text-secondary)]">
                    {area.description}
                  </p>

                  {/* 指标数据 - 底线对齐 */}
                  <div className="mb-4 grid grid-cols-2 gap-2 text-xs border-b-thin pb-4">
                    {Object.entries(area.metrics).map(([key, value], i) => (
                      <div key={i}>
                        <div className="font-mono text-[var(--color-primary)]">{value}</div>
                        <div className="text-[var(--text-tertiary)]">{key === 'years' ? '经验' : '项目'}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {['高频电路', '阻抗匹配', 'S参数'].slice(0, 3).map((item, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-industrial-sm font-mono"
                        style={{
                          backgroundColor: 'var(--color-primary-light)',
                          color: 'var(--color-primary)'
                        }}
                      >
                        #{item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 工程案例 - 集成 S21 曲线装饰 */}
      <section className="border-t-thin" style={{ padding: 'var(--space-20) 0' }}>
        <div className="main-container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-serif font-light text-[var(--text-primary)]">
              {siteConfig.home.projects.title}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {siteConfig.home.projects.items.map((project, index) => (
              <Link
                key={index}
                href="#"
                className="relative group border-thin bg-[var(--bg-secondary)] p-6 hover:border-[var(--border-color-dark)] transition-colors overflow-hidden"
              >
                {/* S21 曲线装饰背景 */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                  <S21CurveDecoration />
                </div>

                {/* 内容层级 */}
                <div className="relative z-10">
                  <div className="mb-3 flex items-center justify-between">
                    <span
                      className="px-2 py-1 text-xs font-mono rounded-industrial-sm"
                      style={{
                        backgroundColor: 'var(--color-primary-light)',
                        color: 'var(--color-primary)'
                      }}
                    >
                      #{project.category}
                    </span>
                    <Activity className="h-4 w-4 text-[var(--color-primary)]" />
                  </div>

                  <h3 className="mb-2 text-lg font-serif font-medium text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 技术标签 - 淡蓝色背景 */}
      <section className="border-t-thin" style={{ padding: 'var(--space-20) 0' }}>
        <div className="content-container">
          <h2 className="mb-8 text-2xl font-serif font-light text-[var(--text-primary)]">
            Technical Focus
          </h2>

          <div className="flex flex-wrap gap-2">
            {siteConfig.home.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 text-sm font-mono rounded-industrial-sm"
                style={{
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 开源资源 */}
      <section className="border-t-thin" style={{ padding: 'var(--space-20) 0' }}>
        <div className="main-container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-serif font-light text-[var(--text-primary)]">
              Open Source
            </h2>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              GitHub
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'rf-calculator',
                description: 'Python 射频参数计算工具包',
                language: 'Python',
                type: 'Library',
                stars: 234
              },
              {
                name: 's-parameter-plotter',
                description: 'Web-based S 参数可视化工具',
                language: 'TypeScript',
                type: 'Web Tool',
                stars: 189
              },
              {
                name: 'impedance-matcher',
                description: 'Matlab 阻抗匹配网络自动设计',
                language: 'Matlab',
                type: 'Tool',
                stars: 156
              }
            ].map((resource, index) => (
              <a
                key={index}
                href={`${siteConfig.social.github}/${resource.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border-thin bg-[var(--bg-secondary)] p-5 hover:border-[var(--border-color-dark)] transition-colors group"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-[var(--color-primary)]" />
                    <span className="text-xs font-mono text-[var(--text-tertiary)]">
                      {resource.language}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[var(--text-tertiary)]">
                    {resource.type}
                  </span>
                </div>

                <h3 className="mb-2 text-base font-serif font-medium text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                  {resource.name}
                </h3>

                <p className="mb-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
                    <Activity className="h-3 w-3" />
                    <span className="font-mono">{resource.stars}</span>
                  </div>
                  <div className="text-xs text-[var(--color-primary)]">
                    View →
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t-thin" style={{ padding: 'var(--space-16) 0' }}>
        <div className="main-container">
          <div className="grid gap-8 md:grid-cols-4 mb-8">
            <div className="md:col-span-2">
              <Link
                href="/"
                className="text-xl font-serif font-semibold text-[var(--text-primary)]"
              >
                {siteConfig.name}
              </Link>
              <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                {siteConfig.description}
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
                导航
              </h4>
              <div className="space-y-2 text-sm">
                {Object.entries(siteConfig.navigation).map(([key, path]) => (
                  <Link key={key} href={path} className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
                联系
              </h4>
              <div className="space-y-2 text-sm">
                <a href={siteConfig.social.github} className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  GitHub
                </a>
                <a href={`mailto:${siteConfig.social.email}`} className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Email
                </a>
              </div>
            </div>
          </div>

          <div className="border-t-thin pt-8 text-center text-xs text-[var(--text-tertiary)]">
            © 2025 {siteConfig.author}. 专注射频工程实践.
          </div>
        </div>
      </footer>
    </div>
  );
}
