// src/components/chat/Chat.tsx
'use client';

import React, { useState, FormEvent } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Message } from '@/types';

export interface ChatProps {
  conversaId: number | null;
  selectedId: string;         // ID do outro usuário
  messages: Message[];
  handleSend: (conteudo: string) => void;
}

export function Chat({
  conversaId,
  selectedId,
  messages,
  handleSend
}: ChatProps) {
  const [input, setInput] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const texto = input.trim();
    if (!texto || conversaId === null) return;
    handleSend(texto);
    setInput('');
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      {/* Lista de mensagens */}
      <Box flex={1} overflow="auto" p={2} sx={{ backgroundColor: 'background.paper' }}>
        {messages.map(msg => {
          const isOther = msg.remetenteId === selectedId;
          const justify = isOther ? 'flex-start' : 'flex-end';
          const bgcolor = isOther ? 'grey.300' : 'primary.main';
          const color  = isOther ? 'text.primary' : 'common.white';

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
                <Typography variant="body2">{msg.conteudo}</Typography>
                <Typography
                  variant="caption"
                  sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}
                >
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </Typography>
              </Paper>
            </Box>
          );
        })}
      </Box>

      {/* Input */}
      <Box
        component="form"
        onSubmit={onSubmit}
        display="flex"
        alignItems="center"
        p={1}
        sx={{ borderTop: '1px solid', borderColor: 'divider' }}
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={conversaId === null}
        />
        <IconButton
          type="submit"
          color="primary"
          disabled={!input.trim() || conversaId === null}
          sx={{ ml: 1 }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
