import { useGetGroupById, usePostAcceptGroupInvite, usePostRejectGroupInvite } from "@/hooks/group/useGroup";
import { useUserProfile } from "@/hooks/user/useUserProfile";
import { Box, Button, Card, Typography } from "@mui/material";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface GroupInviteCardProps {
  groupId: number;
  inviteId: number;
  whoInvitedId: string;
}

export function GroupInviteCard({ groupId, whoInvitedId, inviteId }: GroupInviteCardProps) {
  const { data: profile } = useUserProfile(whoInvitedId);
  const { data: group } = useGetGroupById(groupId);
  const leaderId = group ? group.liderId : '';
  const { data: leaderProfile } = useUserProfile(leaderId);
  const { mutateAsync: acceptGroupInvite } = usePostAcceptGroupInvite();
  const { mutateAsync: rejectGroupInvite } = usePostRejectGroupInvite();

  const handleAccept = async () => {
    await acceptGroupInvite({ id: groupId, inviteId });
  };

  const handleReject = async () => {
    await rejectGroupInvite({ id: groupId, inviteId });
  };

  return (
    <Card sx={{ bgcolor: 'var(--cardSecondary)', display: 'flex', p: 2, borderRadius: 2, minWidth: '100%',justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" color="var(--foreground)">
          <GroupAddIcon sx={{ color: "var(--foreground", size: "1.5rem" }} /> Convite para participar do grupo: {group?.nome}
        </Typography>
      <Typography variant="body1" color="var(--muted)">
        Convite enviado por {profile?.nome}
      </Typography>
      <Typography variant="body2" color="var(--muted)">
        Líder do grupo: {leaderProfile?.nome}
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Button variant="contained" onClick={handleAccept} sx={{ bgcolor: "var(--primary)", color: "white", textTransform: "none", ':hover': { opacity: 0.8 } }}>
        <CheckIcon sx={{ color: "white" }} />
      </Button>
      <Button variant="outlined" onClick={handleReject} sx={{ color: "var(--foreground)", textTransform: "none", borderColor: "var(--muted)", ':hover': { opacity: 0.8 } }}>
        <CloseIcon sx={{ color: "var(--foreground)" }} />
      </Button>
    </Box>
    </Card> 
  );
}