'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="hidden xl:block sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto">
      <div className="border-l border-thin pl-6">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
          On this page
        </h3>
        <ul className="space-y-3">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ marginLeft: `${(heading.level - 2) * 12}px` }}
            >
              <Link
                href={`#${heading.id}`}
                className={`text-sm transition-colors
                  ${activeId === heading.id
                    ? 'text-[var(--color-primary)] font-medium'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }
                `}
              >
                {heading.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
