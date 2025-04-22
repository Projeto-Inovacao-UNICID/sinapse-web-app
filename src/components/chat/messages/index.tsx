'use client';

import { useMessages } from '@/hooks/chat/useMessages';
import { Message } from '@/types';
import { CircularProgress, Typography } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';

interface ChatMessagesProps {
  newMessages: Message[];
  contactId: string;
  conversaId: number;
}

export function ChatMessages({ newMessages, contactId, conversaId }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { messages, loading, error } = useMessages({ conversaId });

  // Scroll automático quando mensagens mudam
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, newMessages]);

  // Combinar mensagens e remover duplicadas por ID
  const allMessages = useMemo(() => {
    const all = [...messages, ...newMessages];
    const uniqueMap = new Map<number, Message>();
    all.forEach((msg) => uniqueMap.set(msg.id, msg));
    return Array.from(uniqueMap.values()).sort((a, b) => a.id - b.id); // ordena por ID 
  }, [messages, newMessages]);

  if (loading) {
    return (
      <div className="flex justify-center p-2">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-2">
        <Typography color="error">{error}</Typography>
      </div>
    );
  }

  return (
    <div
      className="flex-1 overflow-y-auto flex flex-col p-2 gap-1"
      style={{
        maxHeight: `calc(100vh - 65px - 80px)`, // Ajuste a altura total conforme a altura do seu header e input
      }}
    >
      {allMessages.map((msg) => (
        <div
          key={msg.id}
          className={`flex justify-${msg.remetenteId === contactId ? 'start' : 'end'}`}
        >
          <div
            className={`p-2 max-w-[70%] rounded-lg ${
              msg.remetenteId === contactId
                ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                : 'bg-primary text-primary-foreground'
            }`}
          >
            <Typography variant="body1">{msg.conteudo}</Typography>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
