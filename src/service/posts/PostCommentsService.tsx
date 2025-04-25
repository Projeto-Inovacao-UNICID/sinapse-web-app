import { axiosInstance } from "../api";

export class PostCommentsService {
    async postPostComment(postId: string, conteudo: string) {
        const response = await axiosInstance.post(`/comentarios`, { postId, conteudo }, { withCredentials: true });
        return response.status;
    }

    async pathPostComment(comentarioId: string, postId: string, conteudo: string) {
        const response = await axiosInstance.patch(`/comentarios/`, { comentarioId, postId, conteudo }, { withCredentials: true });
        return response.status;
    }

    async deletePostComment(comentarioId: string) {
        const response = await axiosInstance.delete(`/comentarios`, { params: { comentarioId, withCredentials: true } });
        return response.status;
    }
}