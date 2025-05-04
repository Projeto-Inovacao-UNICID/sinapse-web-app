import { axiosInstance } from "../api";

export class PostService {
    async postPost(conteudo: string, repost_id: string | null, arquivos: any[]) {
        const response = await axiosInstance.post(`/postagens`, { conteudo, repost_id, arquivos }, { withCredentials: true });
        return response.status;
    }

    async patchPost(postId: string, conteudo: string) {
        const response = await axiosInstance.patch(`/postagens/${postId}`, { conteudo }, { withCredentials: true });
        return response.status;
    }

    async deletePost(postId: string) {
        const response = await axiosInstance.delete(`/postagens/${postId}`, { withCredentials: true });
        return response.status;
    }

    async getPosts() {
        const response = await axiosInstance.get(`/postagens`, { withCredentials: true });
        return response.data;
    }

    async getPublicPosts() {
        const response = await axiosInstance.get(`/postagens/publicas`, { withCredentials: true });
        return response.data;
    }

    async getPostById(postId: string) {
        const response = await axiosInstance.get(`/postagens/${postId}`, { withCredentials: true });
        return response.data;
    }

    async getPostBySlug(slug: string) {
        const response = await axiosInstance.get(`/postagens/s/${slug}`, { withCredentials: true });
        return response.data;
    }

    async patchPostPrivacy(postId: string, isPublic: boolean) {
        const response = await axiosInstance.patch(`/postagens/${postId}/privacidade`, { isPublic }, { withCredentials: true });
        return response.status;
    }

    async getRecommendedPosts() {
        const response = await axiosInstance.get(`/postagens/recomendadas`, { withCredentials: true });
        return response.data;
    }
}
