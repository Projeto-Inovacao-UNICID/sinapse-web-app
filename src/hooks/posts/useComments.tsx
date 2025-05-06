// src/hooks/posts/useComments.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PostCommentsService } from '@/service/posts/PostCommentsService';
import {
  CommentTreeDto,
  CommentTreePageResponse,
  CommentCreateDto
} from '@/types';

const service = new PostCommentsService();

/**
 * Busca a árvore de comentários (aninhados) para a postagem.
 */
export function useCommentsTree(postagemId: number, page = 0, size = 10) {
  return useQuery<CommentTreePageResponse, Error>({
    queryKey: ['comentarios', postagemId, page, size],
    queryFn: () => service.fetchCommentsTree(postagemId, page, size),
    staleTime: 60_000
  });
}

/**
 * Cria um comentário (ou resposta) e, ao final, invalida a árvore de comentários.
 */
export function useCreateComment() {
  const qc = useQueryClient();
  return useMutation<CommentTreeDto, Error, CommentCreateDto>({
    mutationFn: (dto) => service.createComment(dto),
    onSuccess: (_data, dto) => {
      qc.invalidateQueries({ queryKey: ['comentarios', dto.postagemId] });
    }
  });
}

/**
 * Retorna a contagem de comentários diretos de uma postagem (flat).
 */
export function usePostCommentsCount(postagemId: number) {
  return useQuery<number, Error>({
    queryKey: ['post-comments-count', postagemId],
    queryFn: async () => {
      const data = await service.fetchCommentsTree(postagemId, 0, 1000);
      return data.totalElements;
    },
    staleTime: 10_000,
    refetchOnWindowFocus: false
  });
}

