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
      className="flex items-center p-2 rounded-lg bg-input"
    >
      <TextField
        fullWidth
        variant="standard"
        placeholder="Digite sua mensagem..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        inputRef={inputRef}
        className="text-white focus:outline-none bg-transparent"
        inputProps={{
          className: 'border-b-2 border-black focus:border-primary',
        }}
        disabled={isSending}
      />

      <IconButton
        type="submit"
        className="text-primary"
        disabled={isSending}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
