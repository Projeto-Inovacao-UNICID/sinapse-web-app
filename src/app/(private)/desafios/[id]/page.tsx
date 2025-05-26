// src/app/(private)/desafios/[id]/page.tsx
import React from 'react';
import ChallengeDetailPage from '@/components/challenge/detail/challenge-detail-page';

interface PageProps {
  params: { id: string };
}

export default function DesafioPage({ params }: PageProps) {
  const { id } = params;
  const numberId = Number(id);
  return <ChallengeDetailPage id={numberId} />;
}
