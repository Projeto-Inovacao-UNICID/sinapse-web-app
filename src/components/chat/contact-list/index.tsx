'use client';

import { Box, Typography } from '@mui/material';
import { Contact } from '@/components/chat/contact';

interface ContactListProps {
  contacts: [];
}

export function ContactList({ contacts }: ContactListProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Typography variant="h6" sx={{ color: 'white' }}>Contatos</Typography>
      {contacts.map((contact, index) => (
        <Contact key={index} name={contact.name} />
      ))}
    </Box>
  );
}
