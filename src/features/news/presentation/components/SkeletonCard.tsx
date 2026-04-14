import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors, Spacing } from '../../../../theme';

interface SkeletonBoxProps {
  width: number | `${number}%`;
  height: number;
  borderRadius?: number;
  style?: object;
}

const SkeletonBox: React.FC<SkeletonBoxProps> = ({
  width, height, borderRadius = 8, style,
}) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        { width, height, borderRadius, backgroundColor: Colors.shimmer.highlight, opacity },
        style,
      ]}
    />
  );
};

export const SkeletonCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <SkeletonBox width="100%" height={180} borderRadius={0} />
      <View style={styles.content}>
        <View style={styles.meta}>
          <SkeletonBox width={80} height={20} borderRadius={6} />
          <SkeletonBox width={60} height={14} borderRadius={4} />
        </View>
        <SkeletonBox width="100%" height={22} borderRadius={4} style={styles.titleLine} />
        <SkeletonBox width="75%" height={22} borderRadius={4} style={styles.titleLine} />
        <SkeletonBox width="100%" height={16} borderRadius={4} style={styles.descLine} />
        <SkeletonBox width="60%" height={16} borderRadius={4} style={styles.descLine} />
        <View style={styles.footer}>
          <SkeletonBox width={80} height={14} borderRadius={4} />
          <SkeletonBox width={100} height={14} borderRadius={4} />
        </View>
      </View>
    </View>
  );
};

export const SkeletonList: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  content: { padding: Spacing.md },
  meta: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm },
  titleLine: { marginBottom: 8 },
  descLine: { marginBottom: 6 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.xs },
});
