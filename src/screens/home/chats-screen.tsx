import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

import colors from '../../theme/colors';
import { ChatTag } from '../../store/chats/chatsTypes';
import { useChatStore } from '../../hooks/chat-store';

import SearchBar from '../../components/chat/search-bar';
import ChatsTabs from '../../components/chat/chats-tabs';
import ChatsPager from '../../components/chat/chats-pager';

const TABS: { key: ChatTag; title: string; badge?: number }[] = [
  { key: 'all', title: 'All' },
  { key: 'main', title: 'Main' },
  { key: 'work', title: 'Work', badge: 2 },
  { key: 'fe', title: 'Front-end', badge: 7 },
  { key: 'kl', title: 'KI', badge: 2 },
];

const ChatsScreen: React.FC = () => {
  const { list, pin, archive, remove } = useChatStore();
  const [search, setSearch] = useState('');
  const navigation = useNavigation<any>();
  const page = useSharedValue(0);

  const getData = (key: ChatTag) => list(key, search);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search chats" />

        <ChatsTabs tabs={TABS} page={page as Animated.SharedValue<number>} />

        <ChatsPager
          tabs={TABS}
          page={page}
          getData={getData}
          onPin={pin}
          onArchive={archive}
          onDelete={remove}
          onOpenChat={(id) => navigation.navigate('ChatScreen', { chatId: id })}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: { flex: 1, backgroundColor: colors.background, paddingTop: 5 },
});

export default ChatsScreen;
