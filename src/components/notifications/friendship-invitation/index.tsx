import { FriendshipService } from '@/service/friendship/FriendshipService';
import { FriendshipContent } from '@/types';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, Button, ListItemButton } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

interface FriendshipInvitationNotificationProps {
  friendshipContent: FriendshipContent;
}

export function FriendshipInvitationNotification({ friendshipContent }: FriendshipInvitationNotificationProps) {
  const username = friendshipContent.username;
  const amizadeId = friendshipContent.amizadeId;
  const service = new FriendshipService();
  const queryClient = useQueryClient();

  const handleAccept = async () => {
    try {
      const res = await service.patchFriendship({amizadeId, status: 'aceito'});
      alert(`Convite de amizade de ${res.solicitante} aceito com sucesso!`);

      // Invalida as notificaçõess
      await queryClient.invalidateQueries({ queryKey: ['friendship-invitations', 'recebidos'] });

    } catch (error) {
      console.error('Erro ao aceitar convite de amizade:', error);
    }
  };

  const handleDecline = async () => {
    try {
      const res = await service.patchFriendship({amizadeId, status: 'rejeitado'});
      alert(`Convite de amizade de ${res.solicitante} rejeitado com sucesso!`);

      // Invalida as notificações
      await queryClient.invalidateQueries({ queryKey: ['friendship-invitations', 'recebidos'] });
    } catch (error) {
      console.error('Erro ao recusar convite de amizade:', error);
    }
  };

  return (
    <ListItemButton sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', padding: 1, backgroundColor: 'var(--cardSecondary)', gap: 2, width: '100%' }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <PersonAddIcon sx={{ color: 'var(--primary)', fontSize: '1.5rem' }} />
        <span style={{ color: 'var(--foreground)', fontSize: '0.8rem' }}>Convite de amizade recebido de {username}</span>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button sx={{ bgcolor: 'var(--primary)', color: 'var(--primary-foreground)', ":hover": { opacity: 0.8 } }} onClick={handleAccept}><DoneIcon /></Button>
        <Button sx={{ bgcolor: 'var(--bgSecondary)', color: 'var(--foreground)', ":hover": { opacity: 0.8 } }} onClick={handleDecline}><CloseIcon /></Button>
      </Box>
    </ListItemButton>
  );
}
