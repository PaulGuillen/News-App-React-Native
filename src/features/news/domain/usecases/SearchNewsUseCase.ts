import { INewsRepository } from '../repository/INewsRepository';
import { NewsArticle } from '../models/NewsArticle';

export class SearchNewsUseCase {
  constructor(private readonly newsRepository: INewsRepository) {}

  async execute(query: string): Promise<NewsArticle[]> {
    return this.newsRepository.searchArticles(query);
  }
}
