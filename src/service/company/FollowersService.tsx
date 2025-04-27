// src/service/FollowersService.ts
import { axiosInstance } from "../api";

export class FollowersService {
  async postFollow(empresaId: string) {
    const response = await axiosInstance.post(
      `/seguidores`,
      { empresaId },
      { withCredentials: true }
    );
    return response.status;
  }

  async deleteFollow(empresaId: string) {
    const response = await axiosInstance.delete(
      `/seguidores`,
      { data: { empresaId }, withCredentials: true }
    );
    return response.status;
  }

  async getFollowedCompanies() {
    const response = await axiosInstance.get(`/seguidores/empresas`, {
      withCredentials: true,
    });
    return response.data;
  }

  async getFollowersOfCompany() {
    const response = await axiosInstance.get(`/seguidores/usuarios`, {
      withCredentials: true,
    });
    return response.data;
  }

  async getFollowersCount(empresaId: string) {
    const response = await axiosInstance.get(`/seguidores/contagem`, {
      params: { empresaId },
      withCredentials: true,
    });
    return response.data.totalSeguidores as number;
  }

  async checkFollowing(empresaId: string) {
    const response = await axiosInstance.get(
      `/seguidores/check?empresaId=${empresaId}`,
      { withCredentials: true }
    );
    return response.data.following as boolean;
  }
}

export const followersService = new FollowersService();
