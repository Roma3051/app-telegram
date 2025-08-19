import React from 'react';
import { ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import TabLabel from '../../components/tab-bar';
import { ChatTag } from '../../store/chats/chatsTypes';

type Tab = { key: ChatTag; title: string; badge?: number };

type Props = {
  tabs: Tab[];
  page: Animated.SharedValue<number>;
};

const ChatsTabs: React.FC<Props> = ({ tabs, page }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    // eslint-disable-next-line react-native/no-inline-styles
    contentContainerStyle={{ paddingHorizontal: 8 }}
    // eslint-disable-next-line react-native/no-inline-styles
    style={{ maxHeight: 46 }}
  >
    {tabs.map((t, i) => (
      <TabLabel
        key={t.key}
        title={t.title}
        badge={t.badge}
        index={i}
        currentPage={page}
        onPress={() => { page.value = i; }}
      />
    ))}
  </ScrollView>
);

export default ChatsTabs;
