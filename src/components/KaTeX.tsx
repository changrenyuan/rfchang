'use client';

import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface KaTeXProps {
  math: string;
  display?: boolean; // 是否为块级公式（$$）
  className?: string;
}

/**
 * KaTeX LaTeX 公式渲染组件
 *
 * @param math - LaTeX 数学公式字符串
 * @param display - 是否为块级公式（默认 false 为行内公式）
 * @param className - 额外的 CSS 类名
 *
 * 示例：
 * <KaTeX math="E = mc^2" />                     // 行内公式
 * <KaTeX math="\int_0^1 x^2 dx" display={true} /> // 块级公式
 */
export default function KaTeX({ math, display = false, className = '' }: KaTeXProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(math, containerRef.current, {
          displayMode: display,
          throwOnError: false,
          strict: false,
          output: 'html',
          macros: {
            "\\Z0": "\\mathbb{Z}_0",
            "\\SWR": "\\text{SWR}",
            "\\RL": "\\text{RL}",
          },
        });
      } catch (error) {
        console.error('KaTeX rendering error:', error);
        containerRef.current.textContent = math;
      }
    }
  }, [math, display]);

  return (
    <div
      ref={containerRef}
      className={`overflow-x-auto ${display ? 'my-6' : ''} ${className}`}
      style={{
        display: display ? 'block' : 'inline-block',
        verticalAlign: 'middle',
      }}
    />
  );
}
