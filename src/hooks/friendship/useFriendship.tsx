import { useQuery } from '@tanstack/react-query';
import { FriendshipService } from '@/service/friendship/FriendshipService';
import { User } from '@/types';

export function useFriendship() {
  return useQuery<User[], Error>({
    queryKey: ['friendship'],
    queryFn: async () => {
      const service = new FriendshipService();
      return service.getFriendship();
    },
    staleTime: 1000 * 60 * 5, // cache por 5 minutos
    refetchOnWindowFocus: false,
  });
}
