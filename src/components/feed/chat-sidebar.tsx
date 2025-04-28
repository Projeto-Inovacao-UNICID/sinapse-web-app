// src/components/feed/chat-sidebar.tsx
'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import type { Contact } from '@/types';
import { useRouter } from 'next/navigation';
import { colors } from '@/theme/colors';

export function ChatSidebar({
  contacts,
  onSelect
}: {
  contacts: Contact[];
  onSelect: (id: string, conversaId: number) => void;
}) {
  const [search, setSearch] = useState('');
  const filtered = contacts.filter(c =>
    c.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ width: 300, bgcolor: "var(--background)", borderRadius: 2, overflow: 'hidden' }}>
      {/* Header */}
      <Box sx={{ bgcolor: "var(--card)", px: 2, py: 1.5 }}>
        <Typography variant="h6" sx={{ color: "var(--foreground)", fontWeight: 'bold' }}>
          Chat
        </Typography>
        <TextField
          placeholder="Pesquisar"
          variant="filled"
          size="small"
          fullWidth
          value={search}
          onChange={e => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <SearchIcon sx={{ color: "var(--muted)", fontSize: 20, position: 'relative', bottom: '6px' }} />
              </InputAdornment>
            ),
            disableUnderline: true,
            sx: {
              bgcolor: "var(--background)",
              borderRadius: '20px',
              height: 36,
              pl: 1,
              display: 'flex',
              alignItems: 'center',
              '& .MuiFilledInput-root': { padding: 0, height: '100%' },
              '& .MuiFilledInput-input': {
                padding: 0,
                height: '100%',
                lineHeight: '36px',
                color: "var(--muted)",
                '&::placeholder': { color: "var(--muted)", opacity: 1 }
              }
            }
          }}
        />
      </Box>

      <Divider sx={{ bgcolor: colors.gray2 }} />

      {/* Contact list */}
      <List sx={{ maxHeight: '60vh', overflowY: 'auto', p: 0 }}>
        {filtered.map(contact => (
          <ListItem key={contact.participanteId} divider sx={{ alignItems: 'center', px: 2, py: 1 }}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "var(--secondary)", width: 40, height: 40, border: `2px solid ${"var(--card)"}` }}>
                {contact.nome.charAt(0)}
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={<Typography variant="subtitle2" sx={{ color: "var(--foreground)", fontWeight: 600 }}>{contact.nome}</Typography>}
              secondary={<Typography variant="caption" sx={{ color: "var(--muted)" }}>{contact.ultimaInteracao}</Typography>}
            />

            {contact.tipo === 'message' && (
              <Box sx={{
                ml: 1, minWidth: 20, height: 20,
                bgcolor: "var(--primary)", borderRadius: '50%',
                color: "var(--foreground)", fontSize: 12,
                display: 'flex', alignItems: 'center',
                justifyContent: 'center'
              }}>
                1
              </Box>
            )}
            {contact.tipo === 'seen' && (
              <Typography sx={{ color: "var(--primary)", fontSize: 16, ml: 1 }}>✓✓</Typography>
            )}
            {contact.tipo === 'typing' && (
              <Box sx={{ ml: 1, width: 10, height: 10, bgcolor: colors.green, borderRadius: '50%' }} />
            )}
          </ListItem>
        ))}
      </List>

      <Divider sx={{ bgcolor: colors.gray2 }} />

      {/* Footer */}
      <Box sx={{ bgcolor: "var(--card)", p: 2, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: "var(--foreground)" }}>
          Conecte-se com seus amigos e troque umas ideias
        </Typography>
        <RocketLaunchIcon sx={{ mt: 1, color: "var(--foreground)" }} />
      </Box>
    </Box>
  );
}
