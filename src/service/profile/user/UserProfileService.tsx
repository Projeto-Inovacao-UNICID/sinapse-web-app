// src/service/user/profile/UserProfileService.ts
import { axiosInstance } from "@/service/api";
import {
  UpdateUserProfileDto,
  UserProfileCommentsResponse,
  UserProfileResponse
} from "@/types";

export class UserProfileService {
  async getUserProfile(userId: string): Promise<UserProfileResponse> {
    const response = await axiosInstance.get<UserProfileResponse>(
      `/profile/user/${userId}`,
      { withCredentials: true }
    );
    return response.data;
  }

  async patchUserProfile(userId: string, payload: UpdateUserProfileDto): Promise<void> {
    await axiosInstance.patch(`/profile/user/${userId}`, payload, {
      withCredentials: true,
    });
  }

  async uploadUserProfileImage(userId: string, image: File): Promise<void> {
    const formData = new FormData();
    formData.append("file", image);

    await axiosInstance.post(`/profile/user/${userId}/imagem`, formData, {
      withCredentials: true,
    });
  }

  async deleteUserProfileImage(userId: string): Promise<void> {
    await axiosInstance.delete(`/profile/user/${userId}/imagem`, {
      withCredentials: true,
    });
  }

  async commentUserProfile(userId: string, comment: string): Promise<void> {
    await axiosInstance.post(
      `/profile/user/${userId}/comentarios`,
      { comment },
      { withCredentials: true }
    );
  }

  async getUserProfileComments(
    userId: string,
    page: number,
    size: number
  ): Promise<UserProfileCommentsResponse> {
    const response = await axiosInstance.get<UserProfileCommentsResponse>(
      `/profile/user/${userId}/comentarios`,
      {
        params: { page, size },
        withCredentials: true,
      }
    );
    return response.data;
  }

  async deleteUserProfileComment(commentId: number): Promise<void> {
    await axiosInstance.delete(`/profile/user/comentarios/${commentId}`, {
      withCredentials: true,
    });
  }

  async getUserProfileImage(userId: string): Promise<string> {
    const response = await axiosInstance.get(`/profile/user/${userId}/imagem`, {
      responseType: "blob",
      withCredentials: true,
    });
    const imageBlob = response.data;
    return URL.createObjectURL(imageBlob);
  }
}
