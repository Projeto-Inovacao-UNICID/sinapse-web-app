'use client';

import SendIcon from '@mui/icons-material/Send';
import { IconButton, Paper, TextField } from '@mui/material';
import { useRef, useEffect, useState } from 'react';

interface ChatInputProps {
  conversasId: number;
  message: string;
  setMessage: (message: string) => void;
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
        display: 'flex', alignItems: 'center', p: 2,
        borderRadius: '0 0 8px 0', backgroundColor: 'var(--bgSecondary)',
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
          backgroundColor: 'var(--card)',
          pl: 1,
          '& .MuiInput-underline:before': { borderBottom: `none` },
          '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: `none` },
          '& .MuiInput-underline:after': { borderBottom: `none` },
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