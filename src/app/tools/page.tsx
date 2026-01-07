'use client';

import { useState } from 'react';
import Link from 'next/link';
import VSWRCalculator from './components/VSWRCalculator';
import AttenuatorCalculator from './components/AttenuatorCalculator';
import SeriesParallelCalculator from './components/SeriesParallelCalculator';
import DBMCalculator from './components/DBMCalculator';

export default function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState<string>('vswr');

  const tools = [
    { id: 'vswr', name: 'VSWR Calculator', description: '驻波比与反射系数转换' },
    { id: 'attenuator', name: 'Attenuator Design', description: 'Π型/T型衰减器参数计算' },
    { id: 'series-parallel', name: 'Series/Parallel Impedance', description: '阻抗串并联等效计算' },
    { id: 'dbm', name: 'dBm Calculator', description: '功率、电压、dBm转换' },
  ];

  return (
    <div className="min-h-screen">
      {/* 导航栏 */}
      <nav className="border-b bg-[var(--bg-secondary)]">
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
              <Link
                href="/notes"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                Notes
              </Link>
              <Link
                href="/tools"
                className="text-[var(--color-primary)] hover:text-[var(--text-primary)] transition-colors"
              >
                Tools
              </Link>
              <Link
                href="/about"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="main-container" style={{ padding: 'var(--space-16) var(--space-8)' }}>
        {/* 页面标题 */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <h2
            className="font-semibold"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2rem',
              marginBottom: 'var(--space-2)',
              color: 'var(--text-primary)',
            }}
          >
            RF Calculation Tools
          </h2>
          <p
            className="text-sm"
            style={{
              fontFamily: 'var(--font-sans)',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
            }}
          >
            射频工程计算工具集，基于 IEEE 标准实现
          </p>
        </div>

        <div className="flex gap-8 lg:flex-row flex-col">
          {/* 工具选择侧边栏 */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="card-container">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className="card-item"
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    cursor: 'pointer',
                    borderColor: selectedTool === tool.id ? 'var(--color-primary)' : undefined,
                  }}
                >
                  <h3
                    className="text-sm font-semibold"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      color: 'var(--text-primary)',
                      marginBottom: 'var(--space-1)',
                    }}
                  >
                    {tool.name}
                  </h3>
                  <p
                    className="text-xs"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {tool.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* 工具内容区 */}
          <div className="flex-1">
            <div
              className=""
              style={{
                backgroundColor: 'var(--bg-secondary)',
                padding: 'var(--space-8)',
              }}
            >
              {selectedTool === 'vswr' && <VSWRCalculator />}
              {selectedTool === 'attenuator' && <AttenuatorCalculator />}
              {selectedTool === 'series-parallel' && <SeriesParallelCalculator />}
              {selectedTool === 'dbm' && <DBMCalculator />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
