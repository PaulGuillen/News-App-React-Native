import { INewsRepository } from '../../domain/repository/INewsRepository';
import { NewsArticle } from '../../domain/models/NewsArticle';
import { fetchTopHeadlines, fetchArticleById, searchNews, NewsArticleDTO, FirestoreArticleDTO } from '../api/newsApi';
import { mapApiArticleToEntity, mapFirestoreArticleToEntity } from '../mappers/newsMapper';

export class NewsRepositoryImpl implements INewsRepository {
  async getTopHeadlines(category = 'general', page = 1): Promise<NewsArticle[]> {
    const articles = await fetchTopHeadlines(category, page);
    if (articles.length === 0) return [];

    // Check if these are Firestore DTOs (have 'id' field) or API DTOs
    if ('id' in articles[0]) {
      return (articles as FirestoreArticleDTO[]).map(mapFirestoreArticleToEntity);
    }
    return (articles as NewsArticleDTO[]).map((article, index) =>
      mapApiArticleToEntity(article, index),
    );
  }

  async getArticleById(id: string): Promise<NewsArticle | null> {
    const article = await fetchArticleById(id);
    if (!article) return null;
    return mapFirestoreArticleToEntity(article);
  }

  async searchArticles(queryStr: string): Promise<NewsArticle[]> {
    const articles = await searchNews(queryStr);
    return articles.map((article, index) => mapApiArticleToEntity(article, index));
  }
}
