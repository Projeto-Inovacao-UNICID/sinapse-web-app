'use client';

import { useState } from 'react';
import { useChatSocket } from '@/hooks/chat/useChatSocket'; // Certifique-se de importar o hook corretamente
import { ChatMessages } from './messages';
import { ChatInput } from './input';
import { Message } from '@/types';

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
    <div className="flex flex-col h-full p-4 background">
      <div className="flex-grow overflow-y-auto mb-4">
        {conversaId ? (
          <ChatMessages
            newMessages={messages}
            contactId={selectedId}
            conversaId={conversaId}
          />
        ) : (
          <div className="text-white">Selecione uma conversa</div>
        )}
      </div>

      {conversaId && (
        <div>
          <ChatInput
            conversasId={conversaId}
            message={drafts[conversaId] || ''}
            setMessage={(msg) => setDrafts((prev) => ({ ...prev, [conversaId]: msg }))}
            onSend={onSendMessage}  // Passa a função de envio de mensagens
          />
        </div>
      )}
    </div>
  );
}
