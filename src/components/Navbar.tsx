'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SearchBar } from './SearchBar';

interface NavLink {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
  external?: boolean;
}

export function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navLinks: NavLink[] = [
    { label: 'Knowledge', href: '/knowledge' },
    { label: 'Publications', href: '/publications' },
    { label: 'Tools', href: '/tools' },
    {
      label: 'Resources',
      href: '/resources',
      dropdown: [
        { label: '射频微波讲堂', href: '/resources/classroom' },
        { label: '测试测量', href: '/resources/test' },
        { label: '仿真设计', href: '/resources/simulation' },
        { label: '芯片/电路', href: '/resources/circuit' },
        { label: '白皮书', href: '/resources/whitepaper' },
        { label: '教程', href: '/resources/tutorial' },
      ],
    },
    {
      label: 'Industry',
      href: '/industry',
      dropdown: [
        { label: '行业资讯', href: '/industry/news' },
        { label: '最新动态', href: '/industry/updates' },
        { label: '热门产品', href: '/industry/products' },
      ],
    },
    {
      label: 'Community',
      href: '/community',
      dropdown: [
        { label: '视频课程', href: '/community/videos' },
        { label: '讲座', href: '/community/seminars' },
        { label: '周刊订阅', href: '/community/newsletter' },
      ],
    },
    { label: 'GitHub', href: 'https://github.com/changrenyuan', external: true },
    { label: 'Contact', href: '/about#contact' },
  ];

  return (
    <nav className="bg-[var(--bg-secondary)]">
      <div className="main-container">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/" className="text-xl font-serif font-semibold text-[var(--text-primary)]">
              RF Research
            </Link>
            <p className="mt-0.5 text-xs text-[var(--text-tertiary)]">
              射频工程技术笔记
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {link.label}
                </Link>

                {link.dropdown && activeDropdown === link.label && (
                  <div className="absolute left-0 mt-2 z-50 bg-[var(--bg-secondary)] min-w-[180px] py-2">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
