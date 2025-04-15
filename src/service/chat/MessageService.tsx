import { axiosInstance } from "../api";

export class PostMessage {
    async postMessage(conversaId: number, conteudo: string) {
        const response = await axiosInstance.post(`/conversas/${conversaId}/mensagens`, { conteudo }, { withCredentials: true });
        return response.data;
    }
  }

export class getMessage {
    async getMessage(conversaId: number) {
        const response = await axiosInstance.get(`/conversas/${conversaId}/mensagens`, { withCredentials: true });
        return response.data;
    }
}

export class patchMessage {
    async patchMessage(conversaId: number, msgId: number) {
        const response = await axiosInstance.patch(`/conversas/${conversaId}/mensagens/${msgId}`, { withCredentials: true });
        return response.data;
    }
}

export class deleteMessage {
    async deleteMessage(conversaId: number, msgId: number) {
        const response = await axiosInstance.delete(`/conversas/${conversaId}/mensagens/${msgId}`, { withCredentials: true });
        return response.data;
    }
}