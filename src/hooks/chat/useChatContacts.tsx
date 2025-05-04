import { useQuery } from '@tanstack/react-query';
import { ChatService } from '@/service/chat/ChatService';
import { Contact } from '@/types';

export function useChatContacts() {
  return useQuery<Contact[], Error>({
    queryKey: ['chat-contacts'],
    queryFn: async () => {
      const service = new ChatService();
      return service.getChatsAndFriends();
    },
    staleTime: 1000 * 60,
  });
}
