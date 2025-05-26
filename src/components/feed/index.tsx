// src/components/feed/index.tsx
'use client';

import React from 'react';
import { Box } from '@mui/material';
import { PostCreator } from './post/post-creator';
import { PostCard }    from './post/post-card';
import { useGetPosts } from '@/hooks/posts/useGetPosts';
import { Post } from '@/types';
import { useChatContacts }   from '@/hooks/chat/useChatContacts';
import { SidebarMenu } from '../common/side-bar-menu';
import { AdsPanel }     from '../common/ads-panel';
import { ChatSidebar }  from '../common/chat-sidebar';

export function Feed() {
  const { data: posts = [] }    = useGetPosts();
  const { data: contacts = [] } = useChatContacts();

  return (
    <div
      style={{  
        display: 'grid',
        gridTemplateColumns: '1fr minmax(0, 10fr) 1fr',
        minHeight: '100vh',
      }}
    >
      <div style={{ gridColumn: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '260px minmax(0, 1fr) 300px',
          alignItems: 'start',
          gap: 2,
          minHeight: '100vh',
          p: 2,
        }}
      >
        {/* menu lateral */}
        <SidebarMenu />

        {/* coluna do meio: criador + lista de posts */}
        <Box>
          <PostCreator />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
            {posts
              .slice() // cria uma cópia para evitar mutar o array original
              .reverse() // inverte a ordem
              .map((p: Post) => (
                <PostCard
                  key={p.id}
                  post={{
                    id:             p.id,
                    autorId:        p.autorId,
                    autorNome:      p.autorNome,
                    autorAvatarUrl: p.autorAvatarUrl,
                    localizacao:    '',
                    texto:          p.conteudo,
                    createdAt:      p.createdAt,
                    imagemUrl:      p.imagemUrl,
                    isCompany:      p.isCompany,
                    comentarios:    0,
                  }}
                />
              ))}
          </Box>

        </Box>

        {/* anúncios + chat */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <AdsPanel />
          <ChatSidebar contacts={contacts} onSelect={() => {}} />
        </Box>
      </Box>
    </div>
  </div>
  );
}
