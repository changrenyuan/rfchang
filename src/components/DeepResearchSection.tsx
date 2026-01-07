import Link from 'next/link';
import { FileText, ArrowRight } from 'lucide-react';

export function DeepResearchSection() {
  const features = [
    { label: 'Mathematical Derivation', title: '完整的公式推导过程' },
    { label: 'Experimental Data', title: '实测数据与仿真对比' },
    { label: 'Code Implementation', title: '完整的代码实现' },
    { label: 'Reference', title: '完整的参考文献' },
  ];

  return (
    <section className="border-t py-16">
      <div className="content-container">
        <div className="bg-[var(--bg-secondary)] p-8">
          <div className="mb-6 flex justify-center">
            <FileText className="h-12 w-12 text-[var(--color-primary)]" />
          </div>

          <h2 className="mb-4 text-2xl font-serif font-light text-center text-[var(--text-primary)]">
            深度研究资料
          </h2>

          <p className="mb-6 text-center text-sm text-[var(--text-secondary)] leading-relaxed">
            研究笔记与核心案例的完整版本，包含详细的数学推导、实验数据与代码实现，
            仅供深度学习者研读。
          </p>

          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            {features.map((feature, index) => (
              <div key={index} className="p-4">
                <div className="mb-2 text-xs font-mono text-[var(--text-tertiary)]">
                  {feature.label}
                </div>
                <div className="text-sm text-[var(--text-primary)]">
                  {feature.title}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/insights"
              className="btn-industrial btn-primary"
            >
              查看研究资料
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
