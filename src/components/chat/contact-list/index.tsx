'use client';

import { useState } from 'react';
import { ChatService } from '@/service/chat/ChatService';
import { ContactCard } from '../contact';
import { Contact } from '@/types';
import { Typography, Box } from '@mui/material';

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
      // Tenta encontrar uma conversa existente
      let conversa = await chatService.getChatsAndFriends()
        .then(c => c.find(c => c.participanteId === id));

      // Se não existir, cria uma nova
      if (!conversa) {
        conversa = await chatService.postChat(id);
      }

      const conversaId = conversa?.conversaId;
      if (typeof conversaId !== 'number') {
        throw new Error('ID da conversa inválido');
      }

      onSelect(id, conversaId);
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

      {contacts.map((contact) => (
        <Box key={contact.participanteId} sx={{ display: 'flex', padding: 0.5 }}>
          <ContactCard
            name={contact.nome}
            isSelected={selectedId === contact.participanteId}
            onClick={() => handleSelect(contact.participanteId)}
          />
        </Box>
      ))}

      {loading && (
        <Typography className="text-muted text-sm">
          Carregando...
        </Typography>
      )}
    </Box>
  );
}
