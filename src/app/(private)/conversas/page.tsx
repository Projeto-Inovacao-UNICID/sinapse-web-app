'use client';

import { CircularProgress, Grid } from '@mui/material';
import { useState } from 'react';

import { Chat } from '@/components/chat';
import { ContactList } from '@/components/chat/contact-list';
import { useChatContacts } from '@/hooks/chat/useChat';
import { Message } from '@/types';

export default function Conversas() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [conversaId, setConversaId] = useState<number | null>(null);

  const { contacts, loading, error } = useChatContacts();

  const handleSend = (conteudo: string) => {
    const newMsg: Message = {
      id: Date.now(),
      conversaId: conversaId ?? 0,
      remetenteTipo: 'usuario',
      remetenteId: '',
      conteudo,
      createdAt: new Date().toISOString(),
      editada: false,
      removida: false,
    };

    setMessages((prev) => [...prev, newMsg]);
  };

  return (
    <Grid container spacing={1} sx={{ height: '100vh' }}>
      <Grid size={3}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <div>Erro ao carregar amizades</div>
        ) : (
          <ContactList
            contacts={contacts}
            onSelect={(id: string, convId: number) => {
              setSelectedId(id);
              setConversaId(convId);
              setMessages([]);
            }}
          />
        )}
      </Grid>
      <Grid size={9}>
        <Chat conversaId={conversaId} messages={messages} selectedId={selectedId} handleSend={handleSend} />
      </Grid>
    </Grid>
  );
}
