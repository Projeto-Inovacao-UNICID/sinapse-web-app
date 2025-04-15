import { UUID } from "crypto";
import { axiosInstance } from "./api";

export class PostConversa {  
    async postConversa(participanteId: UUID) {
        const response = await axiosInstance.post(`/conversas`, { participanteId }, { withCredentials: true });
        return response.data;
    }
  }

export class GetConversa {
    async getConversa(conversaId: number) {
        const response = await axiosInstance.get(`/conversas/${conversaId}`, { withCredentials: true });
        return response.data;
    }
}

export class GetConversasNotificacoes {
    async getConversasNotificacoes() {
        const response = await axiosInstance.get(`/conversas/notificacoes`, { withCredentials: true });
        return response.data;
    }
}
