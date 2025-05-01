'use client';

import SendIcon from '@mui/icons-material/Send';
import { IconButton, Paper, TextField } from '@mui/material';
import { useRef, useEffect, useState } from 'react';

interface ChatInputProps {
  conversasId: number;           // ainda chega, mas não é usado aqui
  message: string;
  setMessage: (msg: string) => void;
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({
  message,
  setMessage,
  onSend,
  disabled = false,
}: ChatInputProps) {
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSend = async () => {
    if (!message.trim() || isSending) return;

    try {
      setIsSending(true);
      onSend(message);   // dispara via WebSocket (handleSend em ConversasClient)
      setMessage('');    // limpa o campo
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [message, disabled]);

  if (disabled) return null;

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
          input: { color: 'var(--foreground)' },
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
        disabled={isSending || disabled}
      />

      <IconButton
        type="submit"
        sx={{
          color: 'var(--primary)',
          '&:disabled': { opacity: 0.5 },
        }}
        disabled={isSending || disabled}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
