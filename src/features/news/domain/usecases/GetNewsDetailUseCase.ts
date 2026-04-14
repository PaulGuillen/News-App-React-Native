import { INewsRepository } from '../repository/INewsRepository';
import { NewsArticle } from '../models/NewsArticle';

export class GetNewsDetailUseCase {
  constructor(private readonly newsRepository: INewsRepository) {}

  async execute(id: string): Promise<NewsArticle | null> {
    return this.newsRepository.getArticleById(id);
  }
}
