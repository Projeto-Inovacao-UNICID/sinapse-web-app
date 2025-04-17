import { axiosInstance } from "../api";

export class NotificationsSSEService {
    async getNotificationsSSE() {
        const response = await axiosInstance.get(`/conversas/notificacoes/sse`, { withCredentials: true });
        return response.data;
    }
}
