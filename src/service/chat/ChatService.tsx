import { UUID } from "crypto";
import { axiosInstance } from "../api";

export class PostChat {  
    async postChat(participanteId: UUID) {
        const response = await axiosInstance.post(`/conversas`, { participanteId }, { withCredentials: true });
        return response.data;
    }
  }

export class GetChat {
    async getChat(conversaId: number) {
        const response = await axiosInstance.get(`/conversas/${conversaId}`, { withCredentials: true });
        return response.data;
    }
}

export class GetChatNotifications {
    async getChatNotifications() {
        const response = await axiosInstance.get(`/conversas/notificacoes`, { withCredentials: true });
        return response.data;
    }
}
