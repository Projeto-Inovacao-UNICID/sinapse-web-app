import { useQuery } from '@tanstack/react-query';
import { ChallengeService } from '@/service/challenge/ChallengeService';
import { Challenge } from '@/types';

const challengeService = new ChallengeService();

export const useGetChallenges = () => {
  return useQuery<Challenge[]>({
    queryKey: ['challenges'],
    queryFn: () => challengeService.getChallenges(),
  });
};
