'use client';

import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { ContactList } from '@/components/chat/contact-list';
import { useChatContacts } from '@/hooks/chat/useChatContacts';
import { useChatSocket } from '@/hooks/chat/useChatSocket';
import { useSSE } from '@/hooks/useSSE';          // << seu hook SSE
import { NotificationDto } from '@/types/notification';
import { Message } from '@/types';
import { Chat } from '@/components/chat';
import { motion } from 'framer-motion';

export default function ConversasClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialUserId = searchParams.get('userId') || '';

  const [selectedId, setSelectedId] = useState<string>(initialUserId);
  const [conversaId, setConversaId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const { data: contacts = [], isLoading, isError, error } = useChatContacts();

  console.log('contacts', contacts);

  // callback para receber mensagens via WS
  const handleReceive = useCallback((msg: Message) => {
    setMessages(prev =>
      prev.some(m => m.id === msg.id) ? prev : [...prev, msg]
    );
  }, []);

  // WebSocket hook
  const { isConnected, sendMessage } = useChatSocket({
    destId: selectedId,
    onMessage: handleReceive,
  });

  // SSE de notificações
  useSSE<NotificationDto>(
    '/conversas/notificacoes/sse',
    ({ conversaId: notiConvId, lastMessage, lastMessageAt }) => {
      // se for a conversa ativa, empurra uma "mensagem fake" pra UI
      if (conversaId === notiConvId) {
        handleReceive({
          id: Date.now(),           // temporário
          conversaId: notiConvId,
          remetenteTipo: 'OUTRO',   // ou 'usuario' se quiser uniformizar
          remetenteId: selectedId,  // id do outro
          conteudo: lastMessage,
          createdAt: lastMessageAt,
          editada: false,
          removida: false,
        });
      }
    }
  );

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
      router.push(`/conversas?userId=${id}`);
    },
    [router]
  );

  useEffect(() => {
    if (!selectedId) return;
    const contato = contacts.find(c => c.participanteId === selectedId);
    if (contato) setConversaId(contato.conversaId);
  }, [selectedId, contacts]);

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

      <Grid size={9} sx={{ height: 'calc(100vh - 65px - 1rem  )' }}>
         {/* <div style={{ marginBottom: 8 }}>
          WS: {isConnected ? '🔵 Conectado' : '⚪ Desconectado'}
        </div>
          */}
        {selectedId ?
          <Chat
            conversaId={conversaId}
            selectedId={selectedId}
            messages={messages}
            handleSend={handleSend}
          />
          : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2, borderRadius: 2, gap: 2 }}>
              <motion.img
                src="/assets/logo.png"
                alt="Logo"
                style={{ height: '4rem' }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 10,
                  ease: 'linear',
                }}
              />
              <Typography color="var(--foreground)" variant="h5" sx={{ fontWeigh: 'bold' }}>Selecione um contato para conversar</Typography>
          </Box>
        }
      </Grid>
    </Grid>
  );
}
