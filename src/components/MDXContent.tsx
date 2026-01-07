'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

// 引入 KaTeX CSS
import 'katex/dist/katex.min.css';

/**
 * 代码块组件 - 使用 Shiki 高亮
 */
function CodeBlock({ language, code }: { language: string; code: string }) {
  const [highlighted, setHighlighted] = useState<string>('');

  useEffect(() => {
    async function highlight() {
      try {
        // 动态导入 shiki
        const { createHighlighter } = await import('shiki');

        const highlighter = await createHighlighter({
          themes: ['github-light', 'nord'],
          langs: ['python', 'matlab', 'cpp', 'typescript', 'javascript', 'bash'],
        });

        const isDark = document.documentElement.classList.contains('dark');
        const html = highlighter.codeToHtml(code, {
          lang: (language || 'text') as any,
          theme: isDark ? 'nord' : ('github-light' as any),
        });

        setHighlighted(html);
      } catch (error) {
        console.error('Shiki highlight error:', error);
        // 降级处理
        setHighlighted(`<pre class="bg-code-block overflow-x-auto p-4 text-sm"><code>${code}</code></pre>`);
      }
    }
    highlight();
  }, [code, language]);

  if (!highlighted) {
    return (
      <pre className="bg-code-block overflow-x-auto p-4 text-sm">
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <div
      className="code-block-wrapper bg-code-block overflow-x-auto rounded-industrial-md"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
}

/**
 * 公式块组件
 */
function FormulaBlock({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="formula-block my-6">
      <div className="mb-2 text-xs font-mono text-slate-500">
        {label && <span className="uppercase tracking-wider">{label}</span>}
      </div>
      <div className="text-lg">{children}</div>
    </div>
  );
}

/**
 * 引用块组件 - IEEE 风格
 */
function Citation({ author, year, title, journal }: { author: string; year: string; title: string; journal: string }) {
  const format = `[${author}, ${year}] ${title}. ${journal}`;
  return (
    <div className="citation my-4">
      <p className="font-mono text-xs text-slate-600 dark:text-slate-400">
        {format}
      </p>
    </div>
  );
}

/**
 * 信息框组件
 */
function InfoBox({ type, children }: { type: 'info' | 'warning' | 'note'; children: React.ReactNode }) {
  const colors = {
    info: 'border-blue-200 bg-blue-50/50 dark:border-blue-900/30 dark:bg-blue-950/20',
    warning: 'border-amber-200 bg-amber-50/50 dark:border-amber-900/30 dark:bg-amber-950/20',
    note: 'border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/20',
  };

  return (
    <div className={`border-l-thin ${colors[type]} my-6 pl-4 py-3`}>
      <div className="text-sm text-slate-700 dark:text-slate-300">
        {children}
      </div>
    </div>
  );
}

/**
 * MDX 组件映射
 */
const components = {
  // 表格 - 工业风格
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="table-mobile-wrapper my-8">
      <table className="table-industrial" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead {...props}>{children}</thead>
  ),
  tbody: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody {...props}>{children}</tbody>
  ),
  tr: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr {...props}>{children}</tr>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th {...props}>{children}</th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td {...props}>{children}</td>
  ),

  // 引用块 - 学术风格
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="quote-block" {...props}>
      {children}
    </blockquote>
  ),

  // 代码块
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    if (React.isValidElement(children) && 'props' in children) {
      return children;
    }
    return <pre {...props} className="bg-code-block overflow-x-auto p-4 text-sm">{children}</pre>;
  },
  code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';

    if (match) {
      return <CodeBlock language={language} code={String(children).replace(/\n$/, '')} />;
    }

    return (
      <code
        className="bg-code-block px-1 py-0.5 rounded-industrial-sm text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    );
  },

  // 自定义组件
  Formula: FormulaBlock,
  Citation: Citation,
  InfoBox: InfoBox,

  // 标题 - 带锚点
  h1: ({ children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 id={id} {...props} className="scroll-mt-20">
      {children}
    </h1>
  ),
  h2: ({ children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 id={id} {...props} className="scroll-mt-20">
      {children}
    </h2>
  ),
  h3: ({ children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 id={id} {...props} className="scroll-mt-20">
      {children}
    </h3>
  ),
  h4: ({ children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 id={id} {...props} className="scroll-mt-20">
      {children}
    </h4>
  ),
};

/**
 * MDX 内容渲染器
 * 支持 LaTeX 公式（KaTeX）和代码高亮（Shiki）
 */
export default function MDXContent({ source, ...props }: any) {
  const options = useMemo(() => ({
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, { throwOnError: false, strict: false }]],
    },
  }), []);

  return (
    <MDXRemote
      source={source}
      options={options}
      components={components}
      {...props}
    />
  );
}

/**
 * 从 MDX 内容提取标题（用于生成目录）
 */
export function extractHeadings(source: string): Array<{ id: string; text: string; level: number }> {
  const headings: Array<{ id: string; text: string; level: number }> = [];
  const headingRegex = /^(#{1,4})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(source)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    headings.push({ id, text, level });
  }

  return headings;
}
