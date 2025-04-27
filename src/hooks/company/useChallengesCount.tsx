import { useQuery } from '@tanstack/react-query'
import { challengeService } from '@/service/challenge/ChallengeService'

export const useChallengesCount = (companyId: string) =>
  useQuery({
    queryKey: ['challenges-count', companyId],
    queryFn: () => challengeService.getCounts(companyId),
    enabled: !!companyId,
  })
