'use client';

import { MessageService } from '@/service/chat/MessageService';
import { colors } from '@/theme/colors';
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
      onSend(message); // Atualiza UI local
      await service.postMessage(conversasId, message); // Envia para o backend
      setMessage(''); // Limpa o input
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    inputRef.current?.focus(); // Foca automaticamente sempre que o input é limpo/trocado
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
        borderRadius: 4,
        backgroundColor: colors.gray2,
      }}
    >
      <TextField
        fullWidth
        variant="standard"
        placeholder="Digite sua mensagem..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        inputRef={inputRef}
        sx={{
          input: { color: colors.white },
          '& .MuiInput-underline:before': {
            borderBottom: `2px solid ${colors.black}`,
          },
          '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: `2px solid ${colors.primary}`,
          },
          '& .MuiInput-underline:after': {
            borderBottom: `2px solid ${colors.primary}`,
          },
        }}
        disabled={isSending}
      />

      <IconButton type="submit" sx={{ color: colors.primary }} disabled={isSending}>
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
