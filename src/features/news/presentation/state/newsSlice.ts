import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { NewsArticle } from '../../domain/models/NewsArticle';
import { NewsRepositoryImpl } from '../../data/repository/NewsRepositoryImpl';
import { GetNewsUseCase } from '../../domain/usecases/GetNewsUseCase';
import { GetNewsDetailUseCase } from '../../domain/usecases/GetNewsDetailUseCase';
import { SearchNewsUseCase } from '../../domain/usecases/SearchNewsUseCase';

const newsRepository = new NewsRepositoryImpl();
const getNewsUseCase = new GetNewsUseCase(newsRepository);
const getNewsDetailUseCase = new GetNewsDetailUseCase(newsRepository);
const searchNewsUseCase = new SearchNewsUseCase(newsRepository);

interface NewsState {
  articles: NewsArticle[];
  selectedArticle: NewsArticle | null;
  searchResults: NewsArticle[];
  loading: boolean;
  refreshing: boolean;
  loadingMore: boolean;
  loadingDetail: boolean;
  error: string | null;
  currentCategory: string;
  currentPage: number;
  hasMore: boolean;
  searchQuery: string;
}

const initialState: NewsState = {
  articles: [],
  selectedArticle: null,
  searchResults: [],
  loading: false,
  refreshing: false,
  loadingMore: false,
  loadingDetail: false,
  error: null,
  currentCategory: 'general',
  currentPage: 1,
  hasMore: true,
  searchQuery: '',
};

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ category, page }: { category?: string; page?: number }, { rejectWithValue }) => {
    try {
      return await getNewsUseCase.execute(category, page);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const fetchNewsDetail = createAsyncThunk(
  'news/fetchDetail',
  async (id: string, { rejectWithValue }) => {
    try {
      return await getNewsDetailUseCase.execute(id);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const searchNewsAction = createAsyncThunk(
  'news/search',
  async (queryStr: string, { rejectWithValue }) => {
    try {
      return await searchNewsUseCase.execute(queryStr);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.currentCategory = action.payload;
      state.articles = [];
      state.currentPage = 1;
      state.hasMore = true;
    },
    clearSelectedArticle(state) {
      state.selectedArticle = null;
    },
    clearSearch(state) {
      state.searchResults = [];
      state.searchQuery = '';
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state, action) => {
        const isRefresh = action.meta.arg.page === 1 && state.articles.length > 0;
        const isFirst = state.articles.length === 0;
        if (isRefresh) state.refreshing = true;
        else if (isFirst) state.loading = true;
        else state.loadingMore = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        state.loadingMore = false;
        const page = action.meta.arg.page ?? 1;
        if (page === 1) {
          state.articles = action.payload;
        } else {
          state.articles = [...state.articles, ...action.payload];
        }
        state.currentPage = page;
        state.hasMore = action.payload.length === 20;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        state.loadingMore = false;
        state.error = action.payload as string;
      })
      .addCase(fetchNewsDetail.pending, (state) => { state.loadingDetail = true; })
      .addCase(fetchNewsDetail.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.selectedArticle = action.payload ?? null;
      })
      .addCase(fetchNewsDetail.rejected, (state, action) => {
        state.loadingDetail = false;
        state.error = action.payload as string;
      })
      .addCase(searchNewsAction.pending, (state) => { state.loading = true; })
      .addCase(searchNewsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchNewsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCategory, clearSelectedArticle, clearSearch, clearError } = newsSlice.actions;
export default newsSlice.reducer;
