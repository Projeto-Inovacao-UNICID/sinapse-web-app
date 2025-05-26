'use client';

import { ChallengePostCard } from '@/components/challenge/common/challenge-post-card';
import { PostCard } from '@/components/feed/post/post-card';
import { useListUserChallenges } from '@/hooks/profile/user/useUserProfile';
import { ChallengeResponseDto, Post } from '@/types';
import { Box, Typography } from '@mui/material';
import { useParams } from 'next/navigation';

export function UserChallenges() {
  const params = useParams();
  const perfilId = params.id as string;

  const { data: challenges = [], isLoading, error } = useListUserChallenges(perfilId);

  if (isLoading) return <Typography>Carregando...</Typography>;
  if (error) return <Typography>Erro ao carregar posts: {(error as Error).message}</Typography>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {challenges.length === 0 ? (
        <Typography variant="body2" sx={{ color: 'var(--muted)' }}>
          Nenhuma desafio encontrado.
        </Typography>
      ) : (
        challenges
          .slice()
          .reverse()
          .map((c: ChallengeResponseDto) => (
            <ChallengePostCard desafio={c} key={c.id} />
          ))
      )}
    </Box>
  );
}
