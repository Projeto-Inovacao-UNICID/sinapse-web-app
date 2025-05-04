import { axiosInstance } from "@/service/api";
import { UserProfileCommentsResponse, UserProfileResponse } from "@/types";

export class UserProfileService {
  async getUserProfile(userId: string) {
    const response = await axiosInstance.get<UserProfileResponse>(`/profile/user/${userId}`, { withCredentials: true });
    return response.data;
  }

  async patchUserProfile(userId: string, nome: string, username: string, email: string) {
    const response = await axiosInstance.patch(`/profile/user/${userId}`, {nome, username, email}, { withCredentials: true });
    return response.status;
  }

  async uploadUserProfileImage(userId: string, image: File) {
    const response = await axiosInstance.post(`/profile/user/${userId}/imagem`, image, { withCredentials: true });
    return response.status;
  }

  async deleteUserProfileImage(userId: string) {
    const response = await axiosInstance.delete(`/profile/user/${userId}/imagem`, { withCredentials: true });
    return response.status;
  }

  async commentUserProfile(userId: string, comment: string) {
    const response = await axiosInstance.post(`/profile/user/${userId}/comentarios`, { comment }, { withCredentials: true });
    return response.status;
  }

  async getUserProfileComments(userId: string, page: number, size: number) {
    const response = await axiosInstance.get<UserProfileCommentsResponse>(`/profile/user/${userId}/comentarios?page=${page}&size=${size}`, { withCredentials: true });
    return response.data;
  }

  async deleteUserProfileComment(commentId: number) {
    const response = await axiosInstance.delete(`/profile/user/comentarios/${commentId}`, { withCredentials: true });
    return response.status;
  }

  async getUserProfileImage(userId: string) {
  const response = await axiosInstance.get(`/profile/user/${userId}/imagem`, {
    responseType: 'blob', // importante para receber como arquivo binário
    withCredentials: true,
  });

  const imageBlob = response.data;
  const imageUrl = URL.createObjectURL(imageBlob); // cria uma URL utilizável

  return imageUrl;
}
}