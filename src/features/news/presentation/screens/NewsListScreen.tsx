import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenContainer } from '../../../../shared/components/ScreenContainer';
import { EmptyState } from '../../../../shared/components/EmptyState';
import { NewsCard } from '../components/NewsCard';

const LOAD_MORE_THRESHOLD = 0.5;
import { SkeletonList } from '../components/SkeletonCard';
import { useNews } from '../hooks/useNews';
import { useAuth } from '../../../auth/presentation/hooks/useAuth';
import { Colors, Typography, Spacing } from '../../../../theme';
import { NewsArticle } from '../../domain/models/NewsArticle';
import { NewsStackParamList } from '../../navigation/NewsNavigator';
import { analyticsService } from '../../../../shared/services/analytics/AnalyticsService';

type NewsListNavigationProp = NativeStackNavigationProp<NewsStackParamList, 'NewsList'>;

const CATEGORIES = ['general', 'technology', 'business', 'sports', 'health', 'entertainment'];

export const NewsListScreen: React.FC = () => {
  const navigation = useNavigation<NewsListNavigationProp>();
  const { user, logout } = useAuth();
  const {
    articles,
    loading,
    refreshing,
    loadingMore,
    error,
    currentCategory,
    loadNews,
    refresh,
    loadMore,
    changeCategory,
  } = useNews();

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadNews();
    analyticsService.logScreenView('NewsList');
  }, [loadNews]);

  const handleArticlePress = useCallback((article: NewsArticle) => {
    navigation.navigate('NewsDetail', { articleId: article.id, article });
    analyticsService.logEvent({ name: 'article_viewed', params: { article_id: article.id, title: article.title } });
  }, [navigation]);

  const handleCategoryChange = useCallback((category: string) => {
    changeCategory(category);
  }, [changeCategory]);

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.displayName ?? user?.email?.split('@')[0] ?? 'there'} 👋</Text>
          <Text style={styles.headerTitle}>Today&apos;s News</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search articles..."
          placeholderTextColor={Colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        horizontal
        data={CATEGORIES}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.categoryChip, currentCategory === item && styles.categoryChipActive]}
            onPress={() => handleCategoryChange(item)}
          >
            <Text style={[styles.categoryText, currentCategory === item && styles.categoryTextActive]}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.loadingMore}>
        <SkeletonList count={2} />
      </View>
    );
  };

  if (loading && articles.length === 0) {
    return (
      <ScreenContainer>
        {renderHeader()}
        <View style={styles.list}>
          <SkeletonList count={4} />
        </View>
      </ScreenContainer>
    );
  }

  if (error && articles.length === 0) {
    return (
      <ScreenContainer>
        {renderHeader()}
        <EmptyState
          title="Failed to Load News"
          description={error}
          actionLabel="Try Again"
          onAction={() => loadNews()}
          icon="⚠️"
        />
      </ScreenContainer>
    );
  }

  const filteredArticles = searchQuery.length > 0
    ? articles.filter((a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : articles;

  return (
    <ScreenContainer>
      <FlatList
        data={filteredArticles}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <NewsCard article={item} onPress={handleArticlePress} featured={index === 0 && !searchQuery} />
        )}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <EmptyState
            title={searchQuery ? 'No Results Found' : 'No News Available'}
            description={searchQuery ? `No articles match "${searchQuery}"` : 'Pull to refresh and try again.'}
            actionLabel={!searchQuery ? 'Refresh' : undefined}
            onAction={!searchQuery ? refresh : undefined}
          />
        }
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={Colors.primary} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={LOAD_MORE_THRESHOLD}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: { paddingHorizontal: Spacing.md, paddingTop: Spacing.md },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  greeting: { ...Typography.bodySmall, color: Colors.textSecondary },
  headerTitle: { ...Typography.h2, color: Colors.text },
  logoutButton: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  logoutText: { ...Typography.caption, color: Colors.textSecondary },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: { fontSize: 16, marginRight: Spacing.sm },
  searchInput: {
    flex: 1,
    ...Typography.body,
    color: Colors.text,
    paddingVertical: 12,
  },
  clearIcon: { color: Colors.textMuted, fontSize: 14 },
  categoryList: { marginBottom: Spacing.md },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  categoryText: { ...Typography.bodySmall, color: Colors.textSecondary, fontWeight: '500' },
  categoryTextActive: { color: Colors.white, fontWeight: '700' },
  list: { paddingHorizontal: Spacing.md },
  listContent: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.xl },
  loadingMore: { paddingTop: Spacing.sm },
});
