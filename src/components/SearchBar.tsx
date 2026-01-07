'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, FileText } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function SearchBar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSearch(false);
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  return (
    <div ref={searchRef} className="relative">
      <button
        onClick={() => setShowSearch(!showSearch)}
        className="p-2 hover:bg-[var(--bg-tertiary)] rounded transition-colors"
        aria-label="搜索"
      >
        <Search className="h-5 w-5 text-[var(--text-secondary)]" />
      </button>

      {showSearch && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setShowSearch(false)}>
          <div
            className="absolute right-0 top-16 w-full max-w-2xl bg-[var(--bg-secondary)] shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 搜索输入框 */}
            <div className="sticky top-0 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-tertiary)]" />
                <input
                  type="text"
                  placeholder="搜索文章标题、内容..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                />
              </div>
              <div className="mt-2 text-xs text-[var(--text-tertiary)]">
                按 <kbd className="px-1.5 py-0.5 bg-[var(--bg-primary)] rounded">ESC</kbd> 关闭搜索
              </div>
            </div>

            {/* 搜索结果 */}
            <div className="max-h-[60vh] overflow-y-auto">
              {isSearching ? (
                <div className="flex items-center justify-center py-12 text-[var(--text-tertiary)]">
                  搜索中...
                </div>
              ) : searchResults.length > 0 ? (
                <div className="divide-y divide-[var(--border-color)]">
                  {searchResults.map((article) => (
                    <Link
                      key={article.id}
                      href={article.path}
                      className="block px-6 py-4 hover:bg-[var(--bg-tertiary)] transition-colors"
                      onClick={() => {
                        setShowSearch(false);
                        setSearchQuery('');
                        setSearchResults([]);
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <FileText className="h-5 w-5 text-[var(--text-tertiary)]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-[var(--text-primary)] mb-1">
                            {article.title}
                          </div>
                          <div className="flex items-center gap-2 mb-2 text-xs text-[var(--text-tertiary)]">
                            <span className="px-2 py-0.5 bg-[var(--color-primary-light)] text-[var(--color-primary)] rounded">
                              {article.category}
                            </span>
                            {article.readTime && <span>· {article.readTime}</span>}
                          </div>
                          {article.excerpt && (
                            <div className="text-xs text-[var(--text-secondary)] line-clamp-2">
                              {article.excerpt}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="flex flex-col items-center justify-center py-12 text-[var(--text-tertiary)]">
                  <Search className="h-12 w-12 mb-4 text-[var(--text-tertiary)] opacity-50" />
                  <p>未找到相关文章</p>
                  <p className="text-sm mt-2">试试其他关键词</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-[var(--text-tertiary)]">
                  <Search className="h-12 w-12 mb-4 text-[var(--text-tertiary)] opacity-50" />
                  <p>输入关键词开始搜索</p>
                  <p className="text-sm mt-2">支持搜索文章标题和内容</p>
                </div>
              )}
            </div>

            {/* 搜索统计 */}
            {searchResults.length > 0 && (
              <div className="sticky bottom-0 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] px-6 py-3 text-xs text-[var(--text-tertiary)]">
                找到 {searchResults.length} 篇文章
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
