import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks';
import { fetchNews, fetchNewsDetail, searchNewsAction, setCategory, clearSelectedArticle, clearSearch } from '../state/newsSlice';

export const useNews = () => {
  const dispatch = useAppDispatch();
  const newsState = useAppSelector((state) => state.news);

  const loadNews = useCallback(
    (category?: string, page = 1) => {
      dispatch(fetchNews({ category: category ?? newsState.currentCategory, page }));
    },
    [dispatch, newsState.currentCategory],
  );

  const refresh = useCallback(() => {
    dispatch(fetchNews({ category: newsState.currentCategory, page: 1 }));
  }, [dispatch, newsState.currentCategory]);

  const loadMore = useCallback(() => {
    if (!newsState.loadingMore && newsState.hasMore) {
      dispatch(fetchNews({ category: newsState.currentCategory, page: newsState.currentPage + 1 }));
    }
  }, [dispatch, newsState]);

  const changeCategory = useCallback(
    (category: string) => {
      dispatch(setCategory(category));
      dispatch(fetchNews({ category, page: 1 }));
    },
    [dispatch],
  );

  const getDetail = useCallback(
    (id: string) => {
      dispatch(fetchNewsDetail(id));
    },
    [dispatch],
  );

  const search = useCallback(
    (queryStr: string) => {
      dispatch(searchNewsAction(queryStr));
    },
    [dispatch],
  );

  const clearSearchResults = useCallback(() => {
    dispatch(clearSearch());
  }, [dispatch]);

  const clearDetail = useCallback(() => {
    dispatch(clearSelectedArticle());
  }, [dispatch]);

  return {
    ...newsState,
    loadNews,
    refresh,
    loadMore,
    changeCategory,
    getDetail,
    search,
    clearSearch: clearSearchResults,
    clearDetail,
  };
};
