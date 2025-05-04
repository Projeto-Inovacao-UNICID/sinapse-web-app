// src/service/PostCommentsService.ts
import { axiosInstance } from "../api";

export interface ComentarioDto {
  id: number;
  conteudo: string;
  postagemId: number;
  comentarioPaiId?: number;
  autorId: string;
  autorNome: string;
  createdAt: string;
  respostas: ComentarioDto[];
}

export interface CommentsTreeResponse {
  content: ComentarioDto[];
  page: number;
  size: number;
  totalElements: number;
}

export interface CreateCommentPayload {
  conteudo: string;
  postagemId: number;
  comentarioPaiId?: number;
}

export interface UpdateCommentPayload {
  comentarioId: number;
  conteudo: string;
}

export class PostCommentsService {
  /** Lista a árvore de comentários para uma postagem, com paginação */
  async fetchCommentsTree(
    postagemId: number,
    page = 0,
    size = 10
  ): Promise<CommentsTreeResponse> {
    const { data } = await axiosInstance.get<CommentsTreeResponse>(
      `/comentarios/arvore/${postagemId}`,
      {
        params: { page, size },
        withCredentials: true,
      }
    );
    return data;
  }

  /** Cria um novo comentário (ou resposta) */
  async createComment(payload: CreateCommentPayload): Promise<ComentarioDto> {
    const { data } = await axiosInstance.post<ComentarioDto>(
      `/comentarios`,
      {
        conteudo: payload.conteudo,
        postagemId: payload.postagemId,
        // só inclua se for resposta a outro comentário
        ...(payload.comentarioPaiId !== undefined && {
          comentarioPaiId: payload.comentarioPaiId,
        }),
      },
      { withCredentials: true }
    );
    return data;
  }

  /** Atualiza o texto de um comentário existente */
  async updateComment(payload: UpdateCommentPayload): Promise<ComentarioDto> {
    const { data } = await axiosInstance.patch<ComentarioDto>(
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
    await axiosInstance.delete(
      `/comentarios`,
      {
        data: { comentarioId },
        withCredentials: true,
      }
    );
  }
}
