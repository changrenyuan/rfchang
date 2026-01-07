import { Stat } from '@/data';

interface HeroSectionProps {
  stats: Stat[];
}

export function HeroSection({ stats }: HeroSectionProps) {
  return (
    <section className="py-16">
      <div className="content-container">
        <blockquote className="mb-8 text-3xl font-serif font-light leading-relaxed text-[var(--text-primary)]">
          "射频设计不仅是电路计算，更是对电磁波的深度理解与工程智慧的平衡。"
        </blockquote>

        <p className="mb-12 text-sm text-[var(--text-tertiary)] text-center">
          这里记录的是射频工程师在真实系统中如何思考、设计与验证。
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-[var(--bg-secondary)] p-4">
              <div className="text-2xl font-mono font-semibold text-[var(--color-primary)]">
                {stat.value}
                <span className="text-sm text-[var(--text-tertiary)] ml-1">
                  {stat.unit}
                </span>
              </div>
              <div className="mt-1 text-xs text-[var(--text-tertiary)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
