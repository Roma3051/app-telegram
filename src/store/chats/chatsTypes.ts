export type ChatTag = 'all' | 'main' | 'work' | 'fe' | 'kl';

export type Chat = {
  id: string;
  name: string;
  message: string;
  time: string;
  unread: number;
  pinned?: boolean;
  archived?: boolean;
  tags: ChatTag[];
  avatar?: string; 
};
