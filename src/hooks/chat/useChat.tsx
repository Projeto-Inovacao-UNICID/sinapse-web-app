import { useEffect, useState } from 'react';
import { Chat, Contact } from '@/types';
import { ChatService } from '@/service/chat/ChatService';

/**
 * Hook para buscar a lista de contatos e conversas.
 */
export function useChatContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const service = new ChatService();
        const result = await service.getChatsAndFriends();
        setContacts(result);
      } catch (err: any) {
        setError(err.message ?? 'Erro ao carregar contatos');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return { contacts, loading, error };
}

interface UseChatProps {
  conversaId: number;
}

/**
 * Hook para buscar informações da conversa.
 */
export function useChat({ conversaId }: UseChatProps) {
  const [chat, setChat] = useState<Chat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChat = async () => {
      setLoading(true);
      setError(null); // limpa erro anterior antes de nova tentativa

      try {
        const service = new ChatService();
        const result = await service.getChat(conversaId);
        setChat(result);
      } catch (err: any) {
        setError(err.message ?? 'Erro ao carregar conversa');
        setChat(null);
      } finally {
        setLoading(false);
      }
    };

    fetchChat();
  }, [conversaId]);

  return { chat, loading, error };
}