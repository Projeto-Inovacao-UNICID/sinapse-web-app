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
  Button,
  Box,
  Divider,
  Dialog,
  DialogTitle,
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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useSession } from '@/hooks/session/useSession';
import {
  useFriendship,
  usePostFriendship,
  useGetFriendshipInvitations,
  useDeleteFriendshipRequest
} from '@/hooks/friendship/useFriendship';
import { useCheckFollowing, useFollowCompany, useUnfollowCompany } from '@/hooks/company/useFollowers';
import {
  useReactionsCount,
  useMyReaction,
  useReactPost,
  useRemoveReaction,
} from '@/hooks/posts/useReactions';
import { ReactionType } from '@/types';
import { usePostCommentsCount } from '@/hooks/posts/useComments';
import { useQueryClient } from '@tanstack/react-query';
import { CommentsTree } from '../../comment/comments-tree';

interface PostCardProps {
  post: {
    id: number;
    autorId: string;
    autorNome: string;
    autorAvatarUrl: string;
    localizacao: string;
    texto: string;
    createdAt: string;
    imagemUrl?: string;
    isCompany: boolean;
    comentarios?: number;
  };
}

export function PostCard({ post }: PostCardProps) {
  const qc = useQueryClient();
  const { session } = useSession();
  const myUserId = session?.id ?? '';
  const isOwnPost = myUserId === post.autorId;
  const isCompanyUser = session?.roles?.includes('ROLE_COMPANY') ?? false;

  const [openImage, setOpenImage] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [busy, setBusy] = useState(false);

  // --- Amizade ---
  const { data: friends = [] } = useFriendship();
  const isFriend = friends.some(f => f.usuarioId === post.autorId);
  const friendshipEntry = friends.find(f => f.usuarioId === post.autorId);
  const deleteFriend = useDeleteFriendshipRequest(friendshipEntry?.amizadeId);
  const { data: invitesResp } = useGetFriendshipInvitations('enviados');
  const hasPending = invitesResp?.content?.some(inv => inv.usuarioId === post.autorId) ?? false;
  const postFriend = usePostFriendship();

  // --- Seguimento de empresa ---
  const followCompany = useFollowCompany();
  const unfollowCompany = useUnfollowCompany();
  const {
    data: isFollowing = false,
    isLoading: checkingFollow
  } = useCheckFollowing(post.autorId, post.isCompany);

  // --- Reações e comentários ---
  const { data: counts, isLoading: countsLoading } = useReactionsCount(post.id);
  const { data: myReaction, isLoading: myLoading } = useMyReaction(post.id);
  const reactPost = useReactPost(post.id);
  const removeReact = useRemoveReaction(post.id);
  const liked = myReaction === 'CURTIR';
  const { data: commentsCount, isLoading: commentsLoading } = usePostCommentsCount(post.id);

  // ---- handlers ----
  const handleLike = async () => {
    if (busy) return;
    setBusy(true);
    try {
      if (liked) await removeReact.mutateAsync();
      else await reactPost.mutateAsync({ tipo: 'CURTIR' as ReactionType });
    } finally {
      setBusy(false);
    }
  };

  const handleSendFriend = () =>
    postFriend.mutate(post.autorId, {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ['friendship'] });
        qc.invalidateQueries({ queryKey: ['friendship-invitations', 'enviados'] });
        setShowModal(true);
      }
    });

  const handleRemoveFriend = () =>
    friendshipEntry?.amizadeId &&
    deleteFriend.mutate(undefined, {
      onSuccess: () => qc.invalidateQueries({ queryKey: ['friendship'] })
    });

  const handleFollow = () =>
    followCompany.mutate(post.autorId, {
      onSuccess: () => qc.invalidateQueries({ queryKey: ['is-following', post.autorId] })
    });

  const handleUnfollow = () =>
    unfollowCompany.mutate(post.autorId, {
      onSuccess: () => qc.invalidateQueries({ queryKey: ['is-following', post.autorId] })
    });

  return (
    <>
      <Card sx={{ bgcolor: 'var(--card)', borderRadius: 2, mb: 2, overflow: 'visible' }}>
        <CardHeader
          avatar={<Avatar src={post.autorAvatarUrl} alt={post.autorNome} />}
          title={
            <Typography variant="subtitle1" sx={{ color: 'var(--foreground)', fontWeight: 'bold' }}>
              {post.autorNome}
            </Typography>
          }
          subheader={
            <Typography variant="caption" sx={{ color: 'var(--muted)' }}>
              {post.localizacao} ·{' '}
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </Typography>
          }
          action={
            !isOwnPost &&
            !isCompanyUser && (
              post.isCompany ? (
                isFollowing ? (
                  <IconButton onClick={handleUnfollow} sx={{ color: 'var(--primary)' }}>
                    <RemoveCircleIcon />
                  </IconButton>
                ) : (
                  <Button
                    variant="outlined"
                    startIcon={<FollowTheSignsIcon sx={{ color: 'var(--primary)' }} />}
                    onClick={handleFollow}
                    disabled={checkingFollow}
                    sx={{
                      borderRadius: 99,
                      px: 2,
                      height: 32,
                      textTransform: 'none',
                      color: 'var(--primary)',
                      borderColor: 'var(--primary)',
                      '&:hover': { backgroundColor: 'rgba(var(--primary-rgb),0.1)' }
                    }}
                  >
                    Seguir
                  </Button>
                )
              ) : isFriend ? (
                <IconButton onClick={handleRemoveFriend} sx={{ color: 'var(--primary)' }}>
                  <PersonRemoveIcon />
                </IconButton>
              ) : hasPending ? (
                <Button
                  variant="outlined"
                  startIcon={<PersonAddDisabledIcon sx={{ color: 'var(--muted)' }} />}
                  disabled
                  sx={{
                    borderRadius: 99,
                    px: 2,
                    height: 32,
                    textTransform: 'none',
                    borderColor: 'var(--muted)',
                    color: 'var(--muted)'
                  }}
                >
                  Pendente
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<PersonAddIcon sx={{ color: 'var(--primary)' }} />}
                  onClick={handleSendFriend}
                  disabled={postFriend.status === 'pending'}
                  sx={{
                    borderRadius: 99,
                    px: 2,
                    height: 32,
                    textTransform: 'none',
                    color: 'var(--primary)',
                    borderColor: 'var(--primary)',
                    '&:hover': { backgroundColor: 'rgba(var(--primary-rgb),0.1)' }
                  }}
                >
                  Adicionar
                </Button>
              )
            )
          }
          sx={{ pb: 0 }}
        />

        <CardContent sx={{ pt: 1 }}>
          <Typography variant="body2" sx={{ color: 'var(--foreground)' }}>
            {post.texto}
          </Typography>
        </CardContent>

        {post.imagemUrl && (
          <Box
            onClick={() => setOpenImage(true)}
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
              sx={{ color: liked ? 'var(--primary)' : 'var(--muted)' }}
            >
              {busy || myLoading ? <CircularProgress size={20} /> : (liked ? <FavoriteIcon /> : <FavoriteBorderIcon />)}
            </IconButton>
            <Typography variant="caption" sx={{ color: 'var(--foreground)' }}>
              {countsLoading ? '…' : counts?.CURTIR ?? 0}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={() => setShowComments(prev => !prev)}>
              <ChatBubbleOutlineIcon sx={{ color: showComments ? 'var(--primary)' : 'var(--muted)' }} />
            </IconButton>
            <Typography variant="caption" sx={{ color: 'var(--foreground)' }}>
              {commentsLoading ? '…' : commentsCount ?? 0}
            </Typography>
          </Box>
        </CardActions>

        <Collapse in={showComments} timeout="auto" unmountOnExit>
          <Paper
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
          </Paper>
        </Collapse>
      </Card>

      {/* modal de imagem */}
      <Dialog open={openImage} onClose={() => setOpenImage(false)} maxWidth="md" fullWidth>
        <IconButton
          onClick={() => setOpenImage(false)}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'var(--foreground)',
            bgcolor: 'rgba(0,0,0,0.5)'
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 0, bgcolor: 'var(--card)', textAlign: 'center' }}>
          <Box
            component="img"
            src={post.imagemUrl}
            alt="Full-size"
            sx={{ width: '100%', maxHeight: '90vh', objectFit: 'contain' }}
          />
        </DialogContent>
      </Dialog>

      {/* modal de confirmação de amizade */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="xs">
        <DialogTitle />
        <Box sx={{ textAlign: 'center', p: 3 }}>
          <CheckCircleIcon fontSize="large" color="primary" />
          <Typography variant="h6" sx={{ mt: 1 }}>
            Pedido Enviado!
          </Typography>
          <Typography variant="body2" sx={{ color: 'var(--muted)', mb: 2 }}>
            Seu convite de amizade foi enviado com sucesso.
          </Typography>
          <Button
            variant="contained"
            onClick={() => setShowModal(false)}
            sx={{ textTransform: 'none' }}
          >
            Fechar
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
