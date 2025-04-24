'use client';

import { CircularProgress, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Chat } from '@/components/chat';
import { ContactList } from '@/components/chat/contact-list';
import { useChatContacts } from '@/hooks/chat/useChat';
import { Message } from '@/types';

export default function Conversas() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialUserId = searchParams.get('userId') || '';

  const [selectedId, setSelectedId] = useState<string>(initialUserId);
  const [conversaId, setConversaId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const { contacts, loading, error } = useChatContacts();

  const handleSend = (conteudo: string) => {
    const newMsg: Message = {
      id: Date.now(),
      conversaId: conversaId ?? 0,
      remetenteTipo: 'usuario',
      remetenteId: '', // Pode adicionar seu ID de usuário aqui se tiver
      conteudo,
      createdAt: new Date().toISOString(),
      editada: false,
      removida: false,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const handleReceive = (novaMensagem: Message) => {
    setMessages((prev) => [...prev, novaMensagem]);
  };

  const handleSelect = (id: string, convId: number) => {
    setSelectedId(id);
    setConversaId(convId);
    setMessages([]);
    router.push(`?userId=${id}`);
  };

  useEffect(() => {
    if (selectedId && contacts.length > 0) {
      const contatoSelecionado = contacts.find((c) => c.participanteId === selectedId);
      if (contatoSelecionado) {
        const convId = contatoSelecionado.conversaId;
        setConversaId(convId);

        // Aqui você pode buscar mensagens reais da conversa
        // Exemplo: fetchMensagens(convId).then(setMessages);
        setMessages([]); // Por enquanto zera
      }
    }
  }, [selectedId, contacts]);

  return (
    <Grid container spacing={1}>
      <Grid size={3}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <div>Erro ao carregar amizades</div>
        ) : (
          <ContactList contacts={contacts} onSelect={handleSelect} />
        )}
      </Grid>
      <Grid size={9}>
        <Chat
          conversaId={conversaId}
          messages={messages}
          selectedId={selectedId}
          handleSend={handleSend}
          handleReceive={handleReceive}
        />
      </Grid>
    </Grid>
  );
}
