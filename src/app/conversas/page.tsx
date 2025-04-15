'use client';

import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import { ChatInput } from '@/components/chat/input';
import { ChatMessages } from '@/components/chat/messages';
import { bgColors } from '@/theme/colors';
import { ContactList } from '@/components/chat/contact-list';
import { User } from '@/types';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
}

const user1: User = {
  id: '1',
  name: 'John Doe',
  username: 'johndoe',
  email: 'johndoe@example.com',
};

const user2: User = {
  id: '2',
  name: 'Jane Doe',
  username: 'janedoe',
  email: 'janedoe@example.com',
};


export default function Conversas() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Olá, tudo bem?', sender: 'other' },
    { id: 2, text: 'Oi! Tudo sim, e você?', sender: 'me' },
  ]);

  const handleSend = (text: string) => {
    setMessages((prev) => [...prev, { id: Date.now(), text, sender: 'me' }]);
  };

  return (
    <>
      <Grid container spacing={1} sx={{ height: '100vh' }}>
        <Grid size={3}>
          <ContactList contacts={[user1, user2]} />
        </Grid>
        <Grid size={9}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              p: 2,
              bgcolor: bgColors.darkSecondary,
              justifyContent: 'space-between',
            }}
          >
            <ChatMessages messages={messages} />
            <Box mt={2}>
              <ChatInput onSend={handleSend} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

