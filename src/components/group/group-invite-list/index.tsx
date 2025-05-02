import { GroupCard } from "@/components/group/group-card";
import { List, ListItem, Typography } from "@mui/material";
import { GroupInviteCard } from "../group-invite-card";
import { GroupInvite } from "@/types";

interface GroupInviteListProps {
  groupInvites: GroupInvite[];
}

export function GroupInviteList({ groupInvites }: GroupInviteListProps) {
  if (groupInvites.length === 0) {
    return (
      <Typography variant="body1" color="var(--muted)">
        Nenhum grupo encontrado.
      </Typography>
    );
  }

  return (
    <List disablePadding>
      {groupInvites.map((groupInvite) => (
        <ListItem key={groupInvite.grupoId} disableGutters sx={{ paddingY: 1 }}>
          <GroupInviteCard groupId={groupInvite.grupoId} whoInvitedId={groupInvite.quemConvidou} inviteId={groupInvite.conviteId} />
        </ListItem>
      ))}
    </List>
  );
}
