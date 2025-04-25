import { axiosInstance } from "../api";
import { User } from "@/types";

export class FriendshipService {
    async postFriendship(destinatarioId: string) {
        const response = await axiosInstance.post(`/amizades`, { destinatarioId }, { withCredentials: true });
        return response.status;
    }

    async getFriendship() {
        const response = await axiosInstance.get<User[]>(`/amizades`, { withCredentials: true });
        return response.data;
    }

    async getInvitations() {
        const response = await axiosInstance.get(`/amizades/convites`, { withCredentials: true });
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
