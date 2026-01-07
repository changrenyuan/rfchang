import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { DocNavigation } from '@/components/DocNavigation';

// MDX 组件
const components = {
  pre: ({ children }: { children: React.ReactNode }) => (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded overflow-x-auto">
      {children}
    </div>
  ),
  code: ({ className, children, ...props }: any) => {
    const language = className?.replace('language-', '') || '';
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content', 'knowledge');
  const files = fs.readdirSync(contentDir, { recursive: true }) as string[];

  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '').split(path.sep);
      return { slug };
    });
}

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'content', 'knowledge', `${slug.join('/')}.mdx`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const frontMatter = extractFrontMatter(fileContent);

    return {
      title: `${frontMatter.title} - RF Knowledge Base`,
      description: frontMatter.description,
    };
  } catch (error) {
    return {
      title: 'Not Found',
      description: 'Article not found',
    };
  }
}

function extractFrontMatter(content: string): any {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);

  if (!match) {
    return {};
  }

  const frontMatterText = match[1];
  const frontMatter: any = {};

  frontMatterText.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
      frontMatter[key.trim()] = value;
    }
  });

  return frontMatter;
}

export default async function KnowledgePage({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'content', 'knowledge', `${slug.join('/')}.mdx`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const frontMatter = extractFrontMatter(fileContent);
    const content = fileContent.replace(/^---\n[\s\S]*?\n---\n/, '');

    return (
      <>
        <article className="prose prose-sm max-w-none">
          {/* 文章头部 */}
          <div className="mb-8 pb-8 border-b border-[var(--border-color)]">
            <div className="mb-4">
              <span className="text-sm px-3 py-1 bg-[var(--color-primary-light)] text-[var(--color-primary)] rounded font-medium">
                {frontMatter.category}
              </span>
            </div>

            <h1 className="text-3xl font-serif font-semibold text-[var(--text-primary)] mb-4 leading-tight">
              {frontMatter.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-tertiary)]">
              {frontMatter.author && <span>{frontMatter.author}</span>}
              {frontMatter.date && (
                <>
                  <span className="text-[var(--border-color)]">·</span>
                  <span>{frontMatter.date}</span>
                </>
              )}
              {frontMatter.readTime && (
                <>
                  <span className="text-[var(--border-color)]">·</span>
                  <span>{frontMatter.readTime}</span>
                </>
              )}
            </div>

            {frontMatter.description && (
              <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed">
                {frontMatter.description}
              </p>
            )}
          </div>

          {/* 文章内容 */}
          <div className="min-h-[500px] prose-content">
            <MDXRemote
              source={content}
              components={components}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkMath],
                  rehypePlugins: [rehypeKatex],
                },
              }}
            />
          </div>
        </article>

        {/* 文档导航 */}
        <DocNavigation currentPath={slug.join('/')} />
      </>
    );
  } catch (error) {
    notFound();
  }
}
