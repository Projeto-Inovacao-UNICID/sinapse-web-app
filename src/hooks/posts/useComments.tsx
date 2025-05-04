// src/hooks/posts/useComments.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '@/service/api'

export interface Comentario {
  id: number
  conteudo: string
  autorId: string
  autorNome: string
  autorAvatarUrl?: string
  createdAt: string
  respostas: Comentario[]
}

interface RawComentario {
  id: number
  conteudo: string
  usuarioId: string
  empresaId?: string
  autorNome: string
  autorAvatarUrl?: string
  nivel: number
  createdAt: string
  updatedAt: string
  filhos?: RawComentario[]
}

interface RawResponse {
  content: RawComentario[]
  page: number
  size: number
  totalElements: number
}

function mapComentario(raw: RawComentario): Comentario {
  return {
    id: raw.id,
    conteudo: raw.conteudo,
    autorId: raw.usuarioId,
    autorNome: raw.autorNome,
    autorAvatarUrl: raw.autorAvatarUrl,
    createdAt: raw.createdAt,
    respostas: (raw.filhos ?? []).map(mapComentario)
  }
}

/**
 * Busca a árvore de comentários (aninhados) para a postagem.
 */
export function useCommentsTree(postagemId: string, page = 0, size = 10) {
  return useQuery<{
    content: Comentario[]
    page: number
    size: number
    totalElements: number
  }, Error>({
    queryKey: ['comentarios', postagemId, page, size],
    queryFn: async () => {
      const { data } = await axiosInstance.get<RawResponse>(
        `/comentarios/arvore/${postagemId}`,
        { params: { page, size }, withCredentials: true }
      )
      return {
        page: data.page,
        size: data.size,
        totalElements: data.totalElements,
        content: data.content.map(mapComentario)
      }
    },
    staleTime: 60_000
  })
}

export interface CreateCommentDto {
  conteudo: string
  postagemId: number
  comentarioPaiId?: number
}

/**
 * Cria um comentário (ou resposta) e, ao final, invalida a árvore de comentários.
 */
export function useCreateComment() {
  const qc = useQueryClient()
  return useMutation<unknown, Error, CreateCommentDto>({
    mutationFn: dto =>
      axiosInstance.post(
        `/comentarios`,
        {
          conteudo: dto.conteudo,
          postagemId: dto.postagemId,
          ...(dto.comentarioPaiId !== undefined && { comentarioPaiId: dto.comentarioPaiId })
        },
        { withCredentials: true }
      ),
    onSuccess: (_data, dto) => {
      qc.invalidateQueries({ queryKey: ['comentarios', String(dto.postagemId)] })
    }
  })
}

/**
 * Retorna a contagem de comentários diretos de uma postagem (flat).
 */
export function usePostCommentsCount(postagemId: string) {
  return useQuery<number, Error>({
    queryKey: ['post-comments-count', postagemId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<any[]>(
        `/postagens/${postagemId}/comentarios`,
        { withCredentials: true }
      )
      return data.length
    },
    staleTime: 10_000,
    refetchOnWindowFocus: false
  })
}
