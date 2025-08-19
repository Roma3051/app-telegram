import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';

type Props = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string; 
};

const SearchBar: React.FC<Props> = ({
  value,
  onChange,
  placeholder = 'Search', 
}) => (
  <TextInput
    placeholder={placeholder}
    placeholderTextColor={colors.subtext}
    style={styles.search}
    value={value}
    onChangeText={onChange}
  />
);

const styles = StyleSheet.create({
  search: {
    margin: spacing.md,
    padding: spacing.md,
    borderRadius: 8,
    backgroundColor: colors.surface,
    color: colors.text,
  },
});

export default SearchBar;
