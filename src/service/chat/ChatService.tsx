import {
  Chat,
  ChatNotificationDto,
  Contact,
  MessageResponseDto
} from "@/types";
import { axiosInstance } from "../api";
  
  export class ChatService {
    async postChat(participanteId: string): Promise<Chat> {
      const response = await axiosInstance.post(`/conversas`, { participanteId }, {
        withCredentials: true,
      });
      return response.data;
    }
  
    async getChat(conversaId: number) {
      const response = await axiosInstance.get(`/conversas/${conversaId}`, {
        withCredentials: true,
      });
      return response.data;
    }
  
    async getChatNotifications(): Promise<ChatNotificationDto[]> {
      const response = await axiosInstance.get(`/conversas/notificacoes`, {
        withCredentials: true,
      });
      return response.data;
    }
  
    async getChatsAndFriends(): Promise<Contact[]> {
      const response = await axiosInstance.get(`/conversas/minhas-conversas`, {
        withCredentials: true,
      });
      return response.data;
    }
  
    async listMessages(conversaId: number): Promise<MessageResponseDto[]> {
      const response = await axiosInstance.get(`/conversas/${conversaId}/mensagens`, {
        withCredentials: true,
      });
      return response.data;
    }
  }
  