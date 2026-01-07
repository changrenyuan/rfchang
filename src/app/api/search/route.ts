import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { articles } from '@/db/schema';
import { sql } from 'drizzle-orm';
import { desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ results: [] });
    }

    // 使用全文搜索
    const searchTerm = `%${query.trim()}%`;

    const results = await db
      .select({
        id: articles.id,
        title: articles.title,
        slug: articles.slug,
        excerpt: articles.excerpt,
        category: articles.category,
        readTime: articles.readTime,
        author: articles.author,
        createdAt: articles.createdAt,
      })
      .from(articles)
      .where(
        sql`${articles.title} ILIKE ${searchTerm}
           OR ${articles.excerpt} ILIKE ${searchTerm}
           OR ${articles.content} ILIKE ${searchTerm}`
      )
      .orderBy(desc(articles.createdAt))
      .limit(20);

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: '搜索失败', results: [] },
      { status: 500 }
    );
  }
}
