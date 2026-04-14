import { collection, getDocs, query, orderBy, limit, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../config/firebase';
import { newsApiClient } from '../../../../shared/services/api/apiClient';
import { ENV } from '../../../../config/env';

export interface NewsArticleDTO {
  source?: { id: string | null; name: string };
  author?: string | null;
  title?: string;
  description?: string | null;
  url?: string;
  urlToImage?: string | null;
  publishedAt?: string;
  content?: string | null;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticleDTO[];
}

export interface FirestoreArticleDTO {
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

export const fetchTopHeadlines = async (category = 'general', page = 1): Promise<NewsArticleDTO[] | FirestoreArticleDTO[]> => {
  try {
    if (ENV.newsApiKey && ENV.newsApiKey !== 'YOUR_NEWS_API_KEY') {
      const data = await newsApiClient.get<NewsApiResponse>('/top-headlines', {
        params: { country: 'us', category, page, pageSize: 20, apiKey: ENV.newsApiKey },
      });
      return data.articles;
    }
    return fetchFromFirestore(category);
  } catch {
    return fetchFromFirestore(category);
  }
};

export const fetchFromFirestore = async (category?: string): Promise<FirestoreArticleDTO[]> => {
  try {
    const newsRef = collection(db, 'news');
    const q = category && category !== 'general'
      ? query(newsRef, where('category', '==', category), orderBy('publishedAt', 'desc'), limit(20))
      : query(newsRef, orderBy('publishedAt', 'desc'), limit(20));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreArticleDTO));
  } catch {
    return getMockArticles();
  }
};

export const fetchArticleById = async (id: string): Promise<FirestoreArticleDTO | null> => {
  try {
    const docRef = doc(db, 'news', id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as FirestoreArticleDTO;
    }
    return null;
  } catch {
    return null;
  }
};

export const searchNews = async (queryStr: string): Promise<NewsArticleDTO[]> => {
  try {
    if (ENV.newsApiKey && ENV.newsApiKey !== 'YOUR_NEWS_API_KEY') {
      const data = await newsApiClient.get<NewsApiResponse>('/everything', {
        params: { q: queryStr, sortBy: 'publishedAt', pageSize: 20, apiKey: ENV.newsApiKey },
      });
      return data.articles;
    }
    return [];
  } catch {
    return [];
  }
};

const getMockArticles = (): FirestoreArticleDTO[] => [
  {
    id: '1',
    title: 'Breaking: Major Tech Innovation Unveiled',
    description: 'A revolutionary new technology has been announced that promises to transform how we interact with mobile devices.',
    content: 'Scientists and engineers at a leading research institution have unveiled a groundbreaking technology that could revolutionize the mobile industry. The innovation, which combines advanced AI with new hardware capabilities, promises to deliver unprecedented performance and user experience improvements.\n\nThe technology has been in development for over five years and involves a team of more than 200 researchers from across the globe. Early tests show promising results with significant improvements in speed, efficiency, and user interaction.\n\nIndustry experts are calling this one of the most significant developments in mobile technology in recent years. The technology is expected to be integrated into commercial products within the next 18 months.',
    author: 'John Smith',
    source: 'TechCrunch',
    imageUrl: 'https://picsum.photos/800/400?random=1',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    url: 'https://example.com/article/1',
    category: 'technology',
  },
  {
    id: '2',
    title: 'Global Economy Shows Signs of Recovery',
    description: 'Latest economic data suggests that global markets are beginning to stabilize after a period of turbulence.',
    content: 'Economic indicators from around the world are pointing to a potential recovery in global markets. Key metrics including employment rates, consumer spending, and manufacturing output all show positive trends over the past quarter.\n\nThe International Monetary Fund has revised its growth projections upward, citing improving conditions in major economies including the United States, European Union, and several Asian markets.\n\nExperts caution that while the signs are encouraging, continued vigilance and appropriate policy responses will be crucial to sustaining this momentum.',
    author: 'Sarah Johnson',
    source: 'Financial Times',
    imageUrl: 'https://picsum.photos/800/400?random=2',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    url: 'https://example.com/article/2',
    category: 'business',
  },
  {
    id: '3',
    title: 'New Climate Initiative Launched by 50 Nations',
    description: 'A landmark agreement has been reached between 50 countries to combat climate change with aggressive new targets.',
    content: 'In a historic meeting of world leaders, 50 nations have committed to a comprehensive new climate initiative that sets ambitious targets for reducing greenhouse gas emissions. The agreement includes binding commitments to achieve net-zero emissions by 2050 and interim targets for 2030.\n\nThe initiative also includes a $500 billion fund to support developing nations in transitioning to clean energy. Environmental groups have praised the agreement as a significant step forward, though some critics argue the targets do not go far enough.\n\nImplementation will begin immediately, with annual reviews to track progress and adjust strategies as needed.',
    author: 'Emma Wilson',
    source: 'Reuters',
    imageUrl: 'https://picsum.photos/800/400?random=3',
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    url: 'https://example.com/article/3',
    category: 'environment',
  },
  {
    id: '4',
    title: 'Sports: Championship Results from Around the World',
    description: 'A roundup of the most exciting sporting events and championship results from the past week.',
    content: 'This week has been packed with exciting sporting events across multiple disciplines. In football, several key matches have determined the standings heading into the final stretch of the season.\n\nIn tennis, young stars continue to challenge established veterans at international tournaments. Basketball leagues around the world are heating up as playoffs approach.\n\nAthletes continue to push the boundaries of human performance, with multiple world records broken across various track and field events at international competitions.',
    author: 'Mike Chen',
    source: 'ESPN',
    imageUrl: 'https://picsum.photos/800/400?random=4',
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    url: 'https://example.com/article/4',
    category: 'sports',
  },
  {
    id: '5',
    title: 'Health Research: New Treatment Shows Promise',
    description: 'Researchers have made a significant breakthrough in treating a common chronic condition affecting millions.',
    content: 'Medical researchers have announced a promising new treatment approach for a chronic condition that affects over 100 million people worldwide. The treatment, which combines existing medications in a novel way, has shown remarkable results in clinical trials.\n\nIn Phase 3 trials involving 10,000 participants across multiple countries, the new treatment demonstrated a 60% improvement in outcomes compared to current standard treatments. Side effects were reported to be minimal and manageable.\n\nRegulatory approval is expected within the next two years, and pharmaceutical companies are already preparing for large-scale production.',
    author: 'Dr. Lisa Park',
    source: 'Medical News Today',
    imageUrl: 'https://picsum.photos/800/400?random=5',
    publishedAt: new Date(Date.now() - 18000000).toISOString(),
    url: 'https://example.com/article/5',
    category: 'health',
  },
  {
    id: '6',
    title: 'Entertainment: Blockbuster Film Breaks Box Office Records',
    description: 'The latest superhero epic has shattered opening weekend records across global markets.',
    content: "The much-anticipated summer blockbuster has exceeded all expectations, breaking multiple box office records during its opening weekend. The film grossed over $400 million globally in its first three days, making it the highest-grossing opening weekend in cinema history.\n\nCritics and audiences alike have praised the film for its spectacular visual effects, compelling storyline, and outstanding performances from its ensemble cast.\n\nThe success has already greenlit two sequels, with production scheduled to begin next year. The film's merchandise and streaming rights have also reportedly been acquired for record-breaking sums.",
    author: 'Alex Turner',
    source: 'Variety',
    imageUrl: 'https://picsum.photos/800/400?random=6',
    publishedAt: new Date(Date.now() - 21600000).toISOString(),
    url: 'https://example.com/article/6',
    category: 'entertainment',
  },
];
