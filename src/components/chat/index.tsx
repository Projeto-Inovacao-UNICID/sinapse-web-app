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
        sx={{
          overflowY: 'auto',
          backgroundColor: 'var(--bgSecondary)',
          borderRadius: '0 8px 0 0',
          p: 2,
          flex: 1
        }}
      >
        {messages.map(msg => {
          const isOther = msg.remetenteId === selectedId;
          const justify = isOther ? 'flex-start' : 'flex-end';
          const bgcolor = isOther ? 'var(--cardSecondary)' : 'var(--primary)';
          const color  = isOther ? 'var(--foreground)' : 'white';
          const borderRadius = isOther ? '99px 99px 99px 0' : '99px 99px  0 99px';

          return (
            <Box key={msg.id} sx={{ display: 'flex', justifyContent: justify, mb: 1 }}>
              <Box>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    bgcolor,
                    color,
                    borderRadius
                  }}
                >
                  <Typography variant="body2" sx={{ fontSize: '1rem', mb: 0.5 }}>{msg.conteudo}</Typography>
                </Paper>
                <Typography
                  variant="caption"
                  sx={{ display: 'block', textAlign: 'right', fontSize: '0.5rem' }}
                >
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </Typography>
              </Box>
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
