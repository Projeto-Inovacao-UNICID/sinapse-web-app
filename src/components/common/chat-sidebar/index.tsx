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
  Divider,
  ListItemButton
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
  const router = useRouter();

  const handleSelect = (id: string, conversaId: number) => {
    onSelect(id, conversaId);
    router.push(`/conversas?participanteId=${id}`);
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        bottom: 16,
        width: "100%",
        maxHeight: '60vh',
        bgcolor: 'var(--sidebar)',
        borderRadius: 2,
        boxShadow: 4,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 2,
        alignSelf: 'flex-end',
      }}
    >
      {/* Header */}
      <Box sx={{ bgcolor: 'var(--card)', px: 2, py: 1.5 }}>
        <Typography
          variant="h6"
          sx={{ color: 'var(--sidebar-foreground)', fontWeight: 'bold' }}
        >
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
              <InputAdornment position="start" sx={{ alignItems: 'flex-start', display: 'flex' }}>
                <SearchIcon sx={{ color: 'var(--muted)', fontSize: 20, mt: -0.7 }} />
              </InputAdornment>
            ),
            disableUnderline: true,
            sx: {
              bgcolor: 'var(--bgSecondary)',
              borderRadius: '20px',
              height: 36,
              pl: 1,
              '& .MuiFilledInput-root': { padding: 0, height: '100%' },
              '& .MuiFilledInput-input': {
                padding: 0,
                height: '100%',
                lineHeight: '36px',
                color: 'var(--muted)',
                '&::placeholder': { color: 'var(--muted)', opacity: 1 }
              }
            }
          }}
        />
      </Box>

      <Divider sx={{ bgcolor: 'var(--border)' }} />

      {/* Lista de contatos com scroll */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <List sx={{ p: 0 }}>
          {filtered.map(contact => (
            <ListItem
              key={contact.participanteId}
              disablePadding
              sx={{ bgcolor: 'var(--card)' }}
            >
              <ListItemButton
                onClick={() =>
                  handleSelect(contact.participanteId, contact.conversaId)
                }
                sx={{
                  alignItems: 'center',
                  px: 2,
                  py: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'var(--bgTertiary)'
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: 'var(--bgSecondary)',
                      color: 'var(--muted)',
                      width: 40,
                      height: 40,
                      border: '2px solid var(--card)'
                    }}
                  >
                    {contact.nome.charAt(0)}
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle2"
                      sx={{ color: 'var(--foreground)', fontWeight: 600 }}
                    >
                      {contact.nome}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" sx={{ color: 'var(--muted)' }}>
                      {contact.ultimaInteracao}
                    </Typography>
                  }
                />

                {contact.tipo === 'message' && (
                  <Box
                    sx={{
                      ml: 1,
                      minWidth: 20,
                      height: 20,
                      bgcolor: 'var(--primary)',
                      borderRadius: '50%',
                      color: 'var(--primary-foreground)',
                      fontSize: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    1
                  </Box>
                )}
                {contact.tipo === 'seen' && (
                  <Typography sx={{ color: 'var(--primary)', fontSize: 16, ml: 1 }}>
                    ✓✓
                  </Typography>
                )}
                {contact.tipo === 'typing' && (
                  <Box
                    sx={{
                      ml: 1,
                      width: 10,
                      height: 10,
                      bgcolor: 'var(--accent)',
                      borderRadius: '50%'
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ bgcolor: 'var(--border)' }} />

      {/* Rodapé */}
      <Box sx={{ bgcolor: 'var(--card)', p: 2, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'var(--muted)' }}>
          Conecte-se com seus amigos e troque umas ideias
        </Typography>
        <RocketLaunchIcon sx={{ mt: 1, color: 'var(--muted)' }} />
      </Box>
    </Box>
  );
}