// src/components/feed/index.tsx
'use client';

import React from 'react';
import { Box } from '@mui/material';
import { PostCreator } from './post-creator';
import { PostCard } from './post-card';
import { ChatSidebar } from './chat-sidebar';
import { useGetPosts } from '@/hooks/posts/useGetPosts';
import { useChatContacts } from '@/hooks/chat/useChatContacts';
import { SidebarMenu } from '../common/side-bar-menu';
import { AdsPanel } from '../common/ads-panel';

export function Feed() {
  const { data: posts = [] } = useGetPosts();
  const { data: contacts = [] } = useChatContacts();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gap: 2,
        minHeight: '100vh',
      }}
    >
      {/* Menu lateral */}
      <SidebarMenu />

      {/* Feed central */}
      <Box sx={{ p: 2 }}>
        <PostCreator />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
          {posts.map(post => (
            <PostCard
              key={post.id}
              post={{
                id: post.id,
                autorNome: post.autorNome,
                autorAvatarUrl: post.autorAvatarUrl,
                localizacao: '',
                texto: post.conteudo,
                createdAt: post.createdAt,
                imagemUrl: post.imagemUrl,
                comentarios: 0,
                isCompany: false,
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Anúncios + Chat */}
      <Box
        sx={{
          p: 2,
          width: 300,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AdsPanel />
        <ChatSidebar contacts={contacts} onSelect={() => {}} />
      </Box>
    </Box>
  );
}
