// src/components/chat/contact-list.tsx
'use client';

import { useState } from 'react';
import { ChatService } from '@/service/chat/ChatService';
import { Contact } from '@/types';
import { Typography, Box, Divider, TextField, InputAdornment, List, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { ContactCard } from '../contact';
import SearchIcon from '@mui/icons-material/Search';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import React from 'react';


interface ContactListProps {
  contacts: Contact[];
  selectedId: string;
  onSelect: (id: string, conversaId: number) => void;
}

export function ContactList({ contacts, selectedId, onSelect }: ContactListProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = contacts.filter(c =>
    c.nome.toLowerCase().includes(search.toLowerCase())
  );

  const chatService = new ChatService();

  const handleSelect = async (id: string) => {
    if (id === selectedId) return;
    setError(null);
    setLoading(true);
    try {
      const res = await chatService.postChat(id);
      onSelect(id, res.id);
    } catch (err) {
      console.error('Erro ao iniciar o chat:', err);
      setError('Falha ao iniciar o chat. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        bottom: 16,
        width: "100%",
        height: '100%',
        bgcolor: 'var(--sidebar)',
        borderRadius: '8px 0 0 8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 2,
        alignSelf: 'flex-end',
      }}
    >
      {/* Header */}
      <Box sx={{ bgcolor: 'var(--card)', px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 6 }}>
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
      <Box sx={{ flex: 1, overflowY: 'auto', backgroundColor: 'var(--bgSecondary)' }}>
        <List sx={{ p: 0 }}>
          {filtered.map(contact => (
          <React.Fragment key={contact.participanteId}>
            <ListItem disablePadding sx={{ bgcolor: 'var(--bgSecondary)' }}>
              <ListItemButton
                onClick={() => handleSelect(contact.participanteId)}
                sx={{
                  alignItems: 'center',
                  px: 2,
                  py: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'var(--bgSecondary)'
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: 'var(--card)',
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
            <Divider sx={{ bgcolor: 'var(--border)' }} />
          </React.Fragment>
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