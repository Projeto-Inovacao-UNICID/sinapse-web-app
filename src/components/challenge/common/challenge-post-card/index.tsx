'use client';

import React, { useState } from 'react';
import { useGetCompanyProfile } from '@/hooks/profile/company/useCompanyProfile';
import { useSession } from '@/hooks/session/useSession';
import type { ChallengeResponseDto } from '@/types';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
  useTheme,
  Divider,
} from '@mui/material';
import { format } from 'date-fns';
import { RegisterModal } from '@/components/challenge/user/group-registration-modal';
import { useGetChallengeStages } from '@/hooks/challenge/useStageChallenge';
import { useRouter } from 'next/navigation';
import { useGetMyInscriptions } from '@/hooks/challenge/useChallenge';

interface ChallengePostCardProps {
  desafio: ChallengeResponseDto;
  onEdit?: () => void;
}

export function ChallengePostCard({ desafio, onEdit }: ChallengePostCardProps) {
  const theme = useTheme();
  const router = useRouter();
  const { session } = useSession();
  const isCompanyUser = session?.roles.includes('ROLE_COMPANY');
  const [openModal, setOpenModal] = useState(false);
  const { data: stages, isLoading: loadingStages } = useGetChallengeStages(desafio.id);
  const { data: company, isLoading } = useGetCompanyProfile(desafio.empresaId);
  const { data: inscricoes, isLoading: loadingInscricoes, isError: errorInscricoes } = useGetMyInscriptions(desafio.id);

  const isChallengeOwner = session ? session.id === desafio.empresaId : false;

  const contStages = stages?.length ?? 0;
  const haveStages = contStages > 0;

  const inscrito = inscricoes !== null && inscricoes !== undefined;

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const inicio = format(new Date(desafio.dataInicio), 'dd/MM/yyyy');
  const fim = format(new Date(desafio.dataFim), 'dd/MM/yyyy');
  const status = !haveStages ? 'EM ESPERA' : desafio.status;
  const statusColor =
    status === 'ABERTO'
      ? theme.palette.success.main
      : status === 'FECHADO'
      ? theme.palette.error.main
      : theme.palette.warning.main;
  const statusBg =
    status === 'ABERTO'
      ? theme.palette.success.light
      : status === 'FECHADO'
      ? theme.palette.error.light
      : theme.palette.warning.light;

  return (
    <>
      <Card
        elevation={3}
        onClick={() => router.push(`/desafios/${desafio.id}`)}
        sx={{
          bgcolor: 'var(--card)',
          borderRadius: 3,
          overflow: 'visible',
          position: 'relative',
          cursor: 'pointer',
          transition: 'transform 0.15s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      >
        {/* Faixa lateral com a cor do status */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 6,
            bgcolor: statusColor,
            borderTopLeftRadius: theme.shape.borderRadius * 1.5,
            borderBottomLeftRadius: theme.shape.borderRadius * 1.5,
          }}
        />

        <CardHeader
          avatar={
            <Avatar
              src={company?.temImagem ? `/api/empresa/avatar/${company.id}` : undefined}
              sx={{ width: 40, height: 40 }}
            >
              {!company?.temImagem && company?.nome?.[0]}
            </Avatar>
          }
          title={
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'var(--foreground)' }}>
              {company?.nome}
            </Typography>
          }
          subheader={
            <Typography variant="caption" sx={{ color: 'var(--muted)' }}>
              @{company?.username}
            </Typography>
          }
          sx={{ pb: 0, pl: 2, pr: 2 }}
        />

        <Divider sx={{ my: 1, borderColor: 'var(--border)' }} />

        <CardContent sx={{ pt: 0, px: 2, pb: 1 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'var(--foreground)', fontWeight: 600 }}>
            {desafio.titulo}
          </Typography>

          <Typography
            variant="body2"
            paragraph
            sx={{
              color: 'var(--foreground)',
              maxHeight: 60,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {desafio.descricao}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="caption" sx={{ color: 'var(--muted)' }}>
              Área: {desafio.modalidade} 
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
            <Typography variant="caption" sx={{ color: 'var(--muted)' }}>
              Início: {inicio}
            </Typography>
            <Typography variant="caption" sx={{ color: 'var(--muted)' }}>
              Fim: {fim}
            </Typography>
          </Box>

          <Box sx={{ mb: 1 }}>
            <Typography variant="caption" sx={{ color: 'var(--muted)' }}>
              {!haveStages ? 'Sem estágios' : `${contStages} estágio${contStages > 1 ? 's' : ''}`}
            </Typography>
          </Box>

          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              bgcolor: statusBg,
              color: statusColor,
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              fontSize: '0.75rem',
              fontWeight: 500,
            }}
          >
            {status}
          </Box>
        </CardContent>

        <Divider sx={{ borderColor: 'var(--border)' }} />

        <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 1 }}>
          {isChallengeOwner ? (
            <Button
              size="small"
              variant="outlined"
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                borderColor: 'var(--primary)',
                color: 'var(--primary)',
              }}
              onClick={e => {
                e.stopPropagation(); // impede redirecionamento
                onEdit?.();
              }}
            >
              Editar
            </Button>
          ) : isCompanyUser ? (
            <Button
              size="small"
              variant="contained"
              disabled={loadingStages || !haveStages || loadingInscricoes || inscrito}
              sx={{
                textTransform: 'none',
                bgcolor: 'var(--primary)',
                borderRadius: 2,
                '&:hover': { bgcolor: 'var(--primary)' },
              }}
              onClick={e => {
                e.stopPropagation(); // impede redirecionamento
                setOpenModal(true);
              }}
            >
              Inscrever‑se
            </Button>
          ) : null}
        </CardActions>
      </Card>

      {!isCompanyUser && (
        <RegisterModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          desafioId={desafio.id}
        />
      )}
    </>
  );
}
