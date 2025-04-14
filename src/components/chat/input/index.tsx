'use client';

import { TextField, IconButton, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { bgColors, colors } from '@/theme/colors';

interface ChatInputProps {
  onSend: (message: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
  };

  return (
    <Paper
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSend();
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '4px 8px',
        borderRadius: 4,
        backgroundColor: bgColors.darkSecondary,
      }}
    >
      <TextField
          fullWidth
          variant="standard"
          placeholder="Digite sua mensagem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{
            input: { color: colors.white }, // cor do texto digitado
            '& .MuiInput-underline:before': {
              borderBottom: `2px solid ${colors.black}`, // normal
            },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
              borderBottom: `2px solid ${colors.primary}`, // hover
            },
            '& .MuiInput-underline:after': {
              borderBottom: `2px solid ${colors.primary}`, // focused
            },
          }}
        />

      <IconButton type="submit" sx={{ color: colors.primary }}> 

        <SendIcon />
      </IconButton>
    </Paper>
  );
}
