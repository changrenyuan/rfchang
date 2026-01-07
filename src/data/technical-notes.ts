export interface TechnicalNote {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  isDeep: boolean;
  tags: string[];
}

export const technicalNotes: TechnicalNote[] = [
  {
    title: 'Wi-Fi 7 射频前端架构演进',
    excerpt: '探讨 320 MHz 带宽、4096-QAM 调制对射频前端设计的挑战，分析频段干扰抑制方案与射频前端集成策略。',
    date: '2025-01-15',
    category: '技术解读',
    readTime: '12 min',
    isDeep: false,
    tags: ['Wi-Fi 7', '前端架构', '频段干扰'],
  },
  {
    title: '史密斯圆图在阻抗匹配中的深度应用',
    excerpt: '从基础到高级：多种匹配网络的对比分析与优化策略，涵盖 L 型、T 型、π 型匹配网络的适用场景与设计方法。',
    date: '2025-01-10',
    category: '深度研究',
    readTime: '25 min',
    isDeep: true,
    tags: ['史密斯圆图', '阻抗匹配', '优化策略'],
  },
  {
    title: '毫米波功率放大器线性化技术综述',
    excerpt: '数字预失真 (DPD) 与反馈技术在 28 GHz 频段的实现，分析线性化性能与效率权衡关系。',
    date: '2025-01-05',
    category: '学术论文',
    readTime: '18 min',
    isDeep: true,
    tags: ['毫米波', 'PA', '线性化', 'DPD'],
  },
];
