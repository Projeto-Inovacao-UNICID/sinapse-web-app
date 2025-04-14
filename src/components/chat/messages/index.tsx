'use client';

import { colors } from '@/theme/colors';
import { Box, Typography, Paper } from '@mui/material';
import { useEffect, useRef } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
}

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Scrolla automaticamente para a última mensagem
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        gap: 1,
        maxHeight: '70vh',
      }}
    >
      {messages.map((msg) => (
        <Box
          key={msg.id}
          sx={{
            display: 'flex',
            justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start',
          }}
        >
          <Paper
            elevation={1}
            sx={{
              p: 1.5,
              px: 2,
              bgcolor: msg.sender === 'me' ? colors.primary : colors.green,
              color: colors.white,
              maxWidth: '70%',
              borderRadius: 3,
              borderBottomRightRadius: msg.sender === 'me' ? 0 : 3,
              borderBottomLeftRadius: msg.sender === 'me' ? 3 : 0,
            }}
          >
            <Typography variant="body1">{msg.text}</Typography>
          </Paper>
        </Box>
      ))}
      <div ref={bottomRef} />
    </Box>
  );
}
