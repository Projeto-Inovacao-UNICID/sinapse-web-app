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

  const bgDark = '#1F1F1F';
  const bgHeader = '#2B2B2B';
  const fg = '#FFFFFF';
  const fgLight = '#A0A0A0';
  const dividerColor = '#444444';
  const avatarBg = '#3C3C3C';
  const badge = '#FF8800';
  const success = '#4CAF50';
    // TOFIX: click e cores
  return (
    <Box sx={{ width: 300, bgcolor: bgDark, borderRadius: 2, overflow: 'hidden' }}>
      {/* Header */}
      <Box sx={{ bgcolor: bgHeader, px: 2, py: 1.5 }}>
        <Typography variant="h6" sx={{ color: fg, fontWeight: 'bold' }}>
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
                <SearchIcon sx={{ color: fgLight, fontSize: 20, position: 'relative', bottom: '6px' }} />
              </InputAdornment>
            ),
            disableUnderline: true,
            sx: {
              bgcolor: bgDark,
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
                color: fgLight,
                '&::placeholder': { color: fgLight, opacity: 1 }
              }
            }
          }}
        />
      </Box>

      <Divider sx={{ bgcolor: dividerColor }} />

      {/* Contact list */}
      <List sx={{ maxHeight: '60vh', overflowY: 'auto', p: 0 }}>
        {filtered.map(contact => (
          <ListItem key={contact.participanteId} divider sx={{ alignItems: 'center', px: 2, py: 1 }}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: avatarBg, width: 40, height: 40, border: `2px solid ${bgHeader}` }}>
                {contact.nome.charAt(0)}
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={<Typography variant="subtitle2" sx={{ color: fg, fontWeight: 600 }}>{contact.nome}</Typography>}
              secondary={<Typography variant="caption" sx={{ color: fgLight }}>{contact.ultimaInteracao}</Typography>}
            />

            {contact.tipo === 'message' && (
              <Box sx={{
                ml: 1, minWidth: 20, height: 20,
                bgcolor: badge, borderRadius: '50%',
                color: fg, fontSize: 12,
                display: 'flex', alignItems: 'center',
                justifyContent: 'center'
              }}>
                1
              </Box>
            )}
            {contact.tipo === 'seen' && (
              <Typography sx={{ color: badge, fontSize: 16, ml: 1 }}>✓✓</Typography>
            )}
            {contact.tipo === 'typing' && (
              <Box sx={{ ml: 1, width: 10, height: 10, bgcolor: success, borderRadius: '50%' }} />
            )}
          </ListItem>
        ))}
      </List>

      <Divider sx={{ bgcolor: dividerColor }} />

      {/* Footer */}
      <Box sx={{ bgcolor: bgHeader, p: 2, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: fg }}>
          Conecte-se com seus amigos e troque umas ideias
        </Typography>
        <RocketLaunchIcon sx={{ mt: 1, color: fg }} />
      </Box>
    </Box>
  );
}
