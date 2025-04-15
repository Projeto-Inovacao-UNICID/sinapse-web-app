import { axiosInstance } from "../api";

export class PostCommentProfile {
    async postCommentProfile(id: string, conteudo: string) {
        const response = await axiosInstance.post(`/usuarios/${id}/comentarios-perfil`, { conteudo }, { withCredentials: true });
        return response.data;
    }
}

export class GetCommentsProfile {
    async getCommentsProfile(id: string, page: number, limit: number) {
        const response = await axiosInstance.get(`/usuarios/${id}/comentarios-perfil`, {
            params: { page, limit },
            withCredentials: true
        });
        return response.data;
    }
}

export class DeleteCommentProfile {
    async deleteCommentProfile(comentarioId: string) {
        const response = await axiosInstance.delete(`/comentarios-perfil/${comentarioId}`, { withCredentials: true });
        return response.data;
    }
}