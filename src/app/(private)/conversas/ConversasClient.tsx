'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

import { ContactList } from '@/components/chat/contact-list';
import { useChatContacts } from '@/hooks/chat/useChatContacts';
import { useChatSocket } from '@/hooks/chat/useChatSocket';
import { ChatService } from '@/service/chat/ChatService';
import { Chat } from '@/components/chat';
import { Message } from '@/types';

export default function ConversasClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialId = searchParams.get('participanteId') || '';
  const seenSignatures = useRef<Set<string>>(new Set());

  const [selectedId, setSelectedId] = useState<string>(initialId);
  const [conversaId, setConversaId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const { data: contacts = [], isLoading, isError, error } = useChatContacts();
  const chatService = new ChatService();

  const handleReceive = useCallback((msg: Message) => {
    const sig = `${msg.userId}_${msg.conteudo}_${msg.createdAt}`;
    if (seenSignatures.current.has(sig)) return;
    seenSignatures.current.add(sig);
    setMessages(prev => [...prev, msg]);
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

  const resetConversation = useCallback(() => {
    seenSignatures.current.clear();
    setMessages([]);
  }, []);

  const handleSelect = useCallback(
    (id: string, convId: number) => {
      resetConversation();
      setSelectedId(id);
      setConversaId(convId);
      router.push(`/conversas?participanteId=${id}`);
    },
    [router, resetConversation]
  );

  // Se houve participanteId na URL, inicia a conversa automaticamente
  useEffect(() => {
    if (!initialId || conversaId) return;

    (async () => {
      try {
        const res = await chatService.postChat(initialId);
        if (typeof res.id !== 'number') {
          console.error('ID de conversa inválido', res);
          return;
        }
        resetConversation();
        setConversaId(res.id);
        setSelectedId(initialId);
        router.push(`/conversas?participanteId=${initialId}`);
      } catch (err) {
        console.error('Erro ao iniciar conversa via URL:', err);
      }
    })();
  }, [initialId, conversaId, router, chatService, resetConversation]);

  return (
    <Box
      display="grid"
      gridTemplateColumns="1fr minmax(0, 10fr) 1fr"
      minHeight="calc(100vh - 65px - 1rem)"
    >
      <Box
        gridColumn={2}
        display="grid"
        gridTemplateColumns="3fr 9fr"
      >
        {/* Lista de contatos */}
        <Box>
          {isLoading ? (
            <CircularProgress />
          ) : isError ? (
            <Typography color="error">
              Erro: {error?.message}
            </Typography>
          ) : (
            <ContactList
              contacts={contacts}
              selectedId={selectedId}
              onSelect={handleSelect}
            />
          )}
        </Box>

        {/* Área de chat */}
        <Box sx={{ height: 'calc(100vh - 65px - 1rem)' }}>
          {selectedId ? (
            isConnected ? (
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
                  height: '100%',
                }}
              >
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
                height: '100%',
              }}
            >
              <motion.img
                src="/assets/logo.png"
                alt="Logo"
                style={{ height: '4rem' }}
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: 'linear',
                }}
              />
              <Typography
                variant="h5"
                sx={{ fontWeight: 'bold', color: 'var(--foreground)' }}
              >
                Selecione um contato para conversar
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
