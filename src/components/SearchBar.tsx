'use client';

import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

export function SearchBar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={searchRef} className="relative">
      <button
        onClick={() => setShowSearch(!showSearch)}
        className="p-2 hover:bg-[var(--bg-tertiary)] rounded transition-colors"
      >
        <Search className="h-5 w-5 text-[var(--text-secondary)]" />
      </button>

      {showSearch && (
        <div className="absolute right-0 top-12 w-80 bg-[var(--bg-secondary)] py-2">
          <input
            type="text"
            placeholder="搜索文章内容..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className="w-full px-4 py-2 text-sm border-b border-[var(--border-color)] focus:outline-none"
          />

          {searchQuery && (
            <div className="max-h-96 overflow-y-auto">
              {isSearching ? (
                <div className="px-4 py-3 text-sm text-[var(--text-tertiary)]">
                  搜索中...
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((article) => (
                  <a
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className="block px-4 py-3 hover:bg-[var(--bg-tertiary)] transition-colors"
                    onClick={() => {
                      setShowSearch(false);
                      setSearchQuery('');
                    }}
                  >
                    <div className="text-sm font-medium text-[var(--text-primary)] mb-1">
                      {article.title}
                    </div>
                    <div className="text-xs text-[var(--text-tertiary)] mb-1">
                      {article.category} · {article.readTime}
                    </div>
                    <div className="text-xs text-[var(--text-secondary)] line-clamp-2">
                      {article.excerpt}
                    </div>
                  </a>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-[var(--text-tertiary)]">
                  未找到相关文章
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
