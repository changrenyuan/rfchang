import Link from 'next/link';

export function Footer() {
  const navLinks = [
    { label: 'Technical Notes', href: '/notes' },
    { label: 'Publications', href: '/publications' },
    { label: 'Tools', href: '/tools' },
    { label: '工程案例', href: '/cases' },
  ];

  const aboutLinks = [
    { label: 'Biography', href: '/about' },
    { label: 'Contact', href: '/about#contact' },
    { label: 'GitHub', href: 'https://github.com/changrenyuan', external: true },
  ];

  return (
    <footer className="border-t py-12">
      <div className="main-container">
        <div className="grid gap-8 md:grid-cols-4 mb-8">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="text-xl font-serif font-semibold text-[var(--text-primary)]"
            >
              RF Research
            </Link>
            <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
              专注射频电路设计、5G/6G 通信、高频电路工程实践。
              提供技术笔记、工程工具与研究资料，促进射频工程知识分享。
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
              导航
            </h4>
            <div className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
              关于
            </h4>
            <div className="space-y-2 text-sm">
              {aboutLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-xs text-[var(--text-tertiary)]">
          <p className="mb-2">© 2025 RF Research. All rights reserved.</p>
          <p>专注射频电路设计、5G/6G 通信、高频电路工程实践</p>
        </div>
      </div>
    </footer>
  );
}
