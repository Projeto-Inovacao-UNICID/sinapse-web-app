import { Friend, FriendshipInvitation, FriendshipInvitationsResponse } from "@/types";
import { axiosInstance } from "../api";

export class FriendshipService {
    async postFriendship(destinatarioId: string) {
        const response = await axiosInstance.post<FriendshipInvitation>(`/amizades`, { destinatarioId }, { withCredentials: true });
        return response.data;
    }

    async getFriendship() {
        const response = await axiosInstance.get<Friend[]>(`/amizades`, { withCredentials: true });
        return response.data;
    }

    async getInvitations(tipo: "enviados" | "recebidos", page: number = 0, size: number = 10) {
        const response = await axiosInstance.get<FriendshipInvitationsResponse>(`/amizades/convites?tipo=${tipo}&page=${page}&size=${size}`, {
            withCredentials: true
        });
        return response.data;
    }

    async getRecomendations() {
        const response = await axiosInstance.get(`/amizades/recomendacoes/comum`, { withCredentials: true });
        return response.data;
    }

    async patchFriendship(amizadeId: number, status: string) {
        const response = await axiosInstance.patch(`/amizades/atualizar`, { amizadeId, status }, { withCredentials: true });
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
