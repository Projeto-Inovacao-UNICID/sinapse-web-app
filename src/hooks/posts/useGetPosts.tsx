// src/hooks/posts/useGetPosts.ts
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/service/api'

export interface Post {
  id: string
  autorId: string
  autorNome: string
  autorAvatarUrl: string
  conteudo: string
  createdAt: string
  arquivoIds: number[]
  imagemUrl?: string
  publico: boolean
  isCompany: boolean
}

interface PostagemResponseDto {
  id: number
  autorId: string
  autorNome: string
  autorAvatarUrl: string
  conteudo: string
  createdAt: string
  arquivoIds: number[]
  publico: boolean
  isEmpresa: boolean
}

const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/$/, '')

async function fetchPosts(): Promise<Post[]> {
  const { data } = await axiosInstance.get<PostagemResponseDto[]>(
    '/postagens/publicas',
    { withCredentials: true }
  )

  return data.map(p => {
    const primeiro = p.arquivoIds[0]

    const avatarUrl = p.autorAvatarUrl.startsWith('http')
      ? p.autorAvatarUrl
      : `${API_BASE}${p.autorAvatarUrl}`

    return {
      id:             String(p.id),
      autorId:        p.autorId,
      autorNome:      p.autorNome,
      autorAvatarUrl: avatarUrl,
      conteudo:       p.conteudo,
      createdAt:      p.createdAt,
      arquivoIds:     p.arquivoIds,
      publico:        p.publico,
      imagemUrl:      primeiro
        ? `${API_BASE}/postagens/arquivos/${primeiro}`
        : undefined,
      isCompany:      p.isEmpresa
    }
  })
}

export function useGetPosts() {
  return useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false
  })
}
