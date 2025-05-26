'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';

import AddIcon    from '@mui/icons-material/Add';
import CloseIcon  from '@mui/icons-material/Close';
import EditIcon   from '@mui/icons-material/Edit';
import MessageIcon from '@mui/icons-material/Message';
import ShareIcon  from '@mui/icons-material/Share';

import { CreateGroupModal }  from '@/components/group/create-group-card';
import { GroupList }         from '@/components/group/group-list';
import { InviteList }        from '@/components/invites';
import { useGetChallengeCountsUser } from '@/hooks/challenge/useChallenge';
import {
  useAcceptFriendshipRequest,
  useDeleteFriendshipRequest,
  useFriendship,
  useGetFriendshipInvitations,
  usePostFriendship,
} from '@/hooks/friendship/useFriendship';
import { useGetGroupInvites, useGetMyGroups } from '@/hooks/group/useGroup';
import { useGetPosts }      from '@/hooks/posts/usePosts';
import { useSession }       from '@/hooks/session/useSession';
import { useUserProfile, useUserProfileImage } from '@/hooks/profile/user/useUserProfile';
import { ChatService }      from '@/service/chat/ChatService';
import { Group }            from '@/types';

import { BoxInfo }          from '../../box-info';
import { ShareDialog }      from '../../utils/shareDialog';
import { EditProfileModal } from '../profile-edit-modal';
import { UsersList }        from '../users-list';

import ButtonPrimary   from '@/components/common/button-primary';
import ButtonSecondary from '@/components/common/button-secondary';
import { UserChallenges } from '@/components/challenge/common/challenge-profile';
import { UserPosts } from '../user-posts-profile';
import { ProfileImageUploader } from '../perfil-image-trade';

interface UserProfileCardProps {
  userId: string;
  gridColumnNumber?: number;
}

export function UserProfileCard({ userId, gridColumnNumber = 2 }: UserProfileCardProps) {
  const searchParams = useSearchParams();
  const tabFromURL   = (searchParams.get('tab') ?? '').toLowerCase();

  const tabIndexMap = {
    inicio:       0,
    sobre:        1,
    publicacoes:  2,
    desafios:     3,
    amigos:       4,
    grupos:       5,
    convites:     6,
  } as const;

  const initialTab = tabIndexMap[tabFromURL as keyof typeof tabIndexMap] ?? 0;
  const [tabValue, setTabValue] = useState(initialTab);

  const [shareOpen, setShareOpen]           = useState(false);
  const [openModal, setOpenModal]           = useState(false);
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const [isHovering, setIsHovering]         = useState(false);

  const { data: userProfile, isLoading, isError, error } = useUserProfile(userId);
  const { session }          = useSession();
  const router               = useRouter();
  const queryClient          = useQueryClient();

  const { data: friendship } = useFriendship();
  const { mutateAsync: sendFriendRequest, isPending: postingFriend } = usePostFriendship();
  const { data: invitations } = useGetFriendshipInvitations('enviados');
  const { data: requests }    = useGetFriendshipInvitations('recebidos');

  const { data: posts }      = useGetPosts();
  const { data: challenges } = useGetChallengeCountsUser(userId);

  const { data: groups, isLoading: loadingGroups } = useGetMyGroups();
  const { data: groupInvites } = useGetGroupInvites();

  const groupsIds = groups ? groups.content.map((g: Group) => g.id) : [];

  const temImagem                = userProfile?.temImagem ?? false;
  const { data: userProfileImage } = useUserProfileImage(userId, temImagem);
  const imagemSrc = temImagem ? userProfileImage ?? '' : '';

  const isProfileOwner = session?.id === userId;
  const isUser         = session ? session.roles.includes('ROLE_USER') : false;

  const isInvitationActive = !isProfileOwner && invitations?.content.some(i => i.usuarioId === userId);
  const isRequestActive    = !isProfileOwner && requests?.content.some(r => r.usuarioId === userId);

  const amizadeId = requests?.content.find(r => r.usuarioId === userId)?.amizadeId;
  const { mutateAsync: deleteFriendship } = useDeleteFriendshipRequest(amizadeId);
  const { mutateAsync: acceptFriendship } = useAcceptFriendshipRequest(amizadeId);

  const reqCount   = requests?.content.length   ?? 0;
  const inviteCount= groupInvites?.length       ?? 0;
  const invitesSum = reqCount + inviteCount;
  const hasUnread  = invitesSum > 0;

  const chatService = new ChatService();

  const handleMessage = () => {
    try {
      chatService.postChat(userId);
      router.push(`/conversas?participanteId=${userId}`);
    } catch (err) {
      console.error('Erro ao iniciar chat', err);
    }
  };

  const handleAddFriend = async () => {
    try {
      const res = await sendFriendRequest(userId);
      alert(`Convite enviado para ${res.solicitante}!`);
      await queryClient.invalidateQueries({ queryKey: ['friendship-invitations'] });
    } catch (err) {
      console.error('Erro ao adicionar amizade', err);
    }
  };

  const handleAcceptRequest = async () => {
    if (!amizadeId) return;
    await acceptFriendship();
    await queryClient.invalidateQueries({ queryKey: ['friendship-invitations', 'recebidos'] });
  };

  const handleDeleteRequest = async () => {
    if (!amizadeId) return;
    await deleteFriendship();
    await queryClient.invalidateQueries({ queryKey: ['friendship-invitations', 'recebidos'] });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress sx={{ color: 'var(--muted)' }} />
      </Box>
    );
  }

  if (isError || !userProfile) {
    console.error(error);
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography color="error">Erro ao carregar perfil</Typography>
      </Box>
    );
  }

  const { nome, username, amigos, podeAdicionarAmigo } = userProfile;
  const friends        = isProfileOwner ? friendship : amigos;
  const friendshipIds  = friends?.map(f => ('usuarioId' in f ? f.usuarioId : f.id));

  return (
    <Box sx={{ backgroundColor: 'var(--card)', borderRadius: 2, p: 4, gridColumn: `${gridColumnNumber}` }}>
      <Grid container spacing={2}>
        {/* avatar + nome */}
        <Grid size={8}>
          <Box sx={{ display: "flex", alignItems: "flex-start", flexDirection: "column", gap: 2 }}>


            <ProfileImageUploader
              userId={userId}
              imagemSrc={imagemSrc}
              isProfileOwner={isProfileOwner}
            />


            <Box sx={{ ml: 2 }}>
              <Typography variant="h5" color="var(--foreground)" fontWeight="bold">
                {nome}
              </Typography>
              <Typography variant="body1" color="var(--muted)">
                {username}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* contadores */}
        <Grid size={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
            <BoxInfo data={friends ? friends.length : 0} title="Amigos" />
            <BoxInfo data={posts ? posts.length : 0}   title="Postagens" />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
            <BoxInfo data={challenges ? challenges.participados : 0} title="Desafios" />
          </Box>
        </Grid>

        {/* botões */}
        <Grid size={12} sx={{ display: 'flex', gap: 2 }}>
          {!isProfileOwner && isUser && (
            <Button
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              startIcon={
                isRequestActive && isHovering ? (
                  <CloseIcon onClick={(e) => { e.stopPropagation(); handleDeleteRequest(); }} />
                ) : (
                  <AddIcon />
                )
              }
              onClick={
                podeAdicionarAmigo && !isInvitationActive
                  ? handleAddFriend
                  : isRequestActive
                  ? handleAcceptRequest
                  : undefined
              }
              variant="contained"
              disabled={postingFriend}
              sx={{
                backgroundColor:
                  isRequestActive && isHovering
                    ? 'var(--primary)'
                    : podeAdicionarAmigo && !isInvitationActive
                    ? 'var(--primary)'
                    : 'var(--muted)',
                ':hover': { opacity: 0.9 },
                color: 'white',
                textTransform: 'none',
              }}
            >
              {postingFriend ? (
                <CircularProgress size={20} sx={{ color: 'white' }} />
              ) : isRequestActive && isHovering ? (
                'Adicionar amigo'
              ) : isInvitationActive ? (
                'Convite enviado'
              ) : isRequestActive ? (
                'Convite recebido'
              ) : podeAdicionarAmigo ? (
                'Adicionar amigo'
              ) : (
                'Amigo já adicionado'
              )}
            </Button>
          )}

          {!isProfileOwner && (
            <ButtonPrimary title="Mensagem" icon={<MessageIcon />} onClick={handleMessage} />
          )}

          <ButtonSecondary
            title="Compartilhar"
            icon={<ShareIcon />}
            onClick={() => setShareOpen(true)}
          />

          {isUser && isProfileOwner && (
            <>
              <ButtonSecondary title="Editar Perfil" icon={<EditIcon />} onClick={() => setOpenModal(true)} />
              <ButtonSecondary title="Criar Grupo"  icon={<AddIcon />}  onClick={() => setOpenCreateGroup(true)} />
            </>
          )}
        </Grid>

        {/* abas */}
        <Divider sx={{ my: 0.3, borderBottom: '1px solid var(--secondary)', width: '100%' }} />

        <Tabs
          value={tabValue}
          onChange={(_, v) => setTabValue(v)}
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: 'var(--primary)' } }}
          sx={{
            '& .MuiTab-root': { color: 'var(--muted)', textTransform: 'none' },
            '& .Mui-selected': { color: 'var(--primary)' },
          }}
        >
          <Tab label="Início"       />
          <Tab label="Sobre"        />
          <Tab label="Publicações"  />
          <Tab label="Desafios"     />
          <Tab label="Amigos"       />
          <Tab label="Grupos"       />
          {isProfileOwner && (
            <Tab
              icon={
                <Badge
                  badgeContent={invitesSum}
                  color="error"
                  invisible={!hasUnread}
                  sx={{
                    '& .MuiBadge-badge': {
                      top: -10,
                      right: -4,
                      fontSize: '0.7rem',
                      minWidth: 16,
                      height: 16,
                    },
                  }}
                />
              }
              iconPosition="end"
              label="Convites"
            />
          )}
        </Tabs>

        {/* conteúdo das abas dinâmicas */}
        <Grid size={12}>
          {tabValue === 2 && <UserPosts />}
          {tabValue === 3 && <UserChallenges userId={userId} />}
          {tabValue === 4 && (
            <UsersList ids={friendshipIds ?? []} type={isProfileOwner ? 'friend' : undefined} />
          )}
          {tabValue === 5 && <GroupList groupIds={groupsIds ?? []} viewDescription />}
          {tabValue === 6 && <InviteList groupInvites={groupInvites ?? []} friendshipInvitations={requests?.content ?? []} />}
        </Grid>
      </Grid>

      {/* modais & dialogs */}
      <EditProfileModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        userId={userId}
        defaultValues={{ nome: userProfile.nome, username: userProfile.username, email: '' }}
      />

      <CreateGroupModal open={openCreateGroup} onClose={() => setOpenCreateGroup(false)} />

      <ShareDialog open={shareOpen} onClose={() => setShareOpen(false)} url={typeof window !== 'undefined' ? window.location.href : ''} />
    </Box>
  );
}
