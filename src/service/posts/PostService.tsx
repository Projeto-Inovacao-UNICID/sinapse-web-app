import { axiosInstance } from "../api";
import {
  PostCreateDto,
  PostResponseDto,
  PrivacyDto
} from "@/types";

export class PostService {
  async postPost(
    conteudo: string,
    repost_id: string | null,
    arquivos: any[]
  ): Promise<PostResponseDto> {
    const response = await axiosInstance.post<PostResponseDto>(
      `/postagens`,
      { conteudo, repost_id, arquivos },
      { withCredentials: true }
    );
    return response.data;
  }

  async patchPost(postId: string, conteudo: string): Promise<void> {
    await axiosInstance.patch(`/postagens/${postId}`, { conteudo }, { withCredentials: true });
  }

  async deletePost(postId: string): Promise<void> {
    await axiosInstance.delete(`/postagens/${postId}`, { withCredentials: true });
  }

  async getPosts(): Promise<PostResponseDto[]> {
    const response = await axiosInstance.get<PostResponseDto[]>(`/postagens`, { withCredentials: true });
    return response.data;
  }

  async getPublicPosts(): Promise<PostResponseDto[]> {
    const response = await axiosInstance.get<PostResponseDto[]>(`/postagens/publicas`, { withCredentials: true });
    return response.data;
  }

  async getPostById(postId: string): Promise<PostResponseDto> {
    const response = await axiosInstance.get<PostResponseDto>(`/postagens/${postId}`, { withCredentials: true });
    return response.data;
  }

  async getPostBySlug(slug: string): Promise<PostResponseDto> {
    const response = await axiosInstance.get<PostResponseDto>(`/postagens/s/${slug}`, { withCredentials: true });
    return response.data;
  }

  async patchPostPrivacy(postId: string, isPublic: boolean): Promise<void> {
    await axiosInstance.patch(`/postagens/${postId}/privacidade`, { isPublic }, { withCredentials: true });
  }

  async getRecommendedPosts(): Promise<PostResponseDto[]> {
    const response = await axiosInstance.get<PostResponseDto[]>(`/postagens/recomendadas`, { withCredentials: true });
    return response.data;
  }
}
