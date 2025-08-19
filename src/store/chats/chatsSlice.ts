import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chat } from './chatsTypes';
import { initialChats } from '../../data/chats';

interface ChatsState {
  chats: Chat[];
}

const initialState: ChatsState = {
  chats: initialChats,
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    pinChat: (state, action: PayloadAction<string>) => {
      const chat = state.chats.find(c => c.id === action.payload);
      if (chat) chat.pinned = !chat.pinned;
    },
    archiveChat: (state, action: PayloadAction<string>) => {
      const chat = state.chats.find(c => c.id === action.payload);
      if (chat) chat.archived = !chat.archived;
    },
    deleteChat: (state, action: PayloadAction<string>) => {
      state.chats = state.chats.filter(c => c.id !== action.payload);
    },
    updateChatMessage: (state, action: PayloadAction<{ id: string; message: string }>) => {
      const chat = state.chats.find(c => c.id === action.payload.id);
      if (chat) chat.message = action.payload.message;
    },
  },
});

export const { pinChat, archiveChat, deleteChat, updateChatMessage } = chatsSlice.actions;
export default chatsSlice.reducer;
