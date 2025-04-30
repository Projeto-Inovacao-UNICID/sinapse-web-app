// src/components/posts/CommentForm.tsx
'use client';

import React, { useState } from 'react';
import { Paper, Avatar, TextField, IconButton, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useCreateComment, CreateCommentDto } from '@/hooks/posts/useComments';

interface CommentFormProps {
  postagemId: string;
  comentarioPaiId?: number;
  onSubmitted?: () => void;
}

export function CommentForm({ postagemId, comentarioPaiId, onSubmitted }: CommentFormProps) {
  const theme = useTheme();
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = useCreateComment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    try {
      const payload: CreateCommentDto = {
        conteudo: text,
        postagemId: Number(postagemId),
        comentarioPaiId
      };
      await mutateAsync(payload);
      setText('');
      onSubmitted?.();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={0}
      sx={{
        display: 'flex', alignItems: 'center', gap: 1, p: 1,
        bgcolor: 'var(--bgSecondary)', borderRadius: 2,
        ml: comentarioPaiId ? 6 : 0, mt: 2
      }}
    >
      <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>U</Avatar>
      <TextField
        placeholder={comentarioPaiId ? 'Escreva sua resposta…' : 'Escreva um comentário…'}
        variant="outlined"
        size="small"
        fullWidth
        value={text}
        onChange={e => setText(e.target.value)}
        disabled={submitting}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '999px',
            bgcolor: 'var(--cardSecondary)'
          }
        }}
      />
      <IconButton
        type="submit"
        disabled={submitting || !text.trim()}
        sx={{
          color: 'var(--card-foreground)',
          bgcolor: 'var(--bgSecondary)',
          '&:hover': { bgcolor: 'var(--background)', color: 'var(--card-foreground)' }
        }}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
