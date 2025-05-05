import { axiosInstance } from "../api";
import { EditMessageDto, NewMessageDto } from "@/types";

export class MessageService {
  async postMessage(conversaId: number, dto: NewMessageDto) {
    const response = await axiosInstance.post(`/conversas/${conversaId}/mensagens`, dto, {
      withCredentials: true,
    });
    return response.status;
  }

  async getMessages(conversaId: number) {
    const response = await axiosInstance.get(`/conversas/${conversaId}/mensagens`, {
      withCredentials: true,
    });
    return response.data;
  }

  async patchMessage(conversaId: number, dto: EditMessageDto) {
    const response = await axiosInstance.patch(`/conversas/${conversaId}/mensagens/${dto.msgId}`, dto, {
      withCredentials: true,
    });
    return response.status;
  }

  async deleteMessage(conversaId: number, msgId: number) {
    const response = await axiosInstance.delete(`/conversas/${conversaId}/mensagens/${msgId}`, {
      withCredentials: true,
    });
    return response.status;
  }
}
