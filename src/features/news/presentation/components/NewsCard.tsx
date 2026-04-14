import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NewsArticle } from '../../domain/models/NewsArticle';
import { Colors, Typography, Spacing } from '../../../../theme';
import { formatRelativeTime } from '../../../../shared/utils/formatDate';

interface NewsCardProps {
  article: NewsArticle;
  onPress: (article: NewsArticle) => void;
  featured?: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, onPress, featured = false }) => {
  return (
    <TouchableOpacity
      style={[styles.container, featured && styles.featuredContainer]}
      onPress={() => onPress(article)}
      activeOpacity={0.85}
    >
      {article.imageUrl ? (
        <Image
          source={{ uri: article.imageUrl }}
          style={[styles.image, featured && styles.featuredImage]}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.imagePlaceholder, featured && styles.featuredImage]}>
          <Text style={styles.placeholderIcon}>📰</Text>
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.meta}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{article.category.toUpperCase()}</Text>
          </View>
          <Text style={styles.time}>{formatRelativeTime(article.publishedAt)}</Text>
        </View>
        <Text style={[styles.title, featured && styles.featuredTitle]} numberOfLines={featured ? 3 : 2}>
          {article.title}
        </Text>
        {article.description && !featured && (
          <Text style={styles.description} numberOfLines={2}>
            {article.description}
          </Text>
        )}
        <View style={styles.footer}>
          <Text style={styles.source}>{article.source}</Text>
          {article.author && <Text style={styles.author} numberOfLines={1}>by {article.author}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  featuredContainer: { marginBottom: Spacing.lg },
  image: { width: '100%', height: 180 },
  featuredImage: { height: 220 },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: { fontSize: 48 },
  content: { padding: Spacing.md },
  meta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.xs },
  badge: {
    backgroundColor: Colors.primaryDark,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: { ...Typography.caption, color: Colors.white, fontWeight: '700' },
  time: { ...Typography.caption, color: Colors.textMuted },
  title: { ...Typography.h4, color: Colors.text, marginBottom: Spacing.xs },
  featuredTitle: { ...Typography.h3 },
  description: { ...Typography.bodySmall, color: Colors.textSecondary, marginBottom: Spacing.sm },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  source: { ...Typography.caption, color: Colors.primary, fontWeight: '600' },
  author: { ...Typography.caption, color: Colors.textMuted, flex: 1, textAlign: 'right', marginLeft: Spacing.sm },
});
