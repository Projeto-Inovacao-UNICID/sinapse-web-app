'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  Divider,
  Tabs,
  Tab,
} from '@mui/material';

import LocationOnIcon    from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonAddIcon     from '@mui/icons-material/PersonAdd';
import MessageIcon       from '@mui/icons-material/Message';
import EditIcon          from '@mui/icons-material/Edit';
import AreaChartIcon from '@mui/icons-material/AreaChart';
import ShareIcon         from '@mui/icons-material/Share';
import AssignmentIcon    from '@mui/icons-material/Assignment';

import { useSession }            from '@/hooks/session/useSession';
import { useGetCompanyProfile }  from '@/hooks/profile/company/useCompanyProfile';
import { useGetFollowersCount,
         useCheckFollowing,
         useFollowCompany,
         useUnfollowCompany }    from '@/hooks/company/useFollowers';
import { useGetChallengeCounts } from '@/hooks/challenge/useChallenge';

import { CompanyProfileImage }   from '@/components/common/company-avatar';
import { EditCompanyProfileModal } from '@/components/profile/company/profile-edit-modal';
import { ShareDialog }           from '@/components/profile/utils/shareDialog';
import { BoxInfo }               from '@/components/profile/company/box-info/box-info';
import ButtonSecondary           from '@/components/common/button-secondary';
import IconButton                from '@/components/common/icon-buttons';
import { ChatService }           from '@/service/chat/ChatService';

interface CompanyProfileCardProps {
  companyId: string;
  gridColumnNumber?: number;
}

