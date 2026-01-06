import { NextRequest, NextResponse } from 'next/server';
import { articleManager } from '../../../storage/database/articleManager';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;

    const articles = await articleManager.getArticles({
      category,
      search
    });

    return NextResponse.json({
      success: true,
      data: articles
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch articles'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const article = await articleManager.createArticle(body);

    return NextResponse.json({
      success: true,
      data: article
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create article'
    }, { status: 500 });
  }
}
