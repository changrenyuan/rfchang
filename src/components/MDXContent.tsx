'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import { serialize } from 'next-mdx-remote/serialize';
import KaTeX from './KaTeX';
import SParameterChart from './SParameterChart';
import SmithChart from './SmithChart';

/**
 * MDX 渲染器组件
 *
 * 支持：
 * - Markdown 语法
 * - LaTeX 公式（使用 $ 和 $$）
 * - 自定义 React 组件（图表、工具等）
 * - 代码高亮
 */

// MDX 自定义组件映射
const components = {
  // LaTeX 公式组件
  KaTeX: (props: any) => <KaTeX {...props} />,

  // 射频专用图表组件
  SParameterChart: (props: any) => <SParameterChart {...props} />,
  SmithChart: (props: any) => <SmithChart {...props} />,

  // 自定义标题样式（学术风格）
  h1: ({ children }: any) => (
    <h1 className="mt-12 mb-6 text-3xl font-light text-slate-900 dark:text-slate-100 serif">
      {children}
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="mt-10 mb-4 text-2xl font-light text-slate-900 dark:text-slate-100 serif">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="mt-8 mb-3 text-xl font-medium text-slate-900 dark:text-slate-100">
      {children}
    </h3>
  ),
  h4: ({ children }: any) => (
    <h4 className="mt-6 mb-2 text-lg font-medium text-slate-900 dark:text-slate-100">
      {children}
    </h4>
  ),

  // 段落样式（学术风格，更好的可读性）
  p: ({ children }: any) => (
    <p className="mb-6 leading-8 text-slate-700 dark:text-slate-300">
      {children}
    </p>
  ),

  // 列表样式
  ul: ({ children }: any) => (
    <ul className="mb-6 ml-8 list-disc space-y-2 text-slate-700 dark:text-slate-300">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="mb-6 ml-8 list-decimal space-y-2 text-slate-700 dark:text-slate-300">
      {children}
    </ol>
  ),

  // 代码块样式
  pre: ({ children }: any) => (
    <pre className="mb-6 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
      {children}
    </pre>
  ),
  code: ({ children, className }: any) => {
    // 如果有 className（来自 highlighter），保持原样
    if (className) {
      return <code className={className}>{children}</code>;
    }
    // 行内代码
    return (
      <code className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 font-mono">
        {children}
      </code>
    );
  },

  // 引用样式（学术引用）
  blockquote: ({ children }: any) => (
    <blockquote className="mb-6 border-l-4 border-slate-300 dark:border-slate-700 pl-6 italic text-slate-600 dark:text-slate-400">
      {children}
    </blockquote>
  ),

  // 表格样式
  table: ({ children }: any) => (
    <div className="mb-6 overflow-x-auto">
      <table className="min-w-full border border-slate-200 dark:border-slate-700">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: any) => (
    <thead className="bg-slate-50 dark:bg-slate-800">
      {children}
    </thead>
  ),
  tbody: ({ children }: any) => (
    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
      {children}
    </tbody>
  ),
  tr: ({ children }: any) => (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800">
      {children}
    </tr>
  ),
  th: ({ children }: any) => (
    <th className="px-4 py-2 text-left text-sm font-medium text-slate-900 dark:text-slate-100">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300">
      {children}
    </td>
  ),

  // 链接样式
  a: ({ href, children }: any) => (
    <a
      href={href}
      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),

  // 分隔线
  hr: () => (
    <hr className="my-8 border-slate-200 dark:border-slate-700" />
  ),

  // 图片样式
  img: ({ src, alt }: any) => (
    <img
      src={src}
      alt={alt}
      className="mb-6 rounded-lg w-full"
      loading="lazy"
    />
  ),
};

interface MDXContentProps {
  source: string;
}

/**
 * MDX 内容渲染组件
 *
 * @param source - MDX 源内容（Markdown + LaTeX）
 *
 * 示例：
 * <MDXContent source={markdownContent} />
 */
export default function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <MDXRemote source={source} components={components} />
    </div>
  );
}

/**
 * 服务端序列化 MDX 内容
 *
 * 在服务器端使用，需要先序列化再传给客户端
 *
 * 示例：
 * const mdxSource = await serialize(markdownContent);
 * return <MDXContent source={mdxSource} />;
 */
export { serialize };
