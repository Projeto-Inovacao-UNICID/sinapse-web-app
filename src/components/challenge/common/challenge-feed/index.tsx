// src/components/challenge/common/challenge-feed/index.tsx
'use client';

import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useSession } from '@/hooks/session/useSession';
import { useGetChallenges } from '@/hooks/challenge/useChallenge';
import { ChallengePostCard } from '../challenge-post-card';
import { ChallengeFilter } from '../challenge-filters';
import { AdsPanel } from '@/components/common/ads-panel';
import { ChatSidebar } from '@/components/common/chat-sidebar';
import { useChatContacts } from '@/hooks/chat/useChatContacts';

export function ChallengeFeed() {
  const { session } = useSession();
  const isCompanyUser = session?.roles.includes('ROLE_COMPANY');

  const { data: all, isLoading } = useGetChallenges();
  const { data: contacts = [] } = useChatContacts();

  const [search, setSearch] = useState('');
  const [area, setArea] = useState('');
  const [status, setStatus] = useState('');
  const [view, setView] = useState<'todos'|'meus'>('todos');

  const filtered = useMemo(() => {
    return (all ?? []).filter(c =>
      view === 'todos' &&
      (!search || c.titulo.toLowerCase().includes(search.toLowerCase())) &&
      (!area   || c.modalidade === area) &&
      (!status || c.status === status)
    );
  }, [all, view, search, area, status]);

  if (isLoading) return <Box>Carregando…</Box>;

  return (
    <Container maxWidth="lg" sx={{ pt: 4, pb: 6 }}>
      {/* ══ Cabeçalho ═══════════════════════════════════════════ */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ color: 'var(--foreground)', fontWeight: 'bold' }}>
          Desafios
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(_, v) => v && setView(v)}
            sx={{
              '& > * + *': { ml: 1 },
              '& .MuiToggleButton-root': {
                bgcolor: 'var(--input)',
                color: 'var(--muted)',
                border: 'none',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '999px',
                px: 2,
                py: 0.5,
                transition: 'background-color 0.3s, color 0.3s',
                '&:hover': { bgcolor: 'var(--input)' }
              },
              '& .Mui-selected': {
                bgcolor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                '&:hover': { bgcolor: 'var(--primary)' }
              }
            }}
            >
            <ToggleButton value="todos">Todos Desafios</ToggleButton>
            <ToggleButton value="meus">Meus Desafios</ToggleButton>
            </ToggleButtonGroup>

          <Box flexGrow={1} />

          {isCompanyUser && (
            <Button
              variant="contained"
              sx={{
                bgcolor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '999px',
                px: 3,
                height: 36,
                ml: 2,
                transition: 'background-color 0.3s',
                '&:hover': { bgcolor: 'var(--primary)' }
              }}
            >
              + Novo Desafio
            </Button>
          )}
        </Box>
      </Box>

      {/* ══ Grid principal ══════════════════════════════════════ */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '260px 1fr 300px', gap: 3 }}>
        {/* filtros */}
        <ChallengeFilter
          areaOptions={Array.from(new Set((all ?? []).map(c => c.modalidade)))}
          statusOptions={Array.from(new Set((all ?? []).map(c => c.status)))}
          onSearch={setSearch}
          onAreaChange={setArea}
          onStatusChange={setStatus}
          areaValue={area}
          statusValue={status}
        />

        {/* lista de cards centralizada */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          {filtered.map(desafio => (
            <Box key={desafio.id} sx={{ width: '100%', maxWidth: 600 }}>
              <ChallengePostCard desafio={desafio} />
            </Box>
          ))}
        </Box>

        {/* Ads + Chat */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <AdsPanel />
          <ChatSidebar contacts={contacts} onSelect={() => {}} />
        </Box>
      </Box>
    </Container>
  );
}
