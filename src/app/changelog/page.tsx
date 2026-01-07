import EngineeringChangelog, { VersionEntry } from '@/components/EngineeringChangelog';

export const metadata = {
  title: 'Engineering Changelog | RF Research',
  description: '射频工程技术演进历程与里程碑记录',
};

const changelogEntries: VersionEntry[] = [
  {
    version: 'v2.5.0',
    date: '2025-01',
    type: 'major',
    status: 'completed',
    title: '毫米波 PA 线性化平台 2.0',
    description: '基于深度学习的数字预失真 (DPD) 系统，支持 28 GHz 频段大规模 MIMO 场景，实现 EVM 降低至 1.5%',
    highlights: [
      '深度学习 DPD 模型，支持实时训练',
      '多频段自适应线性化算法',
      'FPGA 硬件加速，延迟 < 1 ms',
      '自动化测试平台，覆盖率 95%',
    ],
    metrics: [
      { label: 'EVM 改善', value: '-15 dB' },
      { label: 'ACPR 提升', value: '10 dB' },
      { label: '效率', value: '> 45%' },
    ],
  },
  {
    version: 'v2.4.0',
    date: '2024-10',
    type: 'major',
    status: 'completed',
    title: '史密斯圆图智能匹配工具',
    description: '集成遗传算法的阻抗匹配网络自动设计工具，支持多级匹配网络优化与 parasitic 参数补偿',
    highlights: [
      '遗传算法优化，支持 L/T/π 型匹配',
      '自动 parasitic 提取与补偿',
      '实时仿真结果反馈',
      '导出 Spice 网表',
    ],
    metrics: [
      { label: '设计时间', value: '< 5 min' },
      { label: '匹配带宽', value: '+30%' },
      { label: '成功率', value: '92%' },
    ],
  },
  {
    version: 'v2.3.0',
    date: '2024-08',
    type: 'minor',
    status: 'completed',
    title: 'S 参数分析工具增强',
    description: '新增 Touchstone 文件批量处理、史密斯圆图叠加显示、自动质量评估功能',
    highlights: [
      '支持 .s2p/.s4p 文件批量导入',
      '史密斯圆图多频点轨迹显示',
      '自动评估匹配质量与带宽',
      '导出 PDF 报告',
    ],
    metrics: [
      { label: '文件支持', value: '.s1p - .s4p' },
      { label: '处理速度', value: '> 100 files/s' },
      { label: '报告导出', value: 'PDF/CSV' },
    ],
  },
  {
    version: 'v2.2.0',
    date: '2024-06',
    type: 'minor',
    status: 'completed',
    title: 'Wi-Fi 7 射频前端方案验证',
    description: '完成 320 MHz 带宽、4096-QAM 调制的射频前端验证，支持 6 GHz 频段',
    highlights: [
      '320 MHz 带宽验证',
      '4096-QAM EVM < 1%',
      '低噪声放大器优化',
      '滤波器集成方案',
    ],
    metrics: [
      { label: '带宽', value: '320 MHz' },
      { label: 'EVM', value: '0.8%' },
      { label: 'NF', value: '< 2.5 dB' },
    ],
  },
  {
    version: 'v2.1.0',
    date: '2024-03',
    type: 'major',
    status: 'completed',
    title: '5G PA 包络跟踪系统',
    description: '针对 3.5 GHz 频段的高效包络跟踪系统，实现效率提升 10% 同时保持线性度',
    highlights: [
      '包络跟踪放大器设计',
      '自适应包络信号生成',
      '实时效率监控',
      '预失真补偿',
    ],
    metrics: [
      { label: '效率提升', value: '+10%' },
      { label: '线性度', value: '保持' },
      { label: '延迟', value: '< 50 ns' },
    ],
  },
  {
    version: 'v2.0.0',
    date: '2024-01',
    type: 'major',
    status: 'completed',
    title: '平台 2.0 重构',
    description: '全面重构技术笔记与工具系统，集成 MDX、KaTeX 公式渲染，支持代码高亮与交互式组件',
    highlights: [
      'MDX 内容系统',
      'KaTeX LaTeX 公式渲染',
      'Shiki 代码高亮',
      '交互式史密斯圆图',
    ],
  },
  {
    version: 'v2.0.1',
    date: '2025-Q2',
    type: 'minor',
    status: 'in-progress',
    title: 'AI 辅射频频设计',
    description: '探索大语言模型在射频电路设计中的应用，提供设计建议与参数优化',
    highlights: [
      'LLM 射频知识库',
      '智能设计建议',
      '参数优化推荐',
      '错误诊断辅助',
    ],
  },
  {
    version: 'v3.0.0',
    date: '2025-Q4',
    type: 'major',
    status: 'planned',
    title: '6G 毫米波前端研究',
    description: '针对 6G 毫米波频段 (28-100 GHz) 的前端架构研究，包括波束成形、线性化与校准',
    highlights: [
      '毫米波波束成形',
      '高功率放大器设计',
      '相位噪声优化',
      '自动化校准系统',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-4xl px-8 py-12">
        <header className="mb-12">
          <h1 className="text-3xl font-serif font-semibold mb-4">Engineering Changelog</h1>
          <p className="text-lg text-[var(--text-secondary)]">
            记录射频工程技术演进与关键里程碑
          </p>
        </header>

        <EngineeringChangelog entries={changelogEntries} />

        <div className="mt-12 border-t border-thin pt-8">
          <h2 className="text-xl font-serif font-semibold mb-4 text-[var(--text-primary)]">
            版本说明
          </h2>
          <div className="space-y-4 text-sm text-[var(--text-secondary)]">
            <div>
              <strong className="text-[var(--text-primary)]">Major (重大更新)</strong>:
              架构级变更、新增核心功能、重大性能提升
            </div>
            <div>
              <strong className="text-[var(--text-primary)]">Minor (功能改进)</strong>:
              新增功能模块、工具增强、文档完善
            </div>
            <div>
              <strong className="text-[var(--text-primary)]">Patch (问题修复)</strong>:
              Bug 修复、性能优化、细节改进
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
