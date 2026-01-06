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
    { id: 'vswr', name: 'VSWR 计算器', description: '驻波比与反射系数转换', icon: '📊' },
    { id: 'attenuator', name: '衰减器设计', description: 'Π型/T型衰减器参数计算', icon: '🔧' },
    { id: 'series-parallel', name: '串并联等效', description: '阻抗串并联等效计算', icon: '⚡' },
    { id: 'dbm', name: 'dBm 计算', description: '功率、电压、dBm转换', icon: '📈' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* 导航栏 */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-xl font-bold text-white">
                RF
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                  射频工程师实战平台
                </h1>
              </div>
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/articles"
                className="text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
              >
                知识库
              </Link>
              <Link
                href="/tools"
                className="text-sm font-medium text-blue-600 dark:text-blue-400"
              >
                在线工具
              </Link>
              <Link
                href="/consultation"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                预约咨询
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* 页面标题 */}
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">
            射频计算工具
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            专业的射频工程计算工具，助力设计工作
          </p>
        </div>

        <div className="flex gap-8 lg:flex-row flex-col">
          {/* 工具选择侧边栏 */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="space-y-2">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`w-full rounded-lg p-4 text-left transition-all ${
                    selectedTool === tool.id
                      ? 'border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border border-slate-200 bg-white hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800'
                  }`}
                >
                  <div className="mb-1 text-2xl">{tool.icon}</div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {tool.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* 工具内容区 */}
          <div className="flex-1">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
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
