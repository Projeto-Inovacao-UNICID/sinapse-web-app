import ChallengeDetailPage from '@/components/challenge/detail/challenge-detail-page';

interface PageProps {
  params: { id: string };
}

export default async function DesafioPage({ params }: PageProps) {
  const numberId = Number(params.id);
  return <ChallengeDetailPage id={numberId} />;
}
