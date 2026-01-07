'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

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

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className = '' }: SidebarProps) {
  const pathname = usePathname();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['fundamentals']));

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const sidebarData: SidebarCategory[] = [
    {
      title: '基础理论',
      items: [
        { id: 'transmission-line', title: '传输线理论', slug: '/knowledge/fundamentals/transmission-line', description: '特性阻抗、反射系数、驻波比' },
        { id: 'smith-chart', title: '史密斯圆图', slug: '/knowledge/fundamentals/smith-chart', description: '阻抗匹配的可视化方法' },
        { id: 'impedance-matching', title: '阻抗匹配网络', slug: '/knowledge/fundamentals/impedance-matching', description: 'L型、T型、π型匹配网络' },
        { id: 's-parameters', title: 'S参数基础', slug: '/knowledge/fundamentals/s-parameters', description: '射频网络分析的核心工具' },
      ],
    },
    {
      title: '电路设计',
      items: [
        { id: 'pa-design', title: '功率放大器设计', slug: '/knowledge/circuit-design/pa-design', description: 'PA的效率、线性度与稳定性' },
        { id: 'lna-design', title: '低噪声放大器设计', slug: '/knowledge/circuit-design/lna-design', description: '噪声系数、增益与稳定性' },
        { id: 'filter-design', title: '滤波器设计', slug: '/knowledge/circuit-design/filter-design', description: '从LC到微带滤波器' },
        { id: 'mixer-design', title: '混频器设计', slug: '/knowledge/circuit-design/mixer-design', description: '变频损耗、隔离度与杂散' },
      ],
    },
    {
      title: '测量技术',
      items: [
        { id: 'vna-usage', title: 'VNA使用指南', slug: '/knowledge/measurement/vna-usage', description: '矢量网络分析仪的校准与测量' },
        { id: 'spectrum-analyzer', title: '频谱仪应用', slug: '/knowledge/measurement/spectrum-analyzer', description: '频谱分析、相位噪声与杂散' },
        { id: 'power-measurement', title: '功率测量', slug: '/knowledge/measurement/power-measurement', description: '功率计使用、峰值与平均功率' },
        { id: 'noise-measurement', title: '噪声系数测量', slug: '/knowledge/measurement/noise-measurement', description: 'Y因子法与冷源法' },
      ],
    },
  ];

  return (
    <aside className={`w-64 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] overflow-y-auto ${className}`}>
      <div className="p-4">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4 uppercase tracking-wide">
          知识库
        </h2>

        <nav className="space-y-1">
          {sidebarData.map((category) => {
            const isExpanded = expandedCategories.has(category.title);
            return (
              <div key={category.title}>
                <button
                  onClick={() => toggleCategory(category.title)}
                  className="w-full flex items-center justify-between px-2 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors rounded"
                >
                  {category.title}
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-[var(--text-tertiary)]" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-[var(--text-tertiary)]" />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-1 space-y-0.5">
                    {category.items.map((item) => {
                      const isActive = pathname === item.slug;
                      return (
                        <Link
                          key={item.id}
                          href={item.slug}
                          className={`block px-4 py-2 text-sm rounded transition-colors ${
                            isActive
                              ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] font-medium'
                              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
                          }`}
                        >
                          <div className="mb-0.5">{item.title}</div>
                          <div className="text-xs text-[var(--text-tertiary)] font-normal">
                            {item.description}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
