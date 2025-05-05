// src/components/posts/CommentForm.tsx
'use client';

import React, { useState } from 'react';
import { Paper, Avatar, TextField, IconButton, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useCreateComment } from '@/hooks/posts/useComments';
import { CommentCreateDto } from '@/types';

interface CommentFormProps {
  postagemId: number;
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
      const payload: CommentCreateDto = {
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
        bgcolor: 'var(--bgSecondary)',
        borderRadius: 2,
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
            bgcolor: 'var(--card)',
            color: 'var(--foreground)',
            '& fieldset': { borderColor: 'transparent' },
            '&:hover fieldset': { borderColor: 'var(--primary)' },
            '&.Mui-focused fieldset': { borderColor: 'var(--primary)' },
          }
        }}
      />
      <IconButton
        type="submit"
        disabled={submitting || !text.trim()}
        sx={{
          color: 'var(--foreground)',
          bgcolor: 'var(--primary)',
          '&:hover': { bgcolor: 'var(--primary)', color: '#fff' }
        }}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
