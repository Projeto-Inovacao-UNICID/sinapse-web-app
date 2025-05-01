'use client';

import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import { ContactList } from '@/components/chat/contact-list';
import { useChatContacts } from '@/hooks/chat/useChatContacts';
import { useChatSocket } from '@/hooks/chat/useChatSocket';
import { Message } from '@/types';
import { Chat } from '@/components/chat';
import { motion } from 'framer-motion';
import { ChatService } from '@/service/chat/ChatService';

export default function ConversasClient() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const initialId    = searchParams.get('participanteId') || '';

  const [selectedId, setSelectedId] = useState<string>(initialId);
  const [conversaId, setConversaId] = useState<number | null>(null);
  const [messages,   setMessages]   = useState<Message[]>([]);

  const { data: contacts = [], isLoading, isError, error } = useChatContacts();
  const chatService = new ChatService();
  const queryClient = useQueryClient();

  /* --------------------------------------------------------- */
  /* deduplicação de mensagens recebidas                       */
  /* --------------------------------------------------------- */
  const handleReceive = useCallback((msg: Message) => {
    setMessages(prev =>
      prev.some(m => m.id === msg.id) ? prev : [...prev, msg]
    );
  }, []);

  /* --------------------------------------------------------- */
  /* WebSocket                                                 */
  /* --------------------------------------------------------- */
  const { isConnected, sendMessage } = useChatSocket({
    destId: conversaId ? selectedId : '',
    onMessage: handleReceive,
  });

  /* —— QUANDO O WS CONECTA, REFRESH —— */
  useEffect(() => {
    if (isConnected) {
      queryClient.invalidateQueries({ queryKey: ['chatContacts'] });
    }
  }, [isConnected, queryClient]);                        // 👉 NOVO

  /* --------------------------------------------------------- */
  /* envio de mensagem via WS                                  */
  /* --------------------------------------------------------- */
  const handleSend = useCallback(
    (conteudo: string) => {
      if (conversaId === null) return;
      sendMessage({ conteudo });
    },
    [conversaId, sendMessage]
  );

  /* --------------------------------------------------------- */
  /* seleção (ou criação) de conversa                          */
  /* --------------------------------------------------------- */
  const handleSelect = useCallback(
    async (id: string, convId: number | null) => {
      setMessages([]);

      let cid = convId;
      if (cid == null) {
        try {
          const res = await chatService.postChat(id);
          cid = res.id;
          await queryClient.invalidateQueries({ queryKey: ['chatContacts'] });
        } catch (e) {
          console.error('Erro ao criar conversa', e);
          return;
        }
      }

      setSelectedId(id);
      setConversaId(cid!);
      router.push(`/conversas?participanteId=${id}`);
    },
    [router, queryClient]
  );

  /* --------------------------------------------------------- */
  /* acesso direto por URL (?participanteId=)                  */
  /* --------------------------------------------------------- */
  useEffect(() => {
    if (!initialId || conversaId) return;

    (async () => {
      try {
        const res = await chatService.postChat(initialId);
        setSelectedId(initialId);
        setConversaId(res.id);
        await queryClient.invalidateQueries({ queryKey: ['chatContacts'] });
        router.push(`/conversas?participanteId=${initialId}`);
      } catch (err) {
        console.error('Erro ao iniciar conversa pela URL:', err);
      }
    })();
  }, [initialId, conversaId, router, queryClient]);

  /* --------------------------------------------------------- */
  /* render                                                    */
  /* --------------------------------------------------------- */
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr minmax(0, 8fr) 2fr',
        minHeight: 'calc(100vh - 65px - 1rem)',
      }}
    >
      <Grid container spacing={1} sx={{ gridColumn: '2' }}>
        {/* lista de contatos */}
        <Grid size={3}>
          {isLoading ? (
            <CircularProgress />
          ) : isError ? (
            <div>Erro: {error!.message}</div>
          ) : (
            <ContactList contacts={contacts} onSelect={handleSelect} />
          )}
        </Grid>

        {/* painel de chat */}
        <Grid size={9} sx={{ height: 'calc(100vh - 65px - 1rem)' }}>
          {selectedId ? (
            isConnected ? (
              <Chat
                conversaId={conversaId}
                selectedId={selectedId}
                messages={messages}
                handleSend={handleSend}
              />
            ) : (
              /* spinner enquanto o socket conecta */
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
              </Box>
            )
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
    </div>
  );
}
