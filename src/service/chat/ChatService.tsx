import { UUID } from "crypto";
import { axiosInstance } from "../api";

export class ChatService {
    async postChat(participanteId: UUID) {
        const response = await axiosInstance.post(`/conversas`, { participanteId }, { withCredentials: true });
        return response.data;
    }

    async getChat(conversaId: number) {
        const response = await axiosInstance.get(`/conversas/${conversaId}`, { withCredentials: true });
        return response.data;
    }

    async getChatNotifications() {
        const response = await axiosInstance.get(`/conversas/notificacoes`, { withCredentials: true });
        return response.data;
    }
}
