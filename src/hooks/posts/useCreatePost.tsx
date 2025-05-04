// src/hooks/posts/useCreatePost.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/service/api';
import type { Post } from '@/types';

export interface PostagemArquivoPayload {
  dados_arquivo: string;
  nome_arquivo: string;
  tipo_arquivo: string;
  tamanho_arquivo: number;
}

interface CreatePostPayload {
  conteudo: string;
  repost_id?: number | null;
  arquivos?: PostagemArquivoPayload[];
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation<Post, Error, CreatePostPayload>({
    mutationFn: payload =>
      axiosInstance
        .post<Post>('/postagens', payload, { withCredentials: true })
        .then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['posts'] })
  });
}
