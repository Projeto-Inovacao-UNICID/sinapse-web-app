import { FriendshipService } from '@/service/friendship/FriendshipService';
import {
  Friend,
  FriendshipInvitation,
  FriendshipInvitationsResponse,
  FriendshipInviteType,
  UpdateFriendshipStatusDto,
  RemoveFriendshipDto,
} from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';

const service = new FriendshipService();

export function useFriendship() {
  return useQuery<Friend[], Error>({
    queryKey: ['friendship'],
    queryFn: () => service.getFriendship(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export function usePostFriendship() {
  return useMutation<FriendshipInvitation, Error, string>({
    mutationFn: (destinatarioId) => service.postFriendship(destinatarioId),
  });
}

export function useGetFriendshipInvitations(tipo: FriendshipInviteType, page = 0, size = 10) {
  return useQuery<FriendshipInvitationsResponse, Error>({
    queryKey: ['friendship-invitations', tipo, page, size],
    queryFn: () => service.getInvitations(tipo, page, size),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export function useAcceptFriendshipRequest(amizadeId?: number) {
  return useMutation({
    mutationFn: async () => {
      if (!amizadeId) throw new Error('amizadeId é obrigatório');
      const service = new FriendshipService();
      return service.patchFriendship({amizadeId: amizadeId, status: 'aceito'});
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
