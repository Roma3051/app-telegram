import React from 'react';
import { View, FlatList } from 'react-native';
import PagerView from 'react-native-pager-view';
import { Chat, ChatTag } from '../../store/chats/chatsTypes';
import ChatItem from './chat-item';
import SwipeableRow from '../swipeable-row';

type Tab = { key: ChatTag; title: string; badge?: number };

type Props = {
  tabs: Tab[];
  page: any; 
  getData: (key: ChatTag) => Chat[];
  onPin: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onOpenChat: (id: string) => void;
};

const ChatsPager: React.FC<Props> = ({ tabs, page, getData, onPin, onArchive, onDelete, onOpenChat }) => {
  return (
    <PagerView
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ flex: 1 }}
      initialPage={0}
      onPageSelected={(e) => {
        page.value = e.nativeEvent.position;
      }}
      onPageScroll={(e) => {
        page.value = e.nativeEvent.position + e.nativeEvent.offset;
      }}
    >
      {tabs.map((t) => (
        // eslint-disable-next-line react-native/no-inline-styles
        <View key={t.key} style={{ flex: 1 }}>
          <FlatList
            data={getData(t.key)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SwipeableRow
                onPin={() => onPin(item.id)}
                onArchive={() => onArchive(item.id)}
                onDelete={() => onDelete(item.id)}
              >
                <ChatItem chat={item} onPress={() => onOpenChat(item.id)} />
              </SwipeableRow>
            )}
          />
        </View>
      ))}
    </PagerView>
  );
};

export default ChatsPager;
