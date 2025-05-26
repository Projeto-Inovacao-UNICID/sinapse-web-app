'use client';

import { AdsPanel } from '@/components/common/ads-panel';
import ButtonPrimary from '@/components/common/button-primary';
import ButtonSecondary from '@/components/common/button-secondary';
import { ChatSidebar } from '@/components/common/chat-sidebar';
import { CustomToggleGroup } from '@/components/common/custom-toggle-group';
import { useGetChallenges, useGetMyChallenges } from '@/hooks/challenge/useChallenge';
import { useChatContacts } from '@/hooks/chat/useChatContacts';
import { useSession } from '@/hooks/session/useSession';
import { ChallengeResponseDto } from '@/types';
import {
  Box,
  Container,
  Typography
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { CreationChallengeModal } from '../../company/creation-challenge-modal';
import { EditChallengeModal } from '../../company/edit-challenge-modal';
import { ChallengeFilter } from '../challenge-filters';
import { ChallengePostCard } from '../challenge-post-card';
import { useListUserChallenges } from '@/hooks/profile/user/useUserProfile';

export function ChallengeFeed() {
  const router = useRouter();

  const { session } = useSession();
  const isCompanyUser = session?.roles.includes('ROLE_COMPANY');

  const { data: all, isLoading } = useGetChallenges();
  const { data: myChallengesCompany, isLoading: loadingMyChallengesCompany } = useGetMyChallenges({ empresaId: session?.id ?? '' });
  const { data: myChallengesUser, isLoading: loadingMyChallengesUser } = useListUserChallenges(session?.id ?? '');

  console.log("session:", session);
  console.log("all:", all);



  const myChallenges = isCompanyUser ? myChallengesCompany : myChallengesUser;
  

  const { data: contacts = [] } = useChatContacts();

  const [search, setSearch] = useState('');
  const [area, setArea] = useState('');
  const [status, setStatus] = useState('');
  const [view, setView] = useState<'todos' | 'meus'>('todos');

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<ChallengeResponseDto | null>(null);

  console.log(`todos: ${all}`);
  console.log(`meus: ${myChallenges}`);

  const filtered = useMemo(() => {
    const challenges = view === 'meus' ? myChallenges : all;

    return (challenges ?? []).filter(c =>
      (!search || c.titulo.toLowerCase().includes(search.toLowerCase())) &&
      (!area || c.modalidade === area) &&
      (!status || c.status === status)
    );
  }, [view, all, myChallenges, search, area, status]);


  const handleCreateForm = () => {
    router.push('/empresa/formularios/criar');
  }

  if (isLoading) return <Box>Carregando…</Box>;

  return (
    <>
      <Container maxWidth="lg" sx={{ pt: 4, pb: 6 }}>
        {/* Cabeçalho */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ color: 'var(--foreground)', fontWeight: 'bold' }}>
            Desafios
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>

            {view && (
              <CustomToggleGroup
                value={view}
                onChange={setView}
                options={[
                  { value: 'todos', label: 'Todos Desafios' },
                  { value: 'meus', label: 'Meus Desafios' },
                ]}
              />
            )}
            
            <Box flexGrow={1} />

            {isCompanyUser && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <ButtonPrimary title='+ Novo Desafio' borderRadius={'999px'} fontWeight={600} onClick={() => setOpenCreateModal(true)} />
                <ButtonSecondary title='+ Criar Formulário' borderRadius={'999px'} fontWeight={600} onClick={handleCreateForm} />
              </Box>
            )}
          </Box>
        </Box>

        {/* Grid principal */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '260px 1fr 300px', gap: 3 }}>
          {/* Filtros */}
          <ChallengeFilter
            areaOptions={Array.from(new Set((all ?? []).map(c => c.modalidade)))}
            statusOptions={[
              "EM ESPERA",
              ...Array.from(new Set((all ?? []).map(c => c.status)))
            ]}
            onSearch={setSearch}
            onAreaChange={setArea}
            onStatusChange={setStatus}
            areaValue={area}
            statusValue={status}
          />

          {/* Lista de desafios */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            {filtered
              .slice() // evita mutação
              .reverse() // inverte a ordem
              .map(desafio => (
                <Box key={desafio.id} sx={{ width: '100%', maxWidth: 600 }}>
                  <ChallengePostCard
                    desafio={desafio}
                    onEdit={
                      isCompanyUser
                        ? () => {
                            setSelectedChallenge(desafio);
                            setOpenEditModal(true);
                          }
                        : undefined
                    }
                  />
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

      {/* Modais */}
      {isCompanyUser && (
        <>
          <CreationChallengeModal
            empresaId={session?.id ?? ''}
            open={openCreateModal}
            onClose={() => setOpenCreateModal(false)}
          />

          {selectedChallenge && (
            <EditChallengeModal
              challenge={selectedChallenge}
              open={openEditModal}
              onClose={() => {
                setOpenEditModal(false);
                setSelectedChallenge(null);
              }}
            />
          )}
        </>
      )}
    </>
  );
}
