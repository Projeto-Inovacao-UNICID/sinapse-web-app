'use client';

import { ChallengePostCard } from "@/components/challenge/challenge-post-card";
import { useGetChallenges } from "@/hooks/challenge/useGetChallenge";
import { Box, Divider } from "@mui/material";

export default function Desafios() {
  const { data: challenges, isLoading } = useGetChallenges();
  if (isLoading) return <div>Carregando...</div>;

  return challenges?.map(desafio =>
    <Box key={desafio.id}>
      <ChallengePostCard desafio={desafio} key={desafio.id} />
      <Divider />
    </Box>
  );
}