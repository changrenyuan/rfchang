'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { List } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TOCProps {
  className?: string;
}

export function TOC({ className = '' }: TOCProps) {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    const headingElements = Array.from(
      article.querySelectorAll('h1, h2, h3')
    ) as HTMLHeadingElement[];

    const items: TOCItem[] = headingElements.map((heading) => ({
      id: heading.id,
      text: heading.textContent || '',
      level: parseInt(heading.tagName[1]),
    }));

    setHeadings(items);

    // 生成锚点
    headingElements.forEach((heading) => {
      if (!heading.id) {
        heading.id = heading.textContent
          ?.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, '');
      }
    });
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector('article');
      if (!article) return;

      const headingElements = Array.from(
        article.querySelectorAll('h1, h2, h3')
      ) as HTMLHeadingElement[];

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const heading = headingElements[i];
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
          setActiveId(heading.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname, headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className={`w-64 hidden lg:block ${className}`}>
      <div className="sticky top-20 max-h-[calc(100vh-80px)] overflow-y-auto">
        <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-[var(--text-primary)]">
          <List className="h-4 w-4" />
          <span>目录</span>
        </div>

        <nav className="space-y-1">
          {headings.map((heading) => (
            <Link
              key={heading.id}
              href={`#${heading.id}`}
              className={`block px-3 py-2 text-sm transition-colors rounded ${
                activeId === heading.id
                  ? 'text-[var(--color-primary)] bg-[var(--color-primary-light)] font-medium'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
              }`}
              style={{
                paddingLeft: `${(heading.level - 1) * 12 + 12}px`,
              }}
            >
              {heading.text}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
