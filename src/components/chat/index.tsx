'use client';

import { useState, useMemo } from 'react';
import { useChatSocket } from '@/hooks/chat/useChatSocket';
import { ChatMessages } from './messages';
import { ChatInput } from './input';
import { Message } from '@/types';

interface ChatProps {
  conversaId: number | null;
  messages: Message[];
  selectedId: string;
  handleSend: (message: string) => void;
  handleReceive: (message: Message) => void;
}

export function Chat({
  conversaId,
  messages,
  selectedId,
  handleSend,
  handleReceive,
}: ChatProps) {
  const [drafts, setDrafts] = useState<{ [key: number]: string }>({});

  const { sendMessage, isConnected } = useChatSocket(
    useMemo(() => ({
      destId: selectedId,
      onMessage: (novaMensagem: Message) => {
        handleReceive(novaMensagem);
      },
    }), [selectedId, handleReceive])
  );

  const onSendMessage = (conteudo: string) => {
    if (!conversaId) return;

    const novaMensagem: Message = {
      id: Date.now(), // Temporário – idealmente vem do backend
      conteudo,
      conversaId,
      remetenteId: '', // Pode ser preenchido pelo backend
      remetenteTipo: 'USER', // ou outro tipo conforme necessário
      createdAt: new Date().toISOString(),
      editada: false,
      removida: false,
    };

    sendMessage(novaMensagem);
    handleSend(conteudo); // Ainda útil para tracking/local update
    setDrafts((prev) => ({ ...prev, [conversaId]: '' }));
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
          <div className="text-white">🔌 Nenhuma conversa ativa</div>
        )}
      </div>

      {conversaId && (
        <ChatInput
          conversasId={conversaId}
          message={drafts[conversaId] || ''}
          setMessage={(msg) =>
            setDrafts((prev) => ({ ...prev, [conversaId]: msg }))
          }
          onSend={onSendMessage}
        />
      )}
    </div>
  );
}
