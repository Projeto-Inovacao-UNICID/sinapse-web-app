// src/hooks/posts/useGetPosts.ts
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/service/api'
import { Post, PostagemResponseDto } from '@/types'



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
      id:             p.id,
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
