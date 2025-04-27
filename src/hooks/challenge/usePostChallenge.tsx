import { axiosInstance } from '@/service/api';
import { ChallengeToPost } from '@/types/challenge';
import { useMutation } from '@tanstack/react-query';

export function usePostChallenge(empresaId: string) {
  return useMutation({
    mutationFn: async (desafio: ChallengeToPost) => {
      const response = await axiosInstance.post(`/desafios/${empresaId}/criar`, desafio, {
        withCredentials: true,
      });
      return response.data;
    },
  });
}
