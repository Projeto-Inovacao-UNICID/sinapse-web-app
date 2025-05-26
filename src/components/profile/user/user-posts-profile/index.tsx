'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { PostCard } from '@/components/feed/post/post-card';
import { useGetUserPosts } from '@/hooks/posts/useGetUserPosts';
import { useParams } from 'next/navigation';
import { Post } from '@/types';

export function UserPosts() {
  const params = useParams();
  const perfilId = params.id as string;

  const { data: posts = [], isLoading, error } = useGetUserPosts(perfilId);

  if (isLoading) return <Typography>Carregando...</Typography>;
  if (error) return <Typography>Erro ao carregar posts: {(error as Error).message}</Typography>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {posts.length === 0 ? (
        <Typography variant="body2" sx={{ color: 'var(--muted)' }}>
          Nenhuma publicação encontrada.
        </Typography>
      ) : (
        posts
          .slice()
          .reverse()
          .map((p: Post) => (
            <PostCard
              key={p.id}
              post={{
                id: p.id,
                autorId: p.autorId,
                autorNome: p.autorNome,
                autorAvatarUrl: p.autorAvatarUrl,
                localizacao: '',
                texto: p.conteudo,
                createdAt: p.createdAt,
                imagemUrl: p.imagemUrl,
                isCompany: p.isCompany,
                comentarios: 0,
              }}
            />
          ))
      )}
    </Box>
  );
}
