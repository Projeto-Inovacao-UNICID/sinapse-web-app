import { UUID } from "crypto";
import { axiosInstance } from "../api";

export class PostFollowers {
    async postFollowers(empresaId: UUID) {
        const response = await axiosInstance.post(`/seguidores`, { empresaId }, { withCredentials: true });
        return response.data;
    }
}

export class GetFollowedCompanies {
    async getFollowedCompanies() {
        const response = await axiosInstance.get(`/seguidores/empresas`, { withCredentials: true });
        return response.data;
    }
}

export class getFollowedUsers {
    async getFollowedUsers(empresaId: UUID) {
        const response = await axiosInstance.get(`/seguidores/usuarios/${empresaId}`, { withCredentials: true });
        return response.data;
    }
}

export class GetCountFollowers {
    async getCountFollowers(empresaId: UUID) {
        const response = await axiosInstance.get(`/seguidores/contagem/${empresaId}`, { withCredentials: true });
        return response.data;
    }
}

export class DeleteFollowers {
    async deleteFollowers(empresaId: UUID) {
        const response = await axiosInstance.delete(`/seguidores`, { data: { empresaId }, withCredentials: true });
        return response.data;
    }
}