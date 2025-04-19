'use client';

import { bgColors } from "@/theme/colors";
import { Box } from "@mui/material";
import { ChatMessages } from "./messages";
import { ChatInput } from "./input";
import { Message } from "@/types";
import { useState } from "react";

interface ChatProps {
  conversaId: number | null;
  messages: Message[];
  selectedId: string;
  handleSend: (message: string) => void;
}

export function Chat({ conversaId, messages, selectedId, handleSend }: ChatProps) {
  const [drafts, setDrafts] = useState<{ [key: number]: string }>({});

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
            setMessage={(msg) =>
              setDrafts((prev) => ({ ...prev, [conversaId]: msg }))
            }
            onSend={(conteudo) => {
              handleSend(conteudo);
              setDrafts((prev) => ({ ...prev, [conversaId]: '' }));
            }}
          />
        </Box>
      )}
    </Box>
  );
}
