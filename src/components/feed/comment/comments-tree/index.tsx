// src/components/posts/CommentsTree.tsx
'use client';

import React from 'react';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { useCommentsTree } from '@/hooks/posts/useComments';
import { CommentForm } from '../comment-form';
import { CommentItem } from '../comment-item';


interface CommentsTreeProps {
  postagemId: string;
}

export function CommentsTree({ postagemId }: CommentsTreeProps) {
  const { data, isLoading, isFetching, refetch } = useCommentsTree(postagemId);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const comments = data?.content ?? [];

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, color: 'var(--foreground)' }}>
        Comentários
      </Typography>

      {/* Form de comentário raiz */}
      <CommentForm
        postagemId={postagemId}
        onSubmitted={() => refetch()}
      />

      {comments.length === 0 && (
        <Typography variant="body2" color="var(--foreground)" sx={{ mb: 2 }}>
          Seja o primeiro a comentar!
        </Typography>
      )}

      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          postagemId={postagemId}
          depth={0}
          onReply={() => refetch()}
        />
      ))}

      {isFetching && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <CircularProgress size={20} />
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button onClick={() => refetch()} disabled={isFetching} sx={{ color: 'var(--primary)' }}>
          Atualizar
        </Button>
      </Box>
    </Box>
  );
}
