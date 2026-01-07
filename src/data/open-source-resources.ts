export interface OpenSourceResource {
  name: string;
  description: string;
  type: string;
  language: string;
  stars: number;
  link: string;
}

export const openSourceResources: OpenSourceResource[] = [
  {
    name: 'rf-calculator',
    description: 'Python 射频参数计算工具包，包含 S 参数、驻波比、回波损耗等常用计算模块',
    type: 'Python Package',
    language: 'Python',
    stars: 234,
    link: 'https://github.com/changrenyuan/rf-calculator',
  },
  {
    name: 's-parameter-plotter',
    description: 'Web-based S 参数可视化工具，支持 Touchstone 文件格式导入与矢量网络分析',
    type: 'Web Tool',
    language: 'TypeScript',
    stars: 189,
    link: '/tools/s-parameter-plotter',
  },
  {
    name: 'impedance-matcher',
    description: 'Matlab 阻抗匹配网络自动设计工具，支持多级匹配网络优化与 parasitic 参数补偿',
    type: 'Matlab Script',
    language: 'Matlab',
    stars: 156,
    link: 'https://github.com/changrenyuan/impedance-matcher',
  },
];
