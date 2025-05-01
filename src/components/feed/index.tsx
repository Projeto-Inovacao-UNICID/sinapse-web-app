// src/components/feed/index.tsx
'use client';

import React from 'react';
import { Box, Grid } from '@mui/material';
import { PostCreator } from './post-creator';
import { PostCard }    from './post-card';
import { ChatSidebar } from './chat-sidebar';
import { useGetPosts } from '@/hooks/posts/useGetPosts';
import { useChatContacts } from '@/hooks/chat/useChatContacts';

export function Feed() {
  const { data: posts = [] }     = useGetPosts();
  const { data: contacts = [] }  = useChatContacts();

  return (
    <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr minmax(0, 10fr) 1fr',
          minHeight: '100vh',
        }}
      >
      <Grid container spacing={2} sx={{ p: 2, gridColumn: '2' }}>
        {/* Anúncios */}
        <Grid size={2}>
          <Box
            sx={{
              bgcolor: 'var(--card)',
              height: '100%',
              minHeight: '80vh',
              borderRadius: 2
            }}
          />
        </Grid>

        {/* Feed principal */}
        <Grid size={7}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <PostCreator />
            {posts.map(post => (
              <PostCard
                key={post.id}
                post={{
                  id:             post.id,
                  autorNome:      post.autorNome,
                  autorAvatarUrl: post.autorAvatarUrl,
                  localizacao:    '',
                  texto:          post.conteudo,
                  createdAt:      post.createdAt,
                  imagemUrl:      post.imagemUrl,
                  comentarios:    0,
                  isCompany:      false
                }}
              />
            ))}
          </Box>
        </Grid>
        {/* Chat lateral */}
        <Grid size={3} sx={{ display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'flex-end' }}>
            <ChatSidebar contacts={contacts} onSelect={() => {}} />
        </Grid>
      </Grid>
    </div>
  );
}
