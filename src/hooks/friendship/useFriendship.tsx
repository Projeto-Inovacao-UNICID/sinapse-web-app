import { FriendshipService } from '@/service/friendship/FriendshipService';
import { Friend, FriendshipInvitation, FriendshipInvitationsResponse, FriendshipInviteType } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useFriendship() {
  return useQuery<Friend[], Error>({
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
    queryKey: ['friendship-invitations', tipo],
    queryFn: async () => {
      const service = new FriendshipService();
      return service.getInvitations(tipo, page, size);
    },
    staleTime: 1000 * 60 * 5, // cache por 5 minutos
    refetchOnWindowFocus: false,
  });
}

export function useAcceptFriendshipRequest(amizadeId?: number) {
  return useMutation({
    mutationFn: async () => {
      if (!amizadeId) throw new Error('amizadeId é obrigatório');
      const service = new FriendshipService();
      return service.patchFriendship(amizadeId, 'aceito');
    },
  });
}

export function useDeleteFriendshipRequest(amizadeId?: number) {
  return useMutation({
    mutationFn: async () => {
      if (!amizadeId) throw new Error('amizadeId é obrigatório');
      const service = new FriendshipService();
      return service.deleteFriendship(amizadeId);
    },
  });
}
