'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, Book, CircuitBoard, Activity, Wrench, FileText } from 'lucide-react';
import { useState } from 'react';

/**
 * 技术树结构定义
 * 模仿学术文献的分类层级
 */
const techTree = [
  {
    id: 'fundamentals',
    title: '射频基础',
    icon: Book,
    items: [
      { title: 'S 参数理论', href: '/notes/s-parameters' },
      { title: '史密斯圆图', href: '/notes/smith-chart' },
      { title: '阻抗匹配', href: '/notes/impedance-matching' },
      { title: '传输线理论', href: '/notes/transmission-lines' },
    ],
  },
  {
    id: 'pa-design',
    title: '功率放大器',
    icon: Activity,
    items: [
      { title: 'PA 基础', href: '/notes/pa-fundamentals' },
      { title: '线性化技术', href: '/notes/linearization' },
      { title: '数字预失真', href: '/notes/dpd' },
      { title: '回退与效率', href: '/notes/pa-efficiency' },
    ],
  },
  {
    id: 'filters',
    title: '滤波器设计',
    icon: CircuitBoard,
    items: [
      { title: '滤波器基础', href: '/notes/filters-fundamentals' },
      { title: 'LC 滤波器', href: '/notes/lc-filters' },
      { title: 'SAW/BAW 滤波器', href: '/notes/saw-filters' },
      { title: '滤波器组', href: '/notes/filter-banks' },
    ],
  },
  {
    id: 'advanced',
    title: '高级线性化',
    icon: FileText,
    items: [
      { title: 'DPD 深度研究', href: '/notes/dpd-deep-dive' },
      { title: '反馈技术', href: '/notes/feedback' },
      { title: '包络跟踪', href: '/notes/envelope-tracking' },
      { title: '非线性建模', href: '/notes/nonlinear-modeling' },
    ],
  },
  {
    id: 'tools',
    title: '工程工具',
    icon: Wrench,
    items: [
      { title: 'VSWR 计算器', href: '/tools/vswr-calculator' },
      { title: '衰减计算器', href: '/tools/attenuator-calculator' },
      { title: 'dBm 计算器', href: '/tools/dbm-calculator' },
      { title: 'S 参数可视化', href: '/tools/s-parameter-plotter' },
    ],
  },
];

interface NavItemProps {
  title: string;
  items: Array<{ title: string; href: string }>;
  isExpanded: boolean;
  onToggle: () => void;
  pathname: string;
}

function NavItem({ title, items, isExpanded, onToggle, pathname }: NavItemProps) {
  const isActive = items.some(item => pathname === item.href);

  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium transition-colors
          ${isActive ? 'text-[var(--color-primary)] bg-[var(--color-primary-light)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'}
        `}
      >
        <span className="flex items-center gap-2">
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          <span>{title}</span>
        </span>
      </button>

      {isExpanded && (
        <div className="ml-4 mt-1">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`block px-3 py-1.5 text-sm transition-colors
                ${pathname === item.href
                  ? 'text-[var(--color-primary)] font-medium border-l-2 border-[var(--color-primary)] bg-[var(--color-primary-light)]'
                  : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'}
              `}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TechTreeNav() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['fundamentals', 'pa-design']));

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <nav className="sticky top-0 h-screen overflow-y-auto border-r border-thin bg-[var(--bg-secondary)]">
      <div className="px-4 py-6">
        <div className="mb-6">
          <Link
            href="/"
            className="text-xl font-serif font-semibold text-[var(--text-primary)]"
          >
            RF Research
          </Link>
          <p className="mt-1 text-xs text-[var(--text-tertiary)]">
            射频工程技术笔记
          </p>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
            技术导航
          </h2>

          {techTree.map(section => (
            <NavItem
              key={section.id}
              title={section.title}
              items={section.items}
              isExpanded={expandedSections.has(section.id)}
              onToggle={() => toggleSection(section.id)}
              pathname={pathname}
            />
          ))}
        </div>

        <div className="border-t border-thin pt-6">
          <h2 className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
            资源
          </h2>
          <div className="space-y-1">
            <Link
              href="/publications"
              className="block px-3 py-1.5 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
            >
              Publications
            </Link>
            <Link
              href="/cases"
              className="block px-3 py-1.5 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
            >
              工程案例
            </Link>
            <Link
              href="/about"
              className="block px-3 py-1.5 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
