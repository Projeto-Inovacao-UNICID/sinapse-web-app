'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box, Divider, Paper, Typography } from '@mui/material';
import { Message } from '@/types';
import { ChatInput } from '@/components/chat/input';

export interface ChatProps {
  conversaId: number | null;
  selectedId: string;
  messages: Message[];
  handleSend: (conteudo: string) => void;
}

export function Chat({
  conversaId,
  selectedId,
  messages,
  handleSend
}: ChatProps) {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box display="flex" flexDirection="column" height="100%">
      {/* Lista de mensagens */}
      <Box
        flex={1}
        p={2}
        sx={{
          overflowY: 'auto',
          backgroundColor: 'var(--card)',
          borderRadius: 2
        }}
      >
        {messages.map(msg => {
          const isOther = msg.remetenteId === selectedId;
          const justify = isOther ? 'flex-start' : 'flex-end';
          const bgcolor = isOther ? 'var(--cardSecondary)' : 'var(--primary)';
          const color  = isOther ? 'var(--foreground)' : 'white';

          return (
            <Box key={msg.id} display="flex" justifyContent={justify} mb={1}>
              <Paper
                elevation={1}
                sx={{
                  p: 1.5,
                  bgcolor,
                  color,
                  maxWidth: '70%',
                  borderRadius: 2
                }}
              >
                <Typography variant="body2" mb={0.5} sx={{ fontSize: '1rem' }}>{msg.conteudo}</Typography>
                <Divider/>
                <Typography
                  variant="caption"
                  sx={{ display: 'block', textAlign: 'right', fontSize: '0.5rem' }}
                >
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </Typography>
              </Paper>
            </Box>
          );
        })}
        <div ref={messagesEndRef} />
      </Box>

      {conversaId !== null && (
        <ChatInput
          conversasId={conversaId}
          message={message}
          setMessage={setMessage}
          onSend={handleSend}
        />
      )}
    </Box>
  );
}
