'use client';

import { CreationChallengeCard } from "@/components/challenge/creation-challenge-card";
import { useSession } from "@/hooks/session/useSession";

export default function CriarDesafio() {
  const {session } = useSession();
  const role = session?.roles;
  const empresaId = session?.id;
  return (
    <CreationChallengeCard empresaId="1" />
  );
}