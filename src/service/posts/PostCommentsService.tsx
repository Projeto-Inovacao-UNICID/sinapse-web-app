// src/service/PostCommentsService.ts
import { axiosInstance } from "../api";
import {
  CommentCreateDto,
  CommentUpdateDto,
  CommentTreeDto,
  CommentTreePageResponse,
} from "@/types";

export class PostCommentsService {
  /** Lista a árvore de comentários para uma postagem, com paginação */
  async fetchCommentsTree(
    postagemId: number,
    page = 0,
    size = 10
  ): Promise<CommentTreePageResponse> {
    const { data } = await axiosInstance.get<CommentTreePageResponse>(
      `/comentarios/arvore/${postagemId}`,
      {
        params: { page, size },
        withCredentials: true,
      }
    );
    return data;
  }

  /** Cria um novo comentário (ou resposta) */
  async createComment(payload: CommentCreateDto): Promise<CommentTreeDto> {
    const { data } = await axiosInstance.post<CommentTreeDto>(
      `/comentarios`,
      {
        conteudo: payload.conteudo,
        postagemId: payload.postagemId,
        ...(payload.comentarioPaiId !== undefined && {
          comentarioPaiId: payload.comentarioPaiId,
        }),
      },
      { withCredentials: true }
    );
    return data;
  }

  /** Atualiza o texto de um comentário existente */
  async updateComment(payload: CommentUpdateDto): Promise<CommentTreeDto> {
    const { data } = await axiosInstance.patch<CommentTreeDto>(
      `/comentarios`,
      {
        comentarioId: payload.comentarioId,
        conteudo: payload.conteudo,
      },
      { withCredentials: true }
    );
    return data;
  }

  /** Remove um comentário, enviando o ID no body da requisição DELETE */
  async deleteComment(comentarioId: number): Promise<void> {
    await axiosInstance.delete(`/comentarios`, {
      data: { comentarioId },
      withCredentials: true,
    });
  }
}
