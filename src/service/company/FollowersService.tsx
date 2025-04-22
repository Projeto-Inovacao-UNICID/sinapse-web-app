import { axiosInstance } from "../api";

export class FollowersService {
    async postFollowers(empresaId: string) {
        const response = await axiosInstance.post(`/seguidores`, { empresaId }, { withCredentials: true });
        return response.data;
    }

    async getFollowedCompanies() {
        const response = await axiosInstance.get(`/seguidores/empresas`, { withCredentials: true });
        return response.data;
    }

    async getFollowedUsers(empresaId: string) {
        const response = await axiosInstance.get(`/seguidores/usuarios/${empresaId}`, { withCredentials: true });
        return response.data;
    }

    async getCountFollowers(empresaId: string) {
        const response = await axiosInstance.get(`/seguidores/contagem/${empresaId}`, { withCredentials: true });
        return response.data;
    }

    async deleteFollowers(empresaId: string) {
        const response = await axiosInstance.delete(`/seguidores`, {
            data: { empresaId },
            withCredentials: true
        });
        return response.data;
    }
}
