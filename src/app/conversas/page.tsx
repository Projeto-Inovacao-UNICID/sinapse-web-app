'use client';

import { Box } from '@mui/material';
import { useState } from 'react';
import { ChatInput } from '@/components/chat/input';
import { ChatMessages } from '@/components/chat/messages';
import { bgColors } from '@/theme/colors';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
}

export default function Conversas() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Olá, tudo bem?', sender: 'other' },
    { id: 2, text: 'Oi! Tudo sim, e você?', sender: 'me' },
  ]);

  const handleSend = (text: string) => {
    setMessages((prev) => [...prev, { id: Date.now(), text, sender: 'me' }]);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        p: 2,
        bgcolor: bgColors.dark,
      }}
    >
      <ChatMessages messages={messages} />
      <Box mt={2}>
        <ChatInput onSend={handleSend} />
      </Box>
    </Box>
  );
}