export function CompanyProfileCard({ companyId, gridColumnNumber = 2 }: CompanyProfileCardProps) {
  const searchParams = useSearchParams();
  const tabFromURL   = (searchParams.get('tab') ?? '').toLowerCase();

  const tabIndexMap = {
    inicio:      0,
    sobre:       1,
    publicacoes: 2,
    desafios:    3,
  } as const;
  const initialTab = tabIndexMap[tabFromURL as keyof typeof tabIndexMap] ?? 0;
  const [tabValue, setTabValue] = useState(initialTab);

  const { data: company, isLoading, isError }        = useGetCompanyProfile(companyId);
  const { data: counts, isLoading: loadingCounts }   = useGetChallengeCounts(companyId);
  const { data: followersCount, isLoading: loadingFollowers } = useGetFollowersCount(companyId);
  const { session } = useSession();
  const router      = useRouter();
  const [openModal,  setOpenModal]  = useState(false);
  const [shareOpen,  setShareOpen]  = useState(false);

  const chatService = new ChatService();

  const isOwner   = session?.id === companyId;
  const isCompany = session?.roles.includes('ROLE_COMPANY') ?? false;
  const isUser    = session?.roles.includes('ROLE_USER')    ?? false;

  const { data: isFollowing = false, isLoading: checkingFollow } =
    useCheckFollowing(companyId, isUser && !isCompany);
  const followMutation   = useFollowCompany();
  const unfollowMutation = useUnfollowCompany();

  if (isLoading) {
    return (
      <Box sx={{ height: 150, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress sx={{ color: 'var(--muted)' }} />
      </Box>
    );
  }
  if (isError || !company) {
    return (
      <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography color="error">Falha ao carregar perfil</Typography>
      </Box>
    );
  }

  const { nome, username, descricao, criadoEm, temImagem } = company;
  const loadingFollow =
    checkingFollow || followMutation.status === 'pending' || unfollowMutation.status === 'pending';

  const handleFollow = () => {
    if (isFollowing) unfollowMutation.mutate(companyId);
    else followMutation.mutate(companyId);
  };

  const handleMessage = () => {
    try {
      chatService.postChat(companyId);
      router.push(`/conversas?participanteId=${companyId}`);
    } catch (err) {
      console.error('Erro ao iniciar o chat:', err);
    }
  };

  const handleForms = () => router.push(`/empresa/formularios`);

  return (
    <>
      <Box sx={{ backgroundColor: 'var(--card)', borderRadius: 2, p: 4, gridColumn: `${gridColumnNumber}` }}>
        <Grid container spacing={4}>
          {/* cabeçalho */}
          <Grid size={8}>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <Box sx={{ width: 124, height: 124, flexShrink: 0 }}>
                <CompanyProfileImage companyId={companyId} temImagem={temImagem} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ color: 'var(--foreground)', fontWeight: 'bold' }}>
                  {nome}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'var(--muted)' }}>
                  @{username}
                </Typography>
              </Box>
            </Box>

            {/* descrição */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="body1" sx={{ color: 'var(--foreground)' }}>
                {descricao}
              </Typography>
            </Box>

            {/* criado em */}
            <Box sx={{ display: 'flex', gap: 4, mt: 2, color: 'var(--muted)' }}>
              <LocationOnIcon fontSize="small" />
              <CalendarTodayIcon fontSize="small" />
              <Typography variant="caption">
                Entrou em{' '}
                {new Date(criadoEm).toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
              </Typography>
            </Box>

            {/* botões */}
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              {isUser && !isCompany && !isOwner && (
                <Button
                  startIcon={<PersonAddIcon />}
                  variant="contained"
                  onClick={handleFollow}
                  disabled={loadingFollow}
                  sx={{
                    textTransform: 'none',
                    backgroundColor: isFollowing && !checkingFollow ? 'var(--muted)' : 'var(--primary)',
                    ':hover': { opacity: 0.8 },
                  }}
                >
                  {loadingFollow ? (
                    <CircularProgress size={20} sx={{ color: 'white' }} />
                  ) : isFollowing ? (
                    'Seguir'
                  ) : (
                    '+ Seguir'
                  )}
                </Button>
              )}

              <ButtonSecondary
                icon={<MessageIcon />}
                onClick={handleMessage}
                title="Mensagem"
                borderRadius={2}
                fontWeight={400}
              />

              {isOwner && isCompany && (
                <ButtonSecondary
                  icon={<EditIcon />}
                  onClick={() => setOpenModal(true)}
                  title="Editar Perfil"
                  borderRadius={2}
                  fontWeight={400}
                />
              )}

              <ButtonSecondary icon={<AssignmentIcon />} onClick={handleForms} title="Formulários" borderRadius={2} fontWeight={400} />

              <IconButton icon={<ShareIcon />} onClick={() => setShareOpen(true)} />
            </Box>
          </Grid>

          {/* estatísticas */}
          <Grid size={4}>
            {loadingCounts || loadingFollowers ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress sx={{ color: 'var(--muted)' }} />
              </Box>
            ) : (
              <Grid container spacing={2}>
                <Grid size={6}>
                  <BoxInfo data={followersCount ?? 0} title="Seguidores" />
                </Grid>
                <Grid size={6}>
                  <BoxInfo data={counts?.criados ?? 0} title="Desafios Criados" />
                </Grid>
                <Grid size={6}>
                  <BoxInfo data={counts?.ativos ?? 0} title="Desafios Ativos" />
                </Grid>
                <Grid size={6}>
                  <BoxInfo data={counts?.encerrados ?? 0} title="Desafios Encerrados" />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>

        {/* abas */}
        <Divider sx={{ my: 4, backgroundColor: 'var(--muted)' }} />

        <Tabs
          value={tabValue}
          onChange={(_, v) => setTabValue(v)}
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: 'var(--primary)' } }}
          sx={{
            '& .MuiTab-root': { color: 'var(--muted)', textTransform: 'none' },
            '& .Mui-selected': { color: 'var(--primary)' },
          }}
        >
          <Tab label="Início"       />
          <Tab label="Sobre"        />
          <Tab label="Publicações"  />
          <Tab label="Desafios"     />
        </Tabs>

        {/* modal edição */}
        <EditCompanyProfileModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          companyId={companyId}
          defaultValues={{
            nome: company.nome,
            username: company.username,
            email: company.email ?? '',
            descricao: company.descricao ?? '',
            website: company.website ?? '',
          }}
        />
      </Box>

      {/* dialog share */}
      <ShareDialog open={shareOpen} onClose={() => setShareOpen(false)} url={typeof window !== 'undefined' ? window.location.href : ''} />
    </>
  );
}
