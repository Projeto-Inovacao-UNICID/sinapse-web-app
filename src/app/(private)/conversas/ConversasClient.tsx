'use client';

import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { ContactList } from '@/components/chat/contact-list';
import { useChatContacts } from '@/hooks/chat/useChatContacts';
import { useChatSocket } from '@/hooks/chat/useChatSocket';
import { useSSE } from '@/hooks/useSSE';
import { NotificationDto } from '@/types/notification';
import { Message } from '@/types';
import { Chat } from '@/components/chat';
import { motion } from 'framer-motion';
import { ChatService } from '@/service/chat/ChatService';

export default function ConversasClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialId = searchParams.get('participanteId') || '';

  const [selectedId, setSelectedId] = useState<string>(initialId);
  const [conversaId, setConversaId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const { data: contacts = [], isLoading, isError, error } = useChatContacts();
  const chatService = new ChatService();

  console.log('contacts', contacts);

  const handleReceive = useCallback((msg: Message) => {
    setMessages(prev => (prev.some(m => m.id === msg.id) ? prev : [...prev, msg]));
  }, []);

  const { isConnected, sendMessage } = useChatSocket({
    destId: selectedId,
    onMessage: handleReceive,
  });

  const handleSend = useCallback(
    (conteudo: string) => {
      if (conversaId === null) return;
      sendMessage({ conteudo });
    },
    [conversaId, sendMessage]
  );

  const handleSelect = useCallback(
    (id: string, convId: number) => {
      setSelectedId(id);
      setConversaId(convId);
      setMessages([]);
      router.push(`/conversas?participanteId=${id}`);
    },
    [router]
  );

  // 💡 Cria ou busca a conversa automaticamente se participanteId for passado
  useEffect(() => {
    if (!initialId || conversaId) return;

    const iniciarConversa = async () => {
      try {
        const res = await chatService.postChat(initialId);
        const conversaId = res?.id;

        if (typeof conversaId !== 'number') {
          console.error('ID da conversa inválido');
          return;
        }

        setSelectedId(initialId);
        setConversaId(conversaId);
        router.push(`/conversas?participanteId=${initialId}`);
      } catch (err) {
        console.error('Erro ao iniciar conversa via URL:', err);
      }
    };

    iniciarConversa();
  }, [initialId, conversaId, router]);

  return (
    <Grid container spacing={1}>
      <Grid size={3}>
        {isLoading ? (
          <CircularProgress />
        ) : isError ? (
          <div>Erro: {error!.message}</div>
        ) : (
          <ContactList contacts={contacts} onSelect={handleSelect} />
        )}
      </Grid>

      <Grid size={9} sx={{ height: 'calc(100vh - 65px - 1rem)' }}>
        {selectedId ? (
          <Chat
            conversaId={conversaId}
            selectedId={selectedId}
            messages={messages}
            handleSend={handleSend}
          />
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 2,
              borderRadius: 2,
              gap: 2,
            }}
          >
            <motion.img
              src="/assets/logo.png"
              alt="Logo"
              style={{ height: '4rem' }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
            />
            <Typography color="var(--foreground)" variant="h5" sx={{ fontWeight: 'bold' }}>
              Selecione um contato para conversar
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
