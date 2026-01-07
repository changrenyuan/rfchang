import Link from 'next/link';

export function QuickEngineeringTools() {
  const tools = [
    { name: 'Smith Chart', description: '阻抗匹配设计', href: '/tools#smith-chart' },
    { name: 'VSWR', description: '驻波比计算', href: '/tools#vswr-calculator' },
    { name: 'S Parameters', description: '散射参数分析', href: '/tools#s-parameter' },
    { name: 'Attenuator', description: '衰减器设计', href: '/tools#attenuator' },
    { name: 'Impedance', description: '串并联阻抗', href: '/tools#series-parallel' },
  ];

  return (
    <section className="border-t py-12">
      <div className="content-container">
        <div className="mb-6">
          <h2 className="text-lg font-serif font-light text-[var(--text-primary)]">
            Quick Engineering Tools
          </h2>
          <p className="mt-1 text-sm text-[var(--text-tertiary)]">
            常用 RF 工程计算工具
          </p>
        </div>

        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="bg-[var(--bg-secondary)] p-3 hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              <div className="mb-1 text-sm font-mono text-[var(--color-primary)]">
                {tool.name}
              </div>
              <div className="text-xs text-[var(--text-tertiary)]">
                {tool.description}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
