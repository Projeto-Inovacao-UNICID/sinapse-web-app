'use client';

import { useState } from 'react';
import { useSession } from '@/hooks/session/useSession';
import { useGetCompanyProfile } from '@/hooks/company/useCompanyProfile';
import { useChallengesCount } from '@/hooks/company/useChallengesCount';
import { useGetFollowersCount } from '@/hooks/company/useFollowers';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  Divider,
  Tabs,
  Tab,
  IconButton
} from '@mui/material';
import { useRouter } from 'next/navigation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MessageIcon from '@mui/icons-material/Message';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import { CompanyProfileImage } from '@/components/profile/company/avatar';
import { EditCompanyProfileModal } from '@/components/profile/company/profile-edit-modal';
import { ShareDialog } from '@/components/profile/utils/shareDialog';
import { BoxInfo } from '@/components/profile/company/box-info/box-info';
import {
  useCheckFollowing,
  useFollowCompany,
  useUnfollowCompany
} from '@/hooks/company/useFollowers';

interface CompanyProfileCardProps {
  companyId: string;
}

export function CompanyProfileCard({ companyId }: CompanyProfileCardProps) {
  const { data: company, isLoading, isError } = useGetCompanyProfile(companyId);
  const { data: counts, isLoading: loadingCounts } = useChallengesCount(companyId);
  const { data: followersCount, isLoading: loadingFollowers } = useGetFollowersCount(companyId);
  const { session } = useSession();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const isOwner   = session?.id === companyId;
  const isCompany = session?.roles.includes('ROLE_COMPANY') ?? false;
  const isUser    = session?.roles.includes('ROLE_USER') ?? false;

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

  // Desestruturando apenas os campos disponíveis em CompanyInfo
  const { nome, username, descricao, criadoEm, temImagem } = company;

  const loadingFollow =
    checkingFollow ||
    followMutation.status === 'pending' ||
    unfollowMutation.status === 'pending';

  const handleFollow = () => {
    if (isFollowing) unfollowMutation.mutate(companyId);
    else followMutation.mutate(companyId);
  };
  const handleMessage = () => router.push(`/conversas?companyId=${companyId}`);
  const handleEdit    = () => setOpenModal(true);

  return (
    <>
      <Box sx={{ backgroundColor: 'var(--card)', borderRadius: 2, p: 4 }}>
        <Grid container spacing={4}>

          <Grid size={8}>
            {/* Cabeçalho com imagem, nome e ações */}
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

            {/* Descrição */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="body1" sx={{ color: 'var(--foreground)' }}>
                {descricao}
              </Typography>
            </Box>

            {/* Data de entrada */}
            <Box sx={{ display: 'flex', gap: 4, mt: 2, color: 'var(--muted)' }}>
              <LocationOnIcon fontSize="small" />
              <CalendarTodayIcon fontSize="small" />
              <Typography variant="caption">
                Entrou em{' '}
                {new Date(criadoEm).toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
              </Typography>
            </Box>

            {/* Botões de ação */}
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              {isUser && !isCompany && !isOwner && (
                <Button
                  startIcon={<PersonAddIcon />}
                  variant="contained"
                  onClick={handleFollow}
                  disabled={loadingFollow}
                  sx={{ textTransform: 'none', backgroundColor: isFollowing && !checkingFollow ? 'var(--muted)' : 'var(--primary)', ':hover': { opacity: 0.8 } }}
                >
                  {loadingFollow ? <CircularProgress size={20} sx={{ color: 'white' }} /> : (isFollowing ? 'Seguindo' : '+ Seguir')}
                </Button>
              )}

              <Button
                startIcon={<MessageIcon />}
                variant="outlined"
                onClick={handleMessage}
                sx={{ borderColor: 'var(--muted)', color: 'var(--foreground)', textTransform: 'none' }}
              >
                Mensagem
              </Button>

              {isOwner && isCompany && (
                <Button
                  startIcon={<EditIcon />}
                  variant="outlined"
                  onClick={handleEdit}
                  sx={{ borderColor: 'var(--muted)', color: 'var(--foreground)', textTransform: 'none' }}
                >
                  Editar Perfil
                </Button>
              )}

              <IconButton onClick={() => setShareOpen(true)} sx={{ color: 'var(--foreground)' }}>
                <ShareIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Estatísticas */}
          <Grid size={4}>
            {(loadingCounts || loadingFollowers) ? (
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

        {/* Separador e abas */}
        <Divider sx={{ my: 4, backgroundColor: 'var(--muted)' }} />

        <Tabs
          value={tabValue}
          onChange={(_, v) => setTabValue(v)}
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: 'var(--primary)' } }}
          sx={{ '& .MuiTab-root': { color: 'var(--muted)', textTransform: 'none' }, '& .Mui-selected': { color: 'var(--primary)' } }}
        >
          <Tab label="Início" />
          <Tab label="Sobre" />
          <Tab label="Publicações" />
          <Tab label="Desafios" />
        </Tabs>

        {/* Modal de edição */}
        <EditCompanyProfileModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          companyId={companyId}
          defaultValues={{ nome: company.nome, username: company.username, email: company.email ?? '', descricao: company.descricao ?? '', website: company.website ?? '' }}
        />
      </Box>

      {/* Dialog de compartilhamento */}
      <ShareDialog open={shareOpen} onClose={() => setShareOpen(false)} url={window.location.href} />
    </>
  );
}