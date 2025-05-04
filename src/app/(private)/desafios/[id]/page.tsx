// src/app/(private)/desafios/[id]/page.tsx
import React from 'react';
import ChallengeDetailPage from '@/components/challenge/detail/challenge-detail-page';

interface PageProps {
  params: { id: string };
}

export default function DesafioPage({ params }: PageProps) {
  return <ChallengeDetailPage id={params.id} />;
}
