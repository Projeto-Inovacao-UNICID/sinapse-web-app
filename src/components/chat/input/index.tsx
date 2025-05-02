'use client';

import SendIcon from '@mui/icons-material/Send';
import { IconButton, Paper, TextField } from '@mui/material';
import { useRef, useEffect, useState } from 'react';

interface ChatInputProps {
  conversasId: number;
  message: string;
  setMessage: (msg: string) => void;
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({
  conversasId,
  message,
  setMessage,
  onSend,
  disabled = false
}: ChatInputProps) {
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSend = async () => {
    if (!message.trim() || isSending) return;
    setIsSending(true);
    try {
      onSend(message);
      setMessage('');
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, [message, conversasId, disabled]);

  if (disabled) return null;

  return (
    <Paper
      component="form"
      onSubmit={e => {
        e.preventDefault();
        handleSend();
      }}
      sx={{
        display: 'flex', alignItems: 'center', p: 1, mt: 1,
        borderRadius: 'var(--radius)', backgroundColor: 'var(--input)',
        position: 'sticky', bottom: 0, zIndex: 10,
      }}
      elevation={0}
    >
      <TextField
        fullWidth
        variant="standard"
        placeholder="Digite sua mensagem..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        inputRef={inputRef}
        sx={{
          input: { color: 'var(--foreground)' },
          '& .MuiInput-underline:before': { borderBottom: `2px solid var(--border)` },
          '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: `2px solid var(--primary)` },
          '& .MuiInput-underline:after': { borderBottom: `2px solid var(--primary)` },
        }}
        disabled={isSending || disabled}
      />

      <IconButton
        type="submit"
        sx={{ color: 'var(--primary)', '&:disabled': { opacity: 0.5 } }}
        disabled={isSending || disabled}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
