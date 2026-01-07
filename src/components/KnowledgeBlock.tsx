import { ReactNode } from 'react';

interface KnowledgeBlockProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

/**
 * 知识积木块 - 像工程手稿一样的极简容器
 */
export default function KnowledgeBlock({ title, subtitle, children }: KnowledgeBlockProps) {
  return (
    <section className="border-t border-dashed" style={{ borderColor: '#E5E5E5', padding: 'var(--space-8) 0' }}>
      <div className="flex items-baseline gap-4 mb-6">
        <h2
          className="font-serif font-medium"
          style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}
        >
          {title}
        </h2>
        <span
          className="font-mono italic"
          style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}
        >
          {subtitle}
        </span>
      </div>
      <div className="content-area">
        {children}
      </div>
    </section>
  );
}
