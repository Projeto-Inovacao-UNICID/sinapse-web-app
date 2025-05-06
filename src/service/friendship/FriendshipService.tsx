import {
  Friend,
  FriendshipInvitation,
  FriendshipInvitationsResponse,
  UpdateFriendshipStatusDto
} from "@/types";
import { axiosInstance } from "../api";
  
  export class FriendshipService {
    async postFriendship(destinatarioId: string): Promise<FriendshipInvitation> {
      const response = await axiosInstance.post(`/amizades`, destinatarioId, {
        withCredentials: true,
      });
      return response.data;
    }
  
    async getFriendship(): Promise<Friend[]> {
      const response = await axiosInstance.get(`/amizades`, {
        withCredentials: true,
      });
      return response.data;
    }
  
    async getInvitations(tipo: "enviados" | "recebidos", page = 0, size = 10): Promise<FriendshipInvitationsResponse> {
      const response = await axiosInstance.get(
        `/amizades/convites?tipo=${tipo}&page=${page}&size=${size}`,
        { withCredentials: true }
      );
      return response.data;
    }
  
    async getRecomendations(): Promise<Friend[]> {
      const response = await axiosInstance.get(`/amizades/recomendacoes/comum`, {
        withCredentials: true,
      });
      return response.data;
    }
  
    async patchFriendship(data: UpdateFriendshipStatusDto): Promise<FriendshipInvitation> {
      const response = await axiosInstance.patch(`/amizades/atualizar`, data, {
        withCredentials: true,
      });
      return response.data;
    }

    async deleteFriendship(amizadeId: number) {
        const response = await axiosInstance.delete('/amizades/remover', {
            data: { amizadeId },
            withCredentials: true
        });
        return response.status;
    }
  }
  