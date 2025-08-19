import React, { useState } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, Platform, StatusBar } from 'react-native';
import colors from '../../theme/colors';
import { useChats } from '../../context/chat-context';
import ChatItem from '../../components/chat/chat-item';
import SwipeableRow from '../../components/swipeable-row';

import SearchBar from '../../components/chat/search-bar';
import EmptyArchive from '../../components/empty-archive';

export default function ArchivedChatsScreen() {
  const { archived, archive, remove } = useChats();
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <SearchBar value={search} onChange={setSearch} placeholder="Пошук в архіві" />

        <FlatList
          data={archived(search)}
          keyExtractor={(i) => i.id}
          ListEmptyComponent={<EmptyArchive />}
          renderItem={({ item }) => (
            <SwipeableRow
              onArchive={() => archive(item.id)}  
              onDelete={() => remove(item.id)}
            >
              <ChatItem chat={item} onPress={() => {}} />
            </SwipeableRow>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: { flex: 1, backgroundColor: colors.background, paddingTop: 5 },
});
