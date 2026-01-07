'use client';

import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export interface VersionEntry {
  version: string;
  date: string;
  type: 'major' | 'minor' | 'patch';
  status: 'completed' | 'in-progress' | 'planned';
  title: string;
  description: string;
  highlights?: string[];
  metrics?: Array<{ label: string; value: string }>;
}

interface ChangelogProps {
  entries: VersionEntry[];
}

export default function EngineeringChangelog({ entries }: ChangelogProps) {
  const typeColors = {
    major: 'border-[var(--color-primary)]',
    minor: 'border-[var(--text-secondary)]',
    patch: 'border-[var(--text-tertiary)]',
  };

  const typeLabels = {
    major: '重大更新',
    minor: '功能改进',
    patch: '问题修复',
  };

  const statusIcons = {
    completed: <CheckCircle2 className="h-4 w-4 text-green-600" />,
    'in-progress': <Clock className="h-4 w-4 text-amber-600" />,
    planned: <AlertCircle className="h-4 w-4 text-slate-400" />,
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-semibold text-[var(--text-primary)] mb-2">
          Engineering Changelog
        </h2>
        <p className="text-sm text-[var(--text-secondary)]">
          技术演进历程与里程碑记录
        </p>
      </div>

      <div className="relative">
        {/* 时间轴线 */}
        <div className="absolute left-[27px] top-0 bottom-0 w-px bg-[var(--border-color)]" />

        <div className="space-y-8">
          {entries.map((entry, index) => (
            <div key={index} className="relative pl-16">
              {/* 时间轴节点 */}
              <div
                className={`absolute left-4 top-0 h-5 w-5 rounded-full border-4 bg-[var(--bg-primary)] ${typeColors[entry.type]}`}
              />

              {/* 版本信息 */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-[var(--color-primary)]">
                    {entry.version}
                  </span>
                  <span className={`px-2 py-0.5 text-xs rounded-industrial-sm border-thin ${typeColors[entry.type]}`}>
                    {typeLabels[entry.type]}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
                    {statusIcons[entry.status]}
                  </div>
                </div>
                <span className="text-xs font-mono text-[var(--text-tertiary)]">
                  {entry.date}
                </span>
              </div>

              {/* 标题和描述 */}
              <h3 className="text-lg font-serif font-medium text-[var(--text-primary)] mb-2">
                {entry.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
                {entry.description}
              </p>

              {/* 关键成果 */}
              {entry.highlights && entry.highlights.length > 0 && (
                <div className="mb-4">
                  <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                    {entry.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 指标数据 */}
              {entry.metrics && entry.metrics.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {entry.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="border-thin bg-[var(--bg-secondary)] px-3 py-2 rounded-industrial-sm"
                    >
                      <div className="text-xs text-[var(--text-tertiary)]">{metric.label}</div>
                      <div className="text-sm font-mono font-semibold text-[var(--color-primary)]">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
