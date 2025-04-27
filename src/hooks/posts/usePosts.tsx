import { useQuery } from '@tanstack/react-query';
import { PostService } from '@/service/posts/PostService';

const postService = new PostService();

// Hook customizado para obter as postagens
export function useGetPosts() {
    return useQuery({
      queryKey: ["posts"], // Chave da consulta
      queryFn: postService.getPosts, // Função que busca as postagens
      staleTime: 1000 * 60 * 5, // Cache por 5 minutos
      refetchOnWindowFocus: false, // Não refazer a consulta ao voltar à janela
    });
  }