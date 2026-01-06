import { NextRequest, NextResponse } from 'next/server';
import { articleManager } from '../../../../storage/database/articleManager';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const article = await articleManager.getArticleBySlug(slug);

    if (!article) {
      return NextResponse.json({
        success: false,
        error: 'Article not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: article
    });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch article'
    }, { status: 500 });
  }
}
