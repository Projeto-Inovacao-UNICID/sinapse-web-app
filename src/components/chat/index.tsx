'use client';

import { useState } from 'react';
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

export function Chat({ conversaId, messages, selectedId, handleSend, handleReceive }: ChatProps) {
  const [drafts, setDrafts] = useState<{ [key: number]: string }>({});

  useChatSocket({
    destId: selectedId,
    onMessage: (novaMensagem: Message) => {
      handleReceive(novaMensagem);
    },
  });

  const onSendMessage = (conteudo: string) => {
    handleSend(conteudo);
    setDrafts((prev) => ({ ...prev, [conversaId!]: '' }));
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
