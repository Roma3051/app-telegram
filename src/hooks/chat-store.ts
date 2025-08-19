import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Chat, ChatTag } from '../store/chats/chatsTypes';
import { pinChat, archiveChat, deleteChat } from '../store/chats/chatsSlice';

export const useChatStore = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state: RootState) => state.chats.chats);

  const sort = (arr: Chat[]) =>
    arr.filter(c => !c.archived).sort((a, b) => Number(b.pinned) - Number(a.pinned));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const list = (tag: ChatTag, search: string) => {
    const pool = tag === 'all' ? chats : chats.filter(c => c.tags.includes(tag));
    return sort(pool).filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const archived = (search: string) =>
    chats
      .filter(c => c.archived)
      .filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pin = (id: string) => dispatch(pinChat(id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const archive = (id: string) => dispatch(archiveChat(id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const remove = (id: string) => dispatch(deleteChat(id));

  return useMemo(() => ({ chats, list, archived, pin, archive, remove }), [archive, archived, chats, list, pin, remove]);
};
