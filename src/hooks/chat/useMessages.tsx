import { MessageService } from '@/service/chat/MessageService';
import { Message } from '@/types';
import { useEffect, useState } from 'react';

interface UseMessagesProps {
  conversaId: number;
}

/**
 * Hook para buscar mensagens de uma conversa.
 */
export function useMessages({ conversaId }: UseMessagesProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError(null); 

      try {
        const service = new MessageService();
        const result = await service.getMessages(conversaId);
        setMessages(result);
      } catch (err: any) {
        setError(err.message ?? 'Erro ao carregar mensagens');
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [conversaId]);

  return { messages, loading, error };
}
