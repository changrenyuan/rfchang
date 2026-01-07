import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Article {
  id: string;
  title: string;
  path: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
  content?: string;
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

function getAllArticles(contentDir: string): Article[] {
  const articles: Article[] = [];

  function walkDirectory(dir: string, relativePath: string = '') {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walkDirectory(fullPath, path.join(relativePath, file));
      } else if (file.endsWith('.mdx')) {
        try {
          const fileContent = fs.readFileSync(fullPath, 'utf-8');
          const frontMatter = extractFrontMatter(fileContent);

          // 提取文章内容用于搜索
          const content = fileContent.replace(/^---\n[\s\S]*?\n---\n/, '');

          // 提取摘要（第一段）
          const firstParagraph = content.split('\n\n')[0]?.replace(/[#*`]/g, '').trim() || '';

          articles.push({
            id: file.replace('.mdx', ''),
            title: frontMatter.title || file.replace('.mdx', ''),
            path: `/knowledge/${relativePath}/${file.replace('.mdx', '')}`,
            excerpt: frontMatter.description || firstParagraph,
            category: frontMatter.category || '未分类',
            readTime: frontMatter.readTime || '-',
            author: frontMatter.author || 'RF Engineer',
            date: frontMatter.date || new Date().toISOString(),
            content, // 保存内容用于搜索
          });
        } catch (error) {
          console.error(`Error reading ${fullPath}:`, error);
        }
      }
    });
  }

  walkDirectory(contentDir);
  return articles;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ results: [] });
    }

    const contentDir = path.join(process.cwd(), 'content', 'knowledge');
    const allArticles = getAllArticles(contentDir);
    const searchTerm = query.trim().toLowerCase();

    // 搜索文章
    const results = allArticles
      .filter((article) => {
        const titleMatch = article.title.toLowerCase().includes(searchTerm);
        const excerptMatch = article.excerpt.toLowerCase().includes(searchTerm);
        const categoryMatch = article.category.toLowerCase().includes(searchTerm);
        const contentMatch = (article as any).content?.toLowerCase().includes(searchTerm);

        return titleMatch || excerptMatch || categoryMatch || contentMatch;
      })
      .map((article) => ({
        id: article.id,
        title: article.title,
        path: article.path,
        excerpt: article.excerpt,
        category: article.category,
        readTime: article.readTime,
        author: article.author,
        date: article.date,
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 20);

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: '搜索失败', results: [] },
      { status: 500 }
    );
  }
}
