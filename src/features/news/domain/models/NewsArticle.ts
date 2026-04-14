export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  source: string;
  imageUrl: string | null;
  publishedAt: string;
  url: string;
  category: string;
}
