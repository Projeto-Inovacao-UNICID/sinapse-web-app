'use client';

import { Box, Typography } from '@mui/material';
import { Contact } from '@/types';
import { useState } from 'react';
import { ChatService } from '@/service/chat/ChatService';
import { ContactCard } from '../contact';

interface ContactListProps {
  contacts: Contact[];
  onSelect: (id: string, conversaId: number) => void;
}

export function ContactList({ contacts, onSelect }: ContactListProps) {
  const [selectedId, setSelectedId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatService = new ChatService();

  const handleSelect = async (id: string) => {
    setSelectedId(id);
    setLoading(true);
    setError(null);

    try {
      const res = await chatService.postChat(id);
      const conversaId = res?.id;

      if (typeof conversaId !== 'number') {
        throw new Error('ID da conversa inválido');
      }

      onSelect(id, conversaId); // retorna id + conversaId
    } catch (err) {
      console.error('Erro ao iniciar o chat:', err);
      setError('Falha ao iniciar o chat. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Typography variant="h6" sx={{ color: 'white' }}>
        Contatos
      </Typography>

      {error && (
        <Typography variant="body2" sx={{ color: 'red' }}>
          {error}
        </Typography>
      )}

      {contacts.map((contact) => (
        <ContactCard
          key={contact.participanteId}
          name={contact.nome}
          isSelected={selectedId === contact.participanteId}
          onClick={() => handleSelect(contact.participanteId)}
        />
      ))}

      {loading && (
        <Typography variant="body2" sx={{ color: 'grey' }}>
          Carregando...
        </Typography>
      )}
    </Box>
  );
}
