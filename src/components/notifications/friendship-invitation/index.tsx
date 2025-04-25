import { FriendshipContent } from '@/types';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Button, ListItemButton } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { FriendshipService } from '@/service/friendship/FriendshipService';
import { a } from 'motion/react-client';

interface FriendshipInvitationNotificationProps {
  friendshipContent: FriendshipContent;
}

export function FriendshipInvitationNotification({ friendshipContent }: FriendshipInvitationNotificationProps) {
  const username = friendshipContent.username;
  const amizadeId = friendshipContent.amizadeId;
  const service = new FriendshipService();

  const handleAccept = async () => {
    const res = await service.patchFriendship(amizadeId, 'aceito');
    console.log('Convite de amizade aceito com sucesso:', res);
  };

  const handleDecline = async () => {
    const res = await service.patchFriendship(amizadeId, 'rejeitado');
    console.log('Convite de amizade recusado com sucesso:', res);
  };

  return (
    <ListItemButton sx={{ display: 'flex', alignItems: 'center', gap: 2, flexDirection: 'row', padding: 0.5 }}>
      <div>
        <PersonAddIcon sx={{ color: 'var(--primary)' }} />
        <span>Convite de amizade recebido de {username}</span>
      </div>
      <div>
        <Button sx={{ color: 'var(--primary)' }} onClick={handleAccept}><DoneIcon /></Button>
        <Button sx={{ color: 'var(--card)' }} onClick={handleDecline}><CloseIcon /></Button>
      </div>
    </ListItemButton>
  );
}