'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import sidebarData from '@/data/sidebar.json';

interface DocNavigationProps {
  currentPath: string;
}

interface SidebarItem {
  id: string;
  title: string;
  slug: string;
  description: string;
}

interface SidebarCategory {
  title: string;
  items: SidebarItem[];
}

export function DocNavigation({ currentPath }: DocNavigationProps) {
  // 将所有文章展平成数组
  const allArticles: { item: SidebarItem; category: string }[] = [];

  Object.entries(sidebarData).forEach(([key, category]) => {
    const cat = category as unknown as SidebarCategory;
    cat.items.forEach((item) => {
      allArticles.push({
        item,
        category: cat.title,
      });
    });
  });

  // 找到当前文章的索引
  const currentIndex = allArticles.findIndex(
    ({ item }) => item.slug === `/knowledge/${currentPath}`
  );

  const prev = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const next = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  return (
    <nav className="mt-12 pt-8 border-t border-[var(--border-color)]">
      <div className="flex justify-between items-start gap-4">
        {prev && (
          <Link
            href={`/knowledge/${prev.item.slug.replace('/knowledge/', '')}`}
            className="flex-1 p-4 bg-[var(--bg-secondary)] rounded hover:border-[var(--border-color-dark)] transition-colors"
          >
            <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)] mb-2">
              <ArrowLeft className="h-3 w-3" />
              <span>上一篇</span>
            </div>
            <div className="text-sm font-medium text-[var(--text-primary)] mb-1">
              {prev.item.title}
            </div>
            <div className="text-xs text-[var(--text-tertiary)]">
              {prev.category}
            </div>
          </Link>
        )}

        {next && (
          <Link
            href={`/knowledge/${next.item.slug.replace('/knowledge/', '')}`}
            className="flex-1 p-4 bg-[var(--bg-secondary)] rounded hover:border-[var(--border-color-dark)] transition-colors text-right"
          >
            <div className="flex items-center justify-end gap-2 text-xs text-[var(--text-tertiary)] mb-2">
              <span>下一篇</span>
              <ArrowRight className="h-3 w-3" />
            </div>
            <div className="text-sm font-medium text-[var(--text-primary)] mb-1">
              {next.item.title}
            </div>
            <div className="text-xs text-[var(--text-tertiary)]">
              {next.category}
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}
