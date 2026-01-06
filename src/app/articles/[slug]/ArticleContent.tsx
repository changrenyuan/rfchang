'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ArticleContent({ article }: { article: any }) {
  const [hasPurchased, setHasPurchased] = useState(false);

  const content = `
# Smith Chart 阻抗匹配完全指南

## 一、Smith Chart 基础理论

史密斯圆图是射频工程师最重要的工具之一，用于解决阻抗匹配问题。它是一个将复平面阻抗映射到单位圆的图形工具。

### 1.1 基本概念

- **归一化阻抗**：z = Z / Z0
- **阻抗圆**：等电阻圆和等电抗圆
- **导纳圆**：等电导圆和等电纳圆

### 1.2 Smith Chart 的组成

史密斯圆图由多个同心圆组成，每个圆代表特定的阻抗值：
- 等电阻圆（R=const）
- 等电抗圆（X=const）
- 反射系数圆（|Γ|=const）

## 二、匹配网络设计

### 2.1 L型匹配网络

L型匹配网络是最简单的匹配网络，由一个电感和一个电容组成。

#### 设计步骤：

1. 确定源阻抗 Zs 和负载阻抗 ZL
2. 计算 ΓL = (ZL - Z0) / (ZL + Z0)
3. 在 Smith Chart 上标出 ΓL
4. 沿等电阻圆或等电抗圆移动到中心点

### 2.2 实例分析

假设需要将 50Ω 匹配到 100 + j50Ω：

**步骤 1：归一化**
zL = (100 + j50) / 50 = 2 + j1

**步骤 2：在 Smith Chart 上定位**
找到 R=2 的等电阻圆和 X=1 的等电抗圆的交点

**步骤 3：匹配路径**
- 方案 A：先串联电容，再并联电感
- 方案 B：先串联电感，再并联电容

## 三、宽带匹配技术

### 3.1 多级匹配

单级 L 型匹配带宽有限，多级匹配可以扩展带宽。

**设计原则：**
- 每一级阻抗变换比不宜过大（建议 < 3:1）
- 从低 Q 值向高 Q 值方向设计
- 考虑寄生参数的影响

### 3.2 实战案例：PA 输出匹配

针对 5G 基站 PA 的输出匹配设计：

1. **频率范围**：3.4-3.6 GHz
2. **输出阻抗**：需要从 5Ω 匹配到 50Ω
3. **带宽要求**：> 200 MHz

**设计方案：**
- 第一级：5Ω → 15Ω（L型）
- 第二级：15Ω → 50Ω（π型）
- 使用高 Q 值电容和电感

## 四、调试技巧

### 4.1 常见问题

**问题 1：驻波比（VSWR）过高**
- 检查焊盘寄生参数
- 调整电容/电感值
- 使用高精度元件

**问题 2：带宽不足**
- 采用多级匹配
- 降低 Q 值设计
- 优化 PCB 布局

### 4.2 调试工具

- 矢量网络分析仪（VNA）
- Smith Chart 软件（如 ADS、HFSS）
- 实物调谐工具

## 五、总结

Smith Chart 是射频工程师的必备工具，掌握它需要：
1. 理解基本原理
2. 大量练习
3. 结合实际项目经验

通过系统学习和实践，你可以快速提升阻抗匹配设计能力。

---

## 想要了解更多？

欢迎预约技术咨询，我会根据你的具体项目提供个性化解决方案。
  `;

  if (article.isPaid && !hasPurchased) {
    return (
      <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-100 p-12 text-center dark:border-slate-600 dark:bg-slate-800">
        <div className="mb-4 text-5xl">🔒</div>
        <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
          这是付费内容
        </h3>
        <p className="mb-6 text-slate-600 dark:text-slate-400">
          解锁后即可阅读完整内容，学习实战技巧和案例分析
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setHasPurchased(true)}
            className="rounded-lg bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors"
          >
            立即解锁 ¥{article.price}
          </button>
          <Link
            href="/consultation"
            className="rounded-lg border border-slate-300 px-8 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            预约专家咨询
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="prose prose-slate max-w-none rounded-xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
      <div className="whitespace-pre-wrap text-slate-900 dark:text-slate-100">
        {content}
      </div>
    </article>
  );
}
