import Link from 'next/link';

export function Navbar() {
  const navLinks = [
    { label: 'Notes', href: '/notes' },
    { label: 'Publications', href: '/publications' },
    { label: 'Tools', href: '/tools' },
    { label: 'About', href: '/about' },
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
          <div className="flex items-center gap-8 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
