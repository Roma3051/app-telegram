import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import spacing from '../theme/spacing';

const EmptyArchive = () => (
  <Text style={styles.empty}>Архів порожній</Text>
);

const styles = StyleSheet.create({
  empty: { color: colors.subtext, textAlign: 'center', marginTop: spacing.lg },
});

export default EmptyArchive;
