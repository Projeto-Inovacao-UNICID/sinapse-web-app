'use client';

import { useMessages } from '@/hooks/chat/useMessages';
import { colors } from '@/theme/colors';
import { Message } from '@/types';
import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';

interface ChatMessagesProps {
  newMessages: Message[];
  contactId: string;
  conversaId: number;
}

export function ChatMessages({ newMessages, contactId, conversaId }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { data: messages = [], isLoading, isError, error } = useMessages({ conversaId });

  // Scroll automático quando mensagens mudam
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, newMessages]);

  // Combinar mensagens e remover duplicadas por ID
  const allMessages = useMemo(() => {
    const all = [...messages, ...newMessages];
    const uniqueMap = new Map<number, Message>();
    all.forEach((msg) => uniqueMap.set(msg.id, msg));
    return Array.from(uniqueMap.values()).sort((a, b) => a.id - b.id); // ordena por ID 
  }, [messages, newMessages]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography color="error">
          {(error as Error).message ?? 'Erro ao carregar mensagens'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        gap: 1,
        height: `calc(100vh - 65px - 80px)`,
        backgroundColor: 'var(--bgSecondary)',
      }}
    >
      {allMessages.map((msg) => (
        <Box
          key={msg.id}
          sx={{
            display: 'flex',
            justifyContent: msg.remetenteId === contactId ? 'flex-start' : 'flex-end',
          }}
        >
          <Paper
            elevation={1}
            sx={{
              p: 1.5,
              px: 2,
              bgcolor: msg.remetenteId === contactId ? colors.green : colors.primary,
              color: colors.white,
              maxWidth: '70%',
              borderRadius: 3,
              borderBottomRightRadius: msg.remetenteId === contactId ? 3 : 0,
              borderBottomLeftRadius: msg.remetenteId === contactId ? 0 : 3,
            }}
          >
            <Typography variant="body1">{msg.conteudo}</Typography>
          </Paper>
        </Box>
      ))}
      <div ref={bottomRef} />
    </Box>
  );
}
