import { useChatStore } from '../hooks/chat-store';

export type ChatContextValue = ReturnType<typeof useChatStore>;

export const useChats = (): ChatContextValue => {
  return useChatStore();
};
