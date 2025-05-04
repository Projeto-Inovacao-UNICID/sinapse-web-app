import { FriendshipService } from '@/service/friendship/FriendshipService';
import { FriendshipContent } from '@/types';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, Button, Card, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

interface FriendshipInviteCardProps {
  friendshipContent: FriendshipContent;
}

export function FriendshipInviteCard({ friendshipContent }: FriendshipInviteCardProps) {
  const { amizadeId, username } = friendshipContent;
  const service = new FriendshipService();
  const queryClient = useQueryClient();

  const handleAccept = async () => {
    try {
      await service.patchFriendship(amizadeId, 'aceito');
      await queryClient.invalidateQueries({ queryKey: ['friendship-invitations', 'recebidos'] });
    } catch (error) {
      console.error('Erro ao aceitar convite de amizade:', error);
    }
  };

  const handleDecline = async () => {
    try {
      await service.patchFriendship(amizadeId, 'rejeitado');
      await queryClient.invalidateQueries({ queryKey: ['friendship-invitations', 'recebidos'] });
    } catch (error) {
      console.error('Erro ao recusar convite de amizade:', error);
    }
  };

  return (
    <Card sx={{ bgcolor: 'var(--cardSecondary)', display: 'flex', p: 2, borderRadius: 2, minWidth: '100%', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="h6" color="var(--foreground)">
          <PersonAddIcon sx={{ color: 'var(--foreground)', mr: 1, fontSize: '1.5rem' }} />
          Convite de amizade
        </Typography>
        <Typography variant="body2" color="var(--muted)">
          Convite enviado por <strong>{username}</strong>
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button variant="contained" onClick={handleAccept} sx={{ bgcolor: 'var(--primary)', color: 'white', textTransform: 'none', ':hover': { opacity: 0.8 } }}>
          <CheckIcon sx={{ color: 'white' }} />
        </Button>
        <Button variant="outlined" onClick={handleDecline} sx={{ color: 'var(--foreground)', textTransform: 'none', borderColor: 'var(--muted)', ':hover': { opacity: 0.8 } }}>
          <CloseIcon sx={{ color: 'var(--foreground)' }} />
        </Button>
      </Box>
    </Card>
  );
}
