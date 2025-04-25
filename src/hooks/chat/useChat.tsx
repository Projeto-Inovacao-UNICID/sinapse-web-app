import { useQuery } from '@tanstack/react-query';
import { ChatService } from '@/service/chat/ChatService';
import { Chat } from '@/types';
import { Contact } from '@/types';

interface UseChatProps {
  conversaId: number;
}

export function useChat({ conversaId }: UseChatProps) {
  return useQuery<Chat>({
    queryKey: ['chat', conversaId],
    queryFn: async () => {
      const service = new ChatService();
      return await service.getChat(conversaId);
    },
    enabled: !!conversaId,
  });
}

export function useChatContacts() {
  return useQuery<Contact[]>({
    queryKey: ['chat-contacts'],
    queryFn: async () => {
      const service = new ChatService();
      return await service.getChatsAndFriends();
    },
    staleTime: 1000 * 60, 
  });
}
