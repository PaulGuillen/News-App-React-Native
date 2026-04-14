import { NewsArticle } from '../models/NewsArticle';

export interface INewsRepository {
  getTopHeadlines(category?: string, page?: number): Promise<NewsArticle[]>;
  getArticleById(id: string): Promise<NewsArticle | null>;
  searchArticles(query: string): Promise<NewsArticle[]>;
}
