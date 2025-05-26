import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/service/api';
import { Post, PostagemResponseDto } from '@/types';

const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/$/, '');

async function fetchUserPostsByFilter(userId: string): Promise<Post[]> {
  const { data } = await axiosInstance.get<PostagemResponseDto[]>(
    '/postagens/publicas',
    { withCredentials: true }
  );

  return data
    .filter(p => p.autorId === userId) // <-- filtro no frontend
    .map(p => {
      const primeiro = p.arquivoIds[0];

      const avatarUrl = p.autorAvatarUrl.startsWith('http')
        ? p.autorAvatarUrl
        : `${API_BASE}${p.autorAvatarUrl}`;

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
        isCompany:      p.isEmpresa ?? false,
      };
    });
}

export function useGetUserPosts(userId: string) {
  return useQuery<Post[]>({
    queryKey: ['user-posts', userId],
    queryFn: () => fetchUserPostsByFilter(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
