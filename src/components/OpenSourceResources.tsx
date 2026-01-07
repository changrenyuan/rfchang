import Link from 'next/link';
import { Code, Activity } from 'lucide-react';
import { OpenSourceResource } from '@/data';

interface OpenSourceResourcesProps {
  resources: OpenSourceResource[];
}

export function OpenSourceResources({ resources }: OpenSourceResourcesProps) {
  return (
    <section className="border-t py-16">
      <div className="main-container">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-serif font-light text-[var(--text-primary)]">
            Open Source Resources
          </h2>
          <Link
            href="https://github.com/changrenyuan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            GitHub
            <Activity className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--bg-secondary)] p-5 hover:border-[var(--border-color-dark)] transition-colors group"
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
  );
}
