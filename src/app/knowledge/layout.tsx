'use client';

import { Sidebar } from '@/components/Sidebar';
import { TOC } from '@/components/TOC';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function KnowledgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* 移动端 Sidebar 切换按钮 */}
      <div className="lg:hidden fixed top-20 left-4 z-40">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded shadow-sm"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* 移动端 Sidebar 遮罩 */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 移动端 Sidebar */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-40 w-64 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] transition-transform transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar className="h-full overflow-y-auto" />
      </div>

      {/* 桌面端三栏布局 */}
      <div className="hidden lg:flex">
        <Sidebar className="sticky top-16 h-screen border-r border-[var(--border-color)]" />
        <main className="flex-1 min-w-0 border-r border-[var(--border-color)]">
          <div className="max-w-4xl mx-auto px-8 py-12">
            {children}
          </div>
        </main>
        <TOC className="border-r border-[var(--border-color)]" />
      </div>

      {/* 移动端单栏布局 */}
      <div className="lg:hidden">
        <main className="flex-1 min-w-0 px-4 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
