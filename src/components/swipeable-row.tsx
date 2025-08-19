import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import colors from '../theme/colors';

type Props = {
  children: React.ReactNode;
  onPin?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
};

const ACTION_W = 68;
const OPEN_X = -ACTION_W * 3;

const SwipeableRow: React.FC<Props> = ({ children, onPin, onArchive, onDelete }) => {
  const translateX = useSharedValue(0);

  const onGestureEvent = (e: any) => {
    const { translationX } = e.nativeEvent;
    translateX.value = Math.min(0, translationX);
  };

  const onHandlerEnd = (e: any) => {
    const { translationX, velocityX } = e.nativeEvent;
    const shouldOpen = translationX < OPEN_X * 0.4 || velocityX < -500;
    translateX.value = withSpring(shouldOpen ? OPEN_X : 0, { damping: 18, stiffness: 180 });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const close = () => (translateX.value = withTiming(0, { duration: 150 }));

  const aRow = useAnimatedStyle(() => ({ transform: [{ translateX: translateX.value }] }));

  const Action = useMemo(
    () =>
      // eslint-disable-next-line react/no-unstable-nested-components
      ({ color, label, onPress }: { color: string; label: string; onPress?: () => void }) =>
        (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              close();
              onPress && onPress();
            }}
            style={[styles.action, { backgroundColor: color }]}
          >
            <Text style={styles.actionText}>{label}</Text>
          </TouchableOpacity>
        ),
    [close]
  );

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <Action color={colors.accent} label="📌" onPress={onPin} />
        <Action color={colors.success} label="📦" onPress={onArchive} />
        <Action color={colors.danger} label="🗑" onPress={onDelete} />
      </View>
      <PanGestureHandler onGestureEvent={onGestureEvent} onEnded={onHandlerEnd}>
        <Animated.View style={[styles.card, aRow]}>{children}</Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
  actions: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: ACTION_W * 3,
    flexDirection: 'row',
  },
  action: { width: ACTION_W, alignItems: 'center', justifyContent: 'center' },
  actionText: { fontSize: 20, color: '#fff' },
  card: { backgroundColor: colors.background },
});

export default SwipeableRow;
