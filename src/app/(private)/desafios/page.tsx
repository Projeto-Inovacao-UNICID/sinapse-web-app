'use client';

import { ChallengePostCard } from "@/components/challenge/common/challenge-post-card";
import { useGetChallenges } from "@/hooks/challenge/useChallenge";
import { Box, Divider } from "@mui/material";

export default function Desafios() {
  const { data: challenges, isLoading } = useGetChallenges();
  if (isLoading) return <div>Carregando...</div>;

  return challenges?.map(desafio =>
    <Box 
      key={desafio.id} 
      sx={{ 
        mb: 4,
        display: 'grid',
        gridTemplateColumns: '2fr minmax(0, 8fr) 2fr',
      }}>
      <ChallengePostCard desafio={desafio} key={desafio.id} gridColumn={2}/>
      <Divider />

      <h1>Hello world</h1>
    </Box>
  );
}