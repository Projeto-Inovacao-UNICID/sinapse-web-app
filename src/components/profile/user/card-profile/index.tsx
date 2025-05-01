'use client';

import { CreateGroupModal } from "@/components/group/create-group-card";
import { useGetChallengeCountsUser } from "@/hooks/challenge/useChallenge";
import { useAcceptFriendshipRequest, useDeleteFriendshipRequest, useFriendship, useGetFriendshipInvitations, usePostFriendship } from "@/hooks/friendship/useFriendship";
import { useGetPosts } from "@/hooks/posts/usePosts";
import { useSession } from "@/hooks/session/useSession";
import { useUserProfile, useUserProfileImage } from "@/hooks/user/useUserProfile";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import MessageIcon from '@mui/icons-material/Message';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, Button, CircularProgress, Divider, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { BoxInfo } from "../../box-info";
import { ShareDialog } from "../../utils/shareDialog";
import { EditProfileModal } from "../profile-edit-modal";
import { ChatService } from "@/service/chat/ChatService";

interface UserProfileCardProps {
  userId: string;
  gridColumnNumber?: number;
}

export function UserProfileCard({ userId, gridColumnNumber = 2 }: UserProfileCardProps) {
  const [tabValue, setTabValue] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalCreateGroup, setOpenModalCreateGroup] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const { data: userProfile, isLoading, isError, error } = useUserProfile(userId);
  const { session } = useSession();
  const router = useRouter();
  const { data: friendship } = useFriendship();
  const { mutateAsync: sendFriendRequest, isPending: isPostFriendshipLoading } = usePostFriendship();
  const { data: friendshipInvitations } = useGetFriendshipInvitations("enviados");
  const { data: friendshipRequests } = useGetFriendshipInvitations("recebidos");
  const { data: posts } = useGetPosts();
  const { data: challenge } = useGetChallengeCountsUser(userId);

  const chatService = new ChatService();

  const amizadeId = friendshipRequests?.content.find(r => r.usuarioId === userId)?.amizadeId;

  const { mutateAsync: deleteFriendship } = useDeleteFriendshipRequest(amizadeId);
  const { mutateAsync: acceptFriendship } = useAcceptFriendshipRequest(amizadeId);


  const temImagem = userProfile?.temImagem ?? false;
  const { data: userProfileImage } = useUserProfileImage(userId, temImagem);

  const queryClient = useQueryClient();
  const isProfileOwner = session?.id === userId;
  const isUser = session ? session.roles.includes('ROLE_USER') : false;

  const isActiveFriendshipInvitation = !isProfileOwner && friendshipInvitations?.content.some(
    (invitation) => invitation.usuarioId === userId
  );

  const isActiveFriendshipRequest = !isProfileOwner && friendshipRequests?.content.some(
    (request) => request.usuarioId === userId
  );

  const handleMessage = () => {
    try {
      chatService.postChat(userId);
      router.push(`/conversas?participanteId=${userId}`);
    } catch (err) {
      console.error('Erro ao iniciar o chat:', err);
    }
  }
  const handleEdit = () => setOpenModal(true);

  const {
    nome,
    username,
    amigos,
    podeAdicionarAmigo,
  } = userProfile ?? {};

  const imagemSrc = temImagem ? userProfileImage ?? "" : "";

  const handleAddFriendship = async () => {
    try {
      const res = await sendFriendRequest(userId);
      console.log('Pedido de amizade enviado com sucesso:', res);
      await queryClient.invalidateQueries({ queryKey: ['friendship-invitations'] });
    } catch (err) {
      console.error('Erro ao adicionar amizade:', err);
    }
  };

  const handleAcceptFriendshipRequest = async () => {
    if (!amizadeId) return;
    const res = await acceptFriendship();
    console.log('Convite de amizade aceito com sucesso:', res);
    await queryClient.invalidateQueries({ queryKey: ['friendship-invitations', 'recebidos'] });
  }
  
  const handleDeleteFriendshipRequest = async () => {
    if (!amizadeId) return;
    const res = await deleteFriendship();
    console.log('Convite de amizade recusado com sucesso:', res);
    await queryClient.invalidateQueries({ queryKey: ['friendship-invitations', 'recebidos'] });
  }
  

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <CircularProgress sx={{ color: "var(--muted)" }} />
      </Box>
    );
  }

  if (isError) {
    console.log(error);
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <Typography color="error">Erro ao carregar perfil</Typography>
      </Box>
    );
  }

  return (
    <Box className="flex flex-col gap-2 p-4" sx={{ backgroundColor: "var(--card)", borderRadius: 2, padding: 4, gridColumn: `${gridColumnNumber}` }}>
      <Grid container spacing={2}>
        <Grid size={8}>
          <Box sx={{ display: "flex", alignItems: "flex-start", flexDirection: "column", gap: 2 }}>
            <Avatar src={imagemSrc} alt={nome} sx={{ width: 100, height: 100 }} />
            <Box sx={{ ml: 2 }}>
              <Typography variant="h5" color="var(--foreground)" className="font-bold">{nome}</Typography>
              <Typography variant="body1" color="var(--muted)">{username}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid size={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, width: "100%" }}>
            <BoxInfo data={amigos ? amigos.length : 0} title="Amigos" />
            <BoxInfo data={posts ? posts.length : 0} title="Postagens" />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
            <BoxInfo data={challenge ? challenge.participados : 0} title="Desafios" />
          </Box>
        </Grid>

        <Grid size={12} sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          {!isProfileOwner && isUser && (
            <Button
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              startIcon={
                isActiveFriendshipRequest && isHovering ? (
                  <CloseIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFriendshipRequest();
                    }}
                  />
                ) : (
                  <AddIcon />
                )
              }
              onClick={
                podeAdicionarAmigo && !isActiveFriendshipInvitation
                  ? handleAddFriendship
                  : isActiveFriendshipRequest
                  ? handleAcceptFriendshipRequest
                  : undefined
              }
              variant="contained"
              sx={{
                backgroundColor:
                  isActiveFriendshipRequest && isHovering
                    ? 'var(--primary)'
                    : podeAdicionarAmigo && !isActiveFriendshipInvitation
                    ? 'var(--primary)'
                    : 'var(--muted)',
                ':hover': {
                  opacity: 0.9,
                },
                color: 'white',
                textTransform: 'none',
              }}
              disabled={isPostFriendshipLoading}
            >
              {isPostFriendshipLoading ? (
                <CircularProgress size={20} sx={{ color: 'white' }} />
              ) : isActiveFriendshipRequest && isHovering ? (
                'Adicionar amigo'
              ) : isActiveFriendshipInvitation ? (
                'Convite enviado'
              ) : isActiveFriendshipRequest ? (
                'Convite recebido'
              ) : podeAdicionarAmigo ? (
                'Adicionar amigo'
              ) : (
                'Amigo já adicionado'
              )}
            </Button>
          )}

          <Button
            startIcon={<MessageIcon />}
            variant="contained"
            onClick={handleMessage}
            sx={{ color: 'white', textTransform: 'none', backgroundColor: 'var(--primary)', ':hover': { opacity: 0.8 } }}
          >
            Mensagem
          </Button>

          <Button
            startIcon={<ShareIcon />}
            variant="outlined"
            onClick={() => setShareOpen(true)}
            sx={{
              borderColor: 'var(--muted)',
              color: 'var(--foreground)',
              textTransform: 'none',
              ':hover': { opacity: 0.8 }
            }}
          >
            Compartilhar
          </Button>

          {isUser && isProfileOwner && (
            <>
              <Button
                startIcon={<EditIcon />}
                variant="outlined"
                onClick={handleEdit}
                sx={{ borderColor: 'var(--muted)', color: 'var(--foreground)', textTransform: 'none' }}
              >
                Editar Perfil
              </Button>

              <Button
                startIcon={<AddIcon />}
                variant="outlined"
                onClick={() => setOpenModalCreateGroup(true)}
                sx={{ borderColor: 'var(--muted)', color: 'var(--foreground)', textTransform: 'none' }}
              >
                Criar Grupo
              </Button>
            </>
          )}
        </Grid>

        <Divider sx={{ my: 0.3, borderBottom: '1px solid var(--secondary)', width: '100%' }} />

        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} textColor="inherit" TabIndicatorProps={{ style: { backgroundColor: 'var(--primary)' } }} sx={{ '& .MuiTab-root': { color: 'var(--muted)', textTransform: 'none' }, '& .Mui-selected': { color: 'var(--primary)' } }}>
          <Tab label="Início" />
          <Tab label="Sobre" />
          <Tab label="Publicações" />
          <Tab label="Desafios" />
        </Tabs>

        <Grid size={12}></Grid>
      </Grid>

      <EditProfileModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        userId={userId}
        defaultValues={{ nome: userProfile?.nome || '', username: userProfile?.username || '', email: '' }}
      />

      <CreateGroupModal
        open={openModalCreateGroup}
        onClose={() => setOpenModalCreateGroup(false)}
      />

      <ShareDialog open={shareOpen} onClose={() => setShareOpen(false)} url={typeof window !== 'undefined' ? window.location.href : ''} />
    </Box>
  );
}
