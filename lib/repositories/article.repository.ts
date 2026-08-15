import { Article } from '../../types/tool';
import { prisma } from '../prisma';
import { mapArticle } from '../repository-shared';

export class ArticleRepository {
  public static async getArticles(): Promise<Article[]> {
    const articles = await prisma.article.findMany({ orderBy: { publishedAt: 'desc' } });
    return articles.map(mapArticle);
  }

  public static async getArticleBySlug(slug: string): Promise<Article | undefined> {
    const article = await prisma.article.findFirst({
      where: { slug: { equals: slug, mode: 'insensitive' } },
    });
    return article ? mapArticle(article) : undefined;
  }
}
