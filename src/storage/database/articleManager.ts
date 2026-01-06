import { eq, like, and, desc, SQL } from 'drizzle-orm';
import { getDb } from 'coze-coding-dev-sdk';
import { articles, insertArticleSchema, type Article, type NewArticle } from './shared/schema';

export class ArticleManager {
  async createArticle(data: NewArticle): Promise<Article> {
    const db = await getDb();
    const validated = insertArticleSchema.parse(data);
    const [article] = await db.insert(articles).values(validated).returning();
    return article;
  }

  async getArticles(options: {
    skip?: number;
    limit?: number;
    category?: string;
    search?: string;
  } = {}): Promise<Article[]> {
    const { skip = 0, limit = 100, category, search } = options;
    const db = await getDb();

    const conditions: SQL[] = [];

    if (category) {
      conditions.push(eq(articles.category, category));
    }

    if (search) {
      conditions.push(
        like(articles.title, `%${search}%`)
      );
    }

    const query = db.select().from(articles).orderBy(desc(articles.createdAt)).limit(limit).offset(skip);

    if (conditions.length > 0) {
      return query.where(and(...conditions));
    }

    return query;
  }

  async getArticleById(id: number): Promise<Article | null> {
    const db = await getDb();
    const [article] = await db.select().from(articles).where(eq(articles.id, id));
    return article || null;
  }

  async getArticleBySlug(slug: string): Promise<Article | null> {
    const db = await getDb();
    const [article] = await db.select().from(articles).where(eq(articles.slug, slug));
    return article || null;
  }

  async updateArticle(id: number, data: Partial<NewArticle>): Promise<Article | null> {
    const db = await getDb();
    const [article] = await db
      .update(articles)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(articles.id, id))
      .returning();
    return article || null;
  }

  async deleteArticle(id: number): Promise<boolean> {
    const db = await getDb();
    const result = await db.delete(articles).where(eq(articles.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}

export const articleManager = new ArticleManager();
