import { RootState } from '../index';
import { ChatTag } from './chatsTypes';

export const selectAllChats = (state: RootState) => state.chats.chats;

export const selectPinnedChats = (state: RootState) =>
  state.chats.chats.filter(chat => chat.pinned);

export const selectArchivedChats = (state: RootState) =>
  state.chats.chats.filter(chat => chat.archived);

export const selectChatsByTag = (tag: ChatTag) => 
  (state: RootState) => state.chats.chats.filter(chat => chat.tags.includes(tag));
