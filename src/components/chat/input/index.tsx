'use client';

import { MessageService } from '@/service/chat/MessageService';
import SendIcon from '@mui/icons-material/Send';
import { IconButton, Paper, TextField } from '@mui/material';
import { useRef, useEffect, useState } from 'react';

interface ChatInputProps {
  conversasId: number;
  message: string;
  setMessage: (msg: string) => void;
  onSend: (message: string) => void;
}

export function ChatInput({ conversasId, message, setMessage, onSend }: ChatInputProps) {
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const service = new MessageService();

  const handleSend = async () => {
    if (!message.trim() || isSending) return;

    try {
      setIsSending(true);
      onSend(message);
      await service.postMessage(conversasId, message);
      setMessage('');
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [message, conversasId]);

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
        padding: '8px',
        marginTop: '8px',
        borderRadius: 'var(--radius)',
        backgroundColor: 'var(--input)',
        position: 'sticky',
        bottom: 0,
        zIndex: 10,
      }}
      elevation={0}
    >
      <TextField
        fullWidth
        variant="standard"
        placeholder="Digite sua mensagem..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        inputRef={inputRef}
        sx={{
          input: {
            color: 'var(--foreground)',
          },
          '& .MuiInput-underline:before': {
            borderBottom: `2px solid var(--border)`,
          },
          '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: `2px solid var(--primary)`,
          },
          '& .MuiInput-underline:after': {
            borderBottom: `2px solid var(--primary)`,
          },
        }}
        disabled={isSending}
      />

      <IconButton
        type="submit"
        sx={{
          color: 'var(--primary)',
          '&:disabled': {
            opacity: 0.5,
          },
        }}
        disabled={isSending}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
