'use client';

import { ChallengePostCard } from '@/components/challenge/common/challenge-post-card';
import { useGetChallenges } from '@/hooks/challenge/useChallenge';
import { useListUserChallenges } from '@/hooks/profile/user/useUserProfile';
import { ChallengeResponseDto } from '@/types';
import { Box, Typography } from '@mui/material';
import { useParams } from 'next/navigation';

export function CompanyChallenges() {
  const params = useParams();
  const perfilId = params.id as string;

  const { data: challenges = [], isLoading, error } = useGetChallenges();
  const filteredChallenges = challenges.filter(c => c.empresaId === perfilId);

  if (isLoading) return <Typography>Carregando...</Typography>;
  if (error) return <Typography>Erro ao carregar posts: {(error as Error).message}</Typography>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {filteredChallenges.length === 0 ? (
        <Typography variant="body2" sx={{ color: 'var(--muted)' }}>
          Nenhuma desafio encontrado.
        </Typography>
      ) : (
        filteredChallenges
          .slice()
          .reverse()
          .map((f: ChallengeResponseDto) => (
            <ChallengePostCard desafio={f} key={f.id} />
          ))
      )}
    </Box>
  );
}
