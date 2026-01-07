export interface EngineeringTask {
  name: string;
  link: string;
  difficulty: string;
}

export interface EngineeringTaskGroup {
  category: string;
  icon: string;
  tasks: EngineeringTask[];
}

export const engineeringTasks: EngineeringTaskGroup[] = [
  {
    category: 'Impedance Matching',
    icon: '⚡',
    tasks: [
      { name: 'L 型匹配网络设计', link: '/tools#impedance-matcher', difficulty: 'Beginner' },
      { name: 'T 型/π 型多级匹配', link: '/notes#t-pi-matching', difficulty: 'Intermediate' },
      { name: '宽频带匹配优化', link: '/notes#broadband-matching', difficulty: 'Advanced' },
    ],
  },
  {
    category: 'Power Amplifier',
    icon: '📡',
    tasks: [
      { name: 'PA 增益与效率权衡', link: '/notes#pa-efficiency', difficulty: 'Intermediate' },
      { name: '数字预失真 (DPD) 实现', link: '/notes#dpd-implementation', difficulty: 'Advanced' },
      { name: '线性化性能评估', link: '/tools#linearity-test', difficulty: 'Intermediate' },
    ],
  },
  {
    category: 'S-Parameter Analysis',
    icon: '📊',
    tasks: [
      { name: 'S11/S21 测量与分析', link: '/tools#s-parameter', difficulty: 'Beginner' },
      { name: '稳定性判定 (K 因子)', link: '/notes#stability-analysis', difficulty: 'Intermediate' },
      { name: '增益平坦度优化', link: '/notes#gain-flattening', difficulty: 'Intermediate' },
    ],
  },
  {
    category: 'Noise Figure',
    icon: '🔊',
    tasks: [
      { name: '噪声系数测量', link: '/tools#noise-figure', difficulty: 'Intermediate' },
      { name: '低噪声放大器设计', link: '/notes#lna-design', difficulty: 'Advanced' },
      { name: '级联系统噪声优化', link: '/notes#cascaded-noise', difficulty: 'Intermediate' },
    ],
  },
];
