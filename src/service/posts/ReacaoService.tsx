// src/service/posts/ReacaoService.ts
import { axiosInstance } from '@/service/api';

export type ReactionType = 'LIKE' | 'DISLIKE'; 

export interface ReacaoResponse {
  id: string;
  postagemId: string;
  usuarioId: string;
  tipo: ReactionType;
}

export type ReactionsCount = Record<ReactionType, number>;

export class ReacaoService {
  /**
   * Cria ou atualiza a reação do usuário na postagem.
   */
  async react(postagemId: string, tipo: ReactionType): Promise<ReacaoResponse> {
    const { data } = await axiosInstance.post<ReacaoResponse>(
      `/postagens/${postagemId}/reacoes`,
      { tipo },
      { withCredentials: true }
    );
    return data;
  }

  /**
   * Remove a reação do usuário na postagem.
   */
  async removeReaction(postagemId: string): Promise<void> {
    await axiosInstance.delete(
      `/postagens/${postagemId}/reacoes`,
      { withCredentials: true }
    );
  }

  /**
   * Retorna a contagem de reações agrupadas por tipo.
   */
  async countReacoes(postagemId: string): Promise<ReactionsCount> {
    const { data } = await axiosInstance.get<ReactionsCount>(
      `/postagens/${postagemId}/reacoes`,
      { withCredentials: true }
    );
    return data;
  }
}
