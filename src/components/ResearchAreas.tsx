import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ResearchArea } from '@/data';

interface ResearchAreasProps {
  areas: ResearchArea[];
}

export function ResearchAreas({ areas }: ResearchAreasProps) {
  return (
    <section className="py-16">
      <div className="main-container">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-serif font-light text-[var(--text-primary)]">
            Research Areas
          </h2>
          <Link
            href="/about"
            className="flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            查看详情
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {areas.map((area, index) => {
            const Icon = area.icon;
            return (
              <div
                key={index}
                className="bg-[var(--bg-secondary)] p-6 hover:border-[var(--border-color-dark)] transition-colors"
              >
                <div className="mb-4">
                  <Icon className="h-6 w-6 text-[var(--color-primary)]" />
                </div>

                <h3 className="mb-2 text-lg font-serif font-medium text-[var(--text-primary)]">
                  {area.title}
                </h3>

                <p className="mb-2 text-sm text-[var(--text-secondary)]">
                  {area.description}
                </p>

                <div className="mb-4 p-2 bg-[var(--bg-tertiary)]">
                  <div className="text-xs font-mono text-[var(--text-tertiary)] mb-1">
                    Engineering Note
                  </div>
                  <div className="text-xs text-[var(--text-primary)] leading-relaxed">
                    {area.engineeringNote}
                  </div>
                </div>

                <div className="mb-4 space-y-1">
                  {area.subItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-[var(--text-secondary)]"
                    >
                      <span className="text-[var(--color-primary)] mt-0.5">→</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-4 grid grid-cols-3 gap-2 text-xs">
                  {area.metrics.map((metric, i) => (
                    <div key={i} className="p-2">
                      <div className="font-mono text-[var(--color-primary)]">
                        {metric.value}
                      </div>
                      <div className="text-[var(--text-tertiary)]">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1">
                  {area.focus.map((item, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-industrial-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
