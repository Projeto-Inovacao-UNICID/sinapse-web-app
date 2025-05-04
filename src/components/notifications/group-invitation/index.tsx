import { usePostAcceptGroupInvite, usePostRejectGroupInvite } from '@/hooks/group/useGroup';
import { useUserProfile } from '@/hooks/user/useUserProfile';
import { GroupInvite } from '@/types';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Box, Button, ListItemButton } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

interface GroupInvitationNotificationProps {
  groupInvite: GroupInvite;
}

export function GroupInvitationNotification({ groupInvite }: GroupInvitationNotificationProps) {
  const { conviteId, grupoId, quemConvidou} = groupInvite; 
  const { data: invitedBy } = useUserProfile(quemConvidou);
  const { mutateAsync: acceptInvite } = usePostAcceptGroupInvite();
  const { mutateAsync: rejectInvite } = usePostRejectGroupInvite();
  const queryClient = useQueryClient();

  const handleAccept = async () => {
    try {
      await acceptInvite({ id: grupoId, inviteId: conviteId });
      await queryClient.invalidateQueries({ queryKey: ['group-invitations'] });
    } catch (error) {
      console.error('Erro ao aceitar convite de grupo:', error);
    }
  };

  const handleDecline = async () => {
    try {
      await rejectInvite({ id: grupoId, inviteId: conviteId });
      await queryClient.invalidateQueries({ queryKey: ['group-invitations'] });
    } catch (error) {
      console.error('Erro ao recusar convite de grupo:', error);
    }
  };

  return (
    <ListItemButton
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 1,
        backgroundColor: 'var(--cardSecondary)',
        gap: 2,
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <GroupAddIcon sx={{ color: 'var(--primary)', fontSize: '1.5rem' }} />
        <span style={{ color: 'var(--foreground)', fontSize: '0.8rem' }}>
          Convite para grupo recebido de {invitedBy?.nome ?? 'Usuário'}
        </span>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button
          sx={{
            bgcolor: 'var(--primary)',
            color: 'var(--primary-foreground)',
            ':hover': { opacity: 0.8 },
          }}
          onClick={handleAccept}
        >
          <DoneIcon />
        </Button>
        <Button
          sx={{
            bgcolor: 'var(--bgSecondary)',
            color: 'var(--foreground)',
            ':hover': { opacity: 0.8 },
          }}
          onClick={handleDecline}
        >
          <CloseIcon />
        </Button>
      </Box>
    </ListItemButton>
  );
}
