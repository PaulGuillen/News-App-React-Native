import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Share,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '../../../../theme';
import { formatDate } from '../../../../shared/utils/formatDate';
import { NewsStackParamList } from '../../navigation/NewsNavigator';
import { analyticsService } from '../../../../shared/services/analytics/AnalyticsService';

type NewsDetailRouteProp = RouteProp<NewsStackParamList, 'NewsDetail'>;
type NewsDetailNavigationProp = NativeStackNavigationProp<NewsStackParamList, 'NewsDetail'>;

export const NewsDetailScreen: React.FC = () => {
  const navigation = useNavigation<NewsDetailNavigationProp>();
  const route = useRoute<NewsDetailRouteProp>();
  const { article } = route.params;

  useEffect(() => {
    analyticsService.logScreenView('NewsDetail');
  }, []);

  const handleOpenInBrowser = async () => {
    if (article.url) {
      const supported = await Linking.canOpenURL(article.url);
      if (supported) {
        await Linking.openURL(article.url);
        analyticsService.logEvent({ name: 'article_opened_browser', params: { url: article.url } });
      }
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        title: article.title,
        message: `${article.title}\n\n${article.url}`,
        url: article.url,
      });
      analyticsService.logEvent({ name: 'article_shared', params: { article_id: article.id } });
    } catch {
      // User cancelled share
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <Text style={styles.shareIcon}>⬆️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {article.imageUrl ? (
          <Image source={{ uri: article.imageUrl }} style={styles.heroImage} resizeMode="cover" />
        ) : (
          <View style={styles.heroPlaceholder}>
            <Text style={styles.placeholderIcon}>📰</Text>
          </View>
        )}

        <View style={styles.content}>
          <View style={styles.categoryRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{article.category.toUpperCase()}</Text>
            </View>
            <Text style={styles.publishedAt}>{formatDate(article.publishedAt)}</Text>
          </View>

          <Text style={styles.title}>{article.title}</Text>

          <View style={styles.authorRow}>
            <Text style={styles.source}>{article.source}</Text>
            {article.author && (
              <Text style={styles.author} numberOfLines={1}>
                {' '}• {article.author}
              </Text>
            )}
          </View>

          {article.description ? (
            <Text style={styles.description}>{article.description}</Text>
          ) : null}

          <View style={styles.divider} />

          <Text style={styles.body}>
            {article.content || article.description || 'No content available for this article.'}
          </Text>

          <TouchableOpacity style={styles.readMoreButton} onPress={handleOpenInBrowser}>
            <Text style={styles.readMoreText}>Read Full Article →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  backButton: { paddingVertical: 8, paddingRight: 16 },
  backText: { ...Typography.body, color: Colors.primary },
  shareButton: { paddingVertical: 8, paddingLeft: 16 },
  shareIcon: { fontSize: 20 },
  heroImage: { width: '100%', height: 260 },
  heroPlaceholder: {
    width: '100%',
    height: 260,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: { fontSize: 64 },
  content: { padding: Spacing.lg },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  categoryBadge: {
    backgroundColor: Colors.primaryDark,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: { ...Typography.caption, color: Colors.white, fontWeight: '700' },
  publishedAt: { ...Typography.caption, color: Colors.textMuted },
  title: { ...Typography.h2, color: Colors.text, marginBottom: Spacing.md, lineHeight: 36 },
  authorRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg },
  source: { ...Typography.bodySmall, color: Colors.primary, fontWeight: '600' },
  author: { ...Typography.bodySmall, color: Colors.textSecondary, flex: 1 },
  description: { ...Typography.body, color: Colors.textSecondary, marginBottom: Spacing.md, lineHeight: 26 },
  divider: { height: 1, backgroundColor: Colors.border, marginBottom: Spacing.lg },
  body: { ...Typography.body, color: Colors.text, lineHeight: 28, marginBottom: Spacing.xl },
  readMoreButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  readMoreText: { ...Typography.button, color: Colors.white },
});
