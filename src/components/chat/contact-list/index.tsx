// src/components/chat/contact-list.tsx
'use client';

import { useState } from 'react';
import { ChatService } from '@/service/chat/ChatService';
import { Contact } from '@/types';
import { Typography, Box } from '@mui/material';
import { ContactCard } from '../contact';

interface ContactListProps {
  contacts: Contact[];
  selectedId: string;
  onSelect: (id: string, conversaId: number) => void;
}

export function ContactList({ contacts, selectedId, onSelect }: ContactListProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatService = new ChatService();

  const handleSelect = async (id: string) => {
    if (id === selectedId) return;
    setError(null);
    setLoading(true);
    try {
      const res = await chatService.postChat(id);
      onSelect(id, res.id);
    } catch (err) {
      console.error('Erro ao iniciar o chat:', err);
      setError('Falha ao iniciar o chat. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="flex flex-col gap-2 p-4">
      <Typography className="text-primary text-xl font-semibold">
        Contatos
      </Typography>
      {error && (
        <Typography className="text-destructive text-sm">
          {error}
        </Typography>
      )}
      {contacts.map(contact => {
        const isSelected = contact.participanteId === selectedId;
        return (
          <Box key={contact.participanteId} sx={{ display: 'flex', padding: 0.5 }}>
            <ContactCard
              name={contact.nome}
              isSelected={isSelected}
              disabled={isSelected}
              onClick={() => handleSelect(contact.participanteId)}
            />
          </Box>
        );
      })}
      {loading && (
        <Typography className="text-muted text-sm">
          Carregando...
        </Typography>
      )}
    </Box>
  );
}