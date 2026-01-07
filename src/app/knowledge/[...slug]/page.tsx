import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
      <article className="prose prose-sm max-w-none">
        <div className="mb-8 pb-8 border-b border-[var(--border-color)]">
          <div className="mb-4">
            <span className="text-sm px-2 py-1 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded">
              {frontMatter.category}
            </span>
          </div>

          <h1 className="text-3xl font-serif font-semibold text-[var(--text-primary)] mb-4">
            {frontMatter.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-[var(--text-tertiary)]">
            <span>{frontMatter.author}</span>
            <span>·</span>
            <span>{frontMatter.date}</span>
            <span>·</span>
            <span>{frontMatter.readTime}</span>
          </div>

          {frontMatter.description && (
            <p className="mt-4 text-base text-[var(--text-secondary)]">
              {frontMatter.description}
            </p>
          )}
        </div>

        <div className="min-h-[500px]">
          <MDXRemote
            source={content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkMath],
                rehypePlugins: [rehypeKatex],
              },
            }}
          />
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border-color)]">
          <div className="flex justify-between items-center">
            <Link
              href="/knowledge"
              className="flex items-center gap-2 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              返回知识库
            </Link>
          </div>
        </div>
      </article>
    );
  } catch (error) {
    notFound();
  }
}
