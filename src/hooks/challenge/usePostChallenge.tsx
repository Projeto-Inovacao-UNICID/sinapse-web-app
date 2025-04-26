import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/service/api';
import { Challenge } from '@/types/challenge';

export function usePostChallenge(empresaId: string) {
  return useMutation({
    mutationFn: async (desafio: Challenge) => {
      const response = await axiosInstance.post(`/desafios/${empresaId}/criar`, desafio, {
        withCredentials: true,
      });
      return response.data;
    },
  });
}
