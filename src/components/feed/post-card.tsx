// src/components/feed/post-card.tsx
'use client';

import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Box,
  Divider,
  Dialog,
  DialogContent,
  CircularProgress,
  Collapse,
  Paper
} from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import {
  useReactionsCount,
  useMyReaction,
  useReactPost,
  useRemoveReaction,
  ReactionType
} from '@/hooks/posts/useReactions';
import { usePostCommentsCount } from '@/hooks/posts/useComments';
import { CommentsTree } from './comments-tree';

interface PostCardProps {
  post: {
    id: string;
    autorNome: string;
    autorAvatarUrl: string;
    localizacao: string;
    texto: string;
    createdAt: string;
    imagemUrl?: string;
    isCompany: boolean;
    comentarios: number;
  };
}

export function PostCard({ post }: PostCardProps) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  const { data: counts, isLoading: countsLoading } = useReactionsCount(post.id);
  const { data: myReaction, isLoading: myLoading } = useMyReaction(post.id);
  const { mutateAsync: reactAsync } = useReactPost(post.id);
  const { mutateAsync: removeAsync } = useRemoveReaction(post.id);
  const liked = myReaction === 'CURTIR';

  const { data: commentsCount, isLoading: commentsLoading } = usePostCommentsCount(post.id);

  const handleLike = async () => {
    if (busy) return;
    setBusy(true);
    try {
      if (liked) await removeAsync();
      else await reactAsync({ tipo: 'CURTIR' as ReactionType });
    } finally {
      setBusy(false);
    }
  };

  const toggleComments = () => {
    setShowComments(prev => !prev);
  };

  return (
    <>
      <Card sx={{ bgcolor: 'var(--card)', borderRadius: 2, mb: 2, overflow: 'visible' }}>
        <CardHeader
          avatar={<Avatar src={post.autorAvatarUrl} alt={post.autorNome} />}
          title={
            <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 'bold' }}>
              {post.autorNome}
            </Typography>
          }
          subheader={
            <Typography variant="caption" sx={{ color: 'var(--muted)' }}>
              {post.localizacao} · {timeAgo}
            </Typography>
          }
          action={
            post.isCompany && (
              <Typography sx={{ color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer' }}>
                + Seguir
              </Typography>
            )
          }
          sx={{ pb: 0 }}
        />

        <CardContent sx={{ pt: 1 }}>
          <Typography variant="body2" sx={{ color: 'white' }}>
            {post.texto}
          </Typography>
        </CardContent>

        {post.imagemUrl && (
          <Box
            onClick={() => setOpen(true)}
            sx={{
              width: '100%',
              height: 200,
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              bgcolor: 'var(--background)'
            }}
          >
            <Box
              component="img"
              src={post.imagemUrl}
              alt="Post"
              sx={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </Box>
        )}

        <Divider sx={{ bgcolor: 'var(--muted)' }} />

        <CardActions disableSpacing sx={{ px: 1, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={handleLike}
              disabled={busy || myLoading}
              sx={{ color: liked ? 'var(--primary)' : 'white' }}
            >
              {busy || myLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : liked ? (
                <FavoriteIcon />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <Typography variant="caption" sx={{ color: 'white' }}>
              {countsLoading ? '…' : counts?.CURTIR ?? 0}
            </Typography>

            <IconButton onClick={toggleComments}>
              <ChatBubbleOutlineIcon sx={{ color: showComments ? 'var(--primary)' : 'white' }} />
            </IconButton>
            <Typography variant="caption" sx={{ color: 'white' }}>
              {commentsLoading ? '…' : commentsCount ?? 0}
            </Typography>
          </Box>
        </CardActions>

        <Collapse in={showComments} timeout="auto" unmountOnExit>
          <Box
            component={Paper}
            elevation={2}
            sx={{
              bgcolor: 'var(--background)',
              mx: 2,
              mb: 2,
              p: 2,
              borderRadius: 2,
              maxHeight: 400,
              overflowY: 'auto'
            }}
          >
            <CommentsTree postagemId={post.id} />
          </Box>
        </Collapse>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <IconButton
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'white',
            bgcolor: 'rgba(0,0,0,0.5)'
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 0, bgcolor: 'black', textAlign: 'center' }}>
          <Box
            component="img"
            src={post.imagemUrl}
            alt="Full-size"
            sx={{ width: '100%', maxHeight: '90vh', objectFit: 'contain' }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
