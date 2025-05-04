'use client';

import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Collapse,
  Divider,
  useTheme
} from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import { Comentario } from '@/hooks/posts/useComments';
import { CommentForm } from '../comment-form';

interface CommentItemProps {
  comment: Comentario;
  postagemId: string;
  depth?: number;
  onReply: () => void;
}

export function CommentItem({
  comment,
  postagemId,
  depth = 0,
  onReply
}: CommentItemProps) {
  const theme = useTheme();
  const [replying, setReplying] = useState(false);

  return (
    <Box sx={{ ml: depth * 4, mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, color: 'var(--foreground)' }}>
        <Avatar
          src={comment.autorAvatarUrl}
          alt={comment.autorNome}
          sx={{ width: 32, height: 32, fontSize: 14 }}
        >
          {comment.autorNome[0]}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography variant="subtitle2">{comment.autorNome}</Typography>
            <Typography variant="caption" sx={{ color: 'var(--muted)' }}>
              {new Date(comment.createdAt).toLocaleString()}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mt: 0.5, color: 'var(--foreground)' }}>
            {comment.conteudo}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
            <IconButton
              size="small"
              onClick={() => setReplying(prev => !prev)}
              sx={{ p: 0.5 }}
            >
              <ReplyIcon fontSize="small" sx={{ color: 'var(--foreground)' }} />
            </IconButton>
            <Typography
              variant="caption"
              sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
              onClick={() => setReplying(prev => !prev)}
            >
              Responder
            </Typography>
          </Box>
          <Collapse in={replying}>
            <CommentForm
              postagemId={postagemId}
              comentarioPaiId={comment.id}
              onSubmitted={() => {
                setReplying(false);
                onReply();
              }}
            />
          </Collapse>
        </Box>
      </Box>
      {comment.respostas.length > 0 && (
        <Box>
          {comment.respostas.map(child => (
            <CommentItem
              key={child.id}
              comment={child}
              postagemId={postagemId}
              depth={depth + 1}
              onReply={onReply}
            />
          ))}
        </Box>
      )}
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
}