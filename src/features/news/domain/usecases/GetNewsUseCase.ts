import { INewsRepository } from '../repository/INewsRepository';
import { NewsArticle } from '../models/NewsArticle';

export class GetNewsUseCase {
  constructor(private readonly newsRepository: INewsRepository) {}

  async execute(category?: string, page?: number): Promise<NewsArticle[]> {
    return this.newsRepository.getTopHeadlines(category, page);
  }
}
