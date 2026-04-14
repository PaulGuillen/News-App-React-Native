import { NewsArticle } from '../../domain/models/NewsArticle';
import { NewsArticleDTO, FirestoreArticleDTO } from '../api/newsApi';

const generateArticleId = (dto: NewsArticleDTO, index: number): string => {
  const urlHash = dto.url ? dto.url.replace(/[^a-zA-Z0-9]/g, '').slice(-12) : '';
  return `api_${index}_${urlHash || Math.random().toString(36).slice(2, 9)}`;
};

export const mapApiArticleToEntity = (dto: NewsArticleDTO, index: number): NewsArticle => ({
  id: generateArticleId(dto, index),
  title: dto.title ?? 'No Title',
  description: dto.description ?? '',
  content: dto.content ?? '',
  author: dto.author ?? 'Unknown',
  source: dto.source?.name ?? 'Unknown Source',
  imageUrl: dto.urlToImage ?? null,
  publishedAt: dto.publishedAt ?? new Date().toISOString(),
  url: dto.url ?? '',
  category: 'general',
});

export const mapFirestoreArticleToEntity = (dto: FirestoreArticleDTO): NewsArticle => ({
  id: dto.id,
  title: dto.title,
  description: dto.description,
  content: dto.content,
  author: dto.author,
  source: dto.source,
  imageUrl: dto.imageUrl,
  publishedAt: dto.publishedAt,
  url: dto.url,
  category: dto.category,
});
