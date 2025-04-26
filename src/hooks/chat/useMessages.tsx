import { useQuery } from '@tanstack/react-query';
import { MessageService } from '@/service/chat/MessageService';
import { Message } from '@/types';

interface UseMessagesProps {
  conversaId: number;
}

export function useMessages({ conversaId }: UseMessagesProps) {
  return useQuery<Message[]>({
    queryKey: ['messages', conversaId],
    queryFn: async () => {
      const service = new MessageService();
      return await service.getMessages(conversaId);
    },
    enabled: !!conversaId,
    refetchOnWindowFocus: true,
  });
}