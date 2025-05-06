'use client';

import { ChallengeFeed } from "@/components/challenge/common/challenge-feed";
import { useGetChallenges } from "@/hooks/challenge/useChallenge";

export default function Desafios() {
  const { data: challenges, isLoading } = useGetChallenges();
  if (isLoading) return <div>Carregando...</div>;

  return <ChallengeFeed />;
}