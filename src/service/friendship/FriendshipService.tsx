import { axiosInstance } from "../api";
import { FriendshipInvitation, FriendshipInvitationsResponse, User } from "@/types";

export class FriendshipService {
    async postFriendship(destinatarioId: string) {
        const response = await axiosInstance.post<FriendshipInvitation>(`/amizades`, { destinatarioId }, { withCredentials: true });
        return response.data;
    }

    async getFriendship() {
        const response = await axiosInstance.get<User[]>(`/amizades`, { withCredentials: true });
        return response.data;
    }

    async getInvitations(tipo: string, page: number = 0, size: number = 10) {
        const response = await axiosInstance.get<FriendshipInvitationsResponse>(`/amizades/convites?tipo=${tipo}&page=${page}&size=${size}`, {
            withCredentials: true
        });
        return response.data;
    }

    async getRecomendations() {
        const response = await axiosInstance.get(`/amizades/recomendacoes/comum`, { withCredentials: true });
        return response.data;
    }

    async patchFriendship(amizadeId: string, status: string) {
        const response = await axiosInstance.patch(`/amizades/atualizar`, { amizadeId, status }, { withCredentials: true });
        return response.status;
    }

    async deleteFriendship(amizadeId: string) {
        const response = await axiosInstance.delete('/amizades/remover', {
            data: { amizadeId },
            withCredentials: true
        });
        return response.status;
    }
}
