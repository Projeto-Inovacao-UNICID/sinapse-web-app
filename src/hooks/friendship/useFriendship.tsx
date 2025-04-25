import { useMutation, useQuery } from '@tanstack/react-query';
import { FriendshipService } from '@/service/friendship/FriendshipService';
import { FriendshipInvitation, FriendshipInvitationsResponse, FriendshipInviteType, User } from '@/types';

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

export function usePostFriendship() {
  return useMutation<FriendshipInvitation, Error, string>({
    mutationFn: async (destinatarioId: string) => {
      const service = new FriendshipService();
      return service.postFriendship(destinatarioId);
    },
  });
}

export function useGetFriendshipInvitations(tipo: FriendshipInviteType, page?: number, size?: number) {
  return useQuery<FriendshipInvitationsResponse, Error>({
    queryKey: ['friendship-invitations'],
    queryFn: async () => {
      const service = new FriendshipService();
      return service.getInvitations(tipo, page, size);
    },
    staleTime: 1000 * 60 * 5, // cache por 5 minutos
    refetchOnWindowFocus: false,
  });
}