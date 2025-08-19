import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import { Chat } from '../../store/chats/chatsTypes';

type Props = { chat: Chat; onPress: () => void };

const ChatItem: React.FC<Props> = ({ chat, onPress }) => {
  const avatarUri = chat.avatar || '';
  const name = chat.name || 'No name';
  const message = chat.message || '';
  const time = chat.time || '';
  const unread = chat.unread || 0;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      {avatarUri ? (
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, { backgroundColor: colors.avatar }]} />
      )}

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.message} numberOfLines={1}>{message}</Text>

          <View style={styles.badges}>
            {chat.pinned && <Text style={styles.pin}>📌</Text>}
            {chat.archived && <Text style={styles.archive}>🗄️</Text>}
            {unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{unread}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  content: {
    flex: 1,
    marginLeft: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
    paddingBottom: spacing.sm,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { color: colors.text, fontWeight: '600', flexShrink: 1 },
  message: { color: colors.subtext, maxWidth: '75%' },
  time: { color: colors.subtext, fontSize: 12 },
  badges: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  pin: { fontSize: 14 },
  archive: { fontSize: 14 },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.badge,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  unreadText: { color: colors.text, fontSize: 12 },
});

export default ChatItem;
