import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import colors from '../theme/colors';

type Props = {
  title: string;
  index: number;
  currentPage: Animated.SharedValue<number>;
  badge?: number;
  onPress?: () => void;
};

const TabLabel: React.FC<Props> = ({ title, index, currentPage, badge, onPress }) => {
  const dotStyle = useAnimatedStyle(() => {
    const width = interpolate(
      currentPage.value,
      [index - 1, index, index + 1],
      [0, 18, 0],
      Extrapolation.CLAMP
    );
    return { width };
  });

  return (
    <Pressable onPress={onPress} style={styles.wrapper}>
      <View style={styles.pill}>
        <Text style={styles.title}>{title}</Text>
        {!!badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>
      <Animated.View style={[styles.indicator, dotStyle]} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center', paddingHorizontal: 10 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#1c1c1e',
  },
  title: { color: '#ffffff', fontWeight: '600' }, 
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.badge,
    paddingHorizontal: 4,
  },
  badgeText: { color: '#ffffff', fontSize: 12 },
  indicator: {
    height: 2,
    marginTop: 6,
    borderRadius: 1,
    backgroundColor: colors.accent,
  },
});

export default TabLabel;
