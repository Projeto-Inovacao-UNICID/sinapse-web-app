import { axiosInstance } from "../api";

export class MessageService {
    async postMessage(conversaId: number, conteudo: string) {
        const response = await axiosInstance.post(`/conversas/${conversaId}/mensagens`, { conteudo }, { withCredentials: true });
        return response.status;
    }

    async getMessages(conversaId: number) {
        const response = await axiosInstance.get(`/conversas/${conversaId}/mensagens`, { withCredentials: true });
        return response.data;
    }

    async patchMessage(conversaId: number, msgId: number) {
        const response = await axiosInstance.patch(`/conversas/${conversaId}/mensagens/${msgId}`, { withCredentials: true });
        return response.status;
    }

    async deleteMessage(conversaId: number, msgId: number) {
        const response = await axiosInstance.delete(`/conversas/${conversaId}/mensagens/${msgId}`, { withCredentials: true });
        return response.status;
    }
}
