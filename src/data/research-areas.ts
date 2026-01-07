import { Activity, TrendingUp, Shield } from 'lucide-react';

export interface ResearchArea {
  icon: any;
  title: string;
  description: string;
  engineeringNote: string;
  metrics: Array<{ label: string; value: string }>;
  focus: string[];
  subItems: string[];
}

export const researchAreas: ResearchArea[] = [
  {
    icon: Activity,
    title: '5G/6G 射频前端设计',
    description: 'Massive MIMO、毫米波功率放大器、滤波器组',
    engineeringNote: '高频段信号完整性挑战与 PA 效率优化',
    metrics: [
      { label: '研究方向', value: '3' },
      { label: '项目经验', value: '8+' },
      { label: '技术深度', value: 'Advanced' },
    ],
    focus: ['大规模天线阵列', '毫米波 PA 线性化', '滤波器集成'],
    subItems: [
      'Sub-6GHz / mmWave 多频段兼容设计',
      '数字预失真 (DPD) 线性化实现',
      '收发隔离度优化技术',
    ],
  },
  {
    icon: TrendingUp,
    title: '高频电路与信号完整性',
    description: '高速互连、电磁兼容、阻抗匹配',
    engineeringNote: 'GHz 级信号传输的衰减与反射控制',
    metrics: [
      { label: '设计案例', value: '15+' },
      { label: '测试覆盖', value: '95%' },
      { label: '验证周期', value: '< 2 weeks' },
    ],
    focus: ['差分对设计', '眼图分析', '电源完整性'],
    subItems: [
      'PCB 差分对阻抗匹配设计',
      '高速信号眼图与时序分析',
      'EMC/EMI 干扰抑制策略',
    ],
  },
  {
    icon: Shield,
    title: '射频测量与校准',
    description: '矢量网络分析仪、相位噪声、误差矢量幅度',
    engineeringNote: '高精度测量的系统误差修正方法',
    metrics: [
      { label: '校准标准', value: 'IEEE' },
      { label: '测试工具', value: '自研' },
      { label: '准确度', value: '±0.5 dB' },
    ],
    focus: ['S 参数测量', '误差修正', '自动化测试'],
    subItems: [
      'VNA 校准与系统误差建模',
      '相位噪声测量与抖动分析',
      'EVM 测试与线性度评估',
    ],
  },
];
