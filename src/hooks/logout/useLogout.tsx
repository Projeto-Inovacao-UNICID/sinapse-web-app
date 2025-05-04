import { axiosInstance } from '@/service/api';
import { useMutation } from '@tanstack/react-query';

export function usePostLogout() {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(
        `auth/logout`,
        null, 
        { withCredentials: true } 
      );
      return response.data;
    },
  });
}
