export interface Stat {
  label: string;
  value: string;
  unit: string;
}

export const stats: Stat[] = [
  { label: '技术札记', value: '42', unit: '篇' },
  { label: '开源项目', value: '8', unit: '个' },
  { label: '学术论文', value: '12', unit: '篇' },
  { label: '工程案例', value: '25', unit: '个' },
];
