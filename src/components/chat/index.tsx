'use client';

import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useChatSocket } from '@/hooks/chat/useChatSocket'; // Certifique-se de importar o hook corretamente
import { ChatMessages } from './messages';
import { ChatInput } from './input';
import { Message } from '@/types';
import { bgColors } from '@/theme/colors';

interface ChatProps {
  conversaId: number | null;
  messages: Message[];
  selectedId: string;
  handleSend: (message: string) => void;
}

export function Chat({ conversaId, messages, selectedId, handleSend }: ChatProps) {
  const [drafts, setDrafts] = useState<{ [key: number]: string }>({});

  // Chame o hook `useChatSocket` para configurar o WebSocket
  useChatSocket({
    destId: selectedId,
    onMessage: (novaMensagem: Message) => {
      // Atualize as mensagens com a mensagem recebida via WebSocket
      handleSend(novaMensagem.conteudo);  // O `handleSend` deve adicionar a nova mensagem ao estado
    },
  });

  // Função para enviar uma mensagem
  const onSendMessage = (conteudo: string) => {
    handleSend(conteudo);  // Envia a mensagem
    setDrafts((prev) => ({ ...prev, [conversaId!]: '' }));  // Limpa o rascunho após o envio
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        p: 2,
        bgcolor: bgColors.darkSecondary,
      }}
    >
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
        {conversaId ? (
          <ChatMessages
            newMessages={messages}
            contactId={selectedId}
            conversaId={conversaId}
          />
        ) : (
          <Box sx={{ color: 'white' }}>Selecione uma conversa</Box>
        )}
      </Box>

      {conversaId && (
        <Box>
          <ChatInput
            conversasId={conversaId}
            message={drafts[conversaId] || ''}
            setMessage={(msg) => setDrafts((prev) => ({ ...prev, [conversaId]: msg }))}
            onSend={onSendMessage}  // Passa a função de envio de mensagens
          />
        </Box>
      )}
    </Box>
  );
}
