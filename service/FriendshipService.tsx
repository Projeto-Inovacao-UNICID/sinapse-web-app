import { UUID } from "crypto";
import { axiosInstance } from "./api";

export class PostFriendship {
    async postFriendship(destinatarioId: UUID) {
        const response = await axiosInstance.post(`/amizades`, { destinatarioId }, { withCredentials: true });
        return response.data;
    }
}

export class GetFriendship {
    async getFriendship() {
        const response = await axiosInstance.get(`/amizades`, { withCredentials: true });
        return response.data;
    }
}

export class GetInvitations {
    async getInvitations() {
        const response = await axiosInstance.get(`/amizades/convites`, { withCredentials: true });
        return response.data;
    }
}

export class GetRecomendations {
    async getRecomendations() {
        const response = await axiosInstance.get(`/amizades/recomendacoes/comum`, { withCredentials: true });
        return response.data;
    }
}

export class PatchFriendship {
    async patchFriendship(amizadeId: string, status: string) {
        const response = await axiosInstance.patch(`/amizades/atualizar`, { amizadeId, status }, { withCredentials: true });
        return response.data;
    }
}

export class DeleteFriendship {
    async deleteFriendship(amizadeId: string) {
        const response = await axiosInstance.delete('/amizades/remover', {
            data: { amizadeId },
            withCredentials: true
        });
        return response.data;
    }
}
