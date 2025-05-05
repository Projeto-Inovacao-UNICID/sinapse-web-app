import { List, ListItem, Typography } from "@mui/material";
import { GroupInviteCard } from "./group-invite-card";
import { FriendshipInvitationsResponse, GroupInviteDto } from "@/types";
import { FriendshipInviteCard } from "./friendship-invite-card";

interface InviteListProps {
  groupInvites: GroupInviteDto[];
  friendshipInvitations: FriendshipInvitationsResponse["content"];
}

export function InviteList({ groupInvites, friendshipInvitations }: InviteListProps) {
  if (groupInvites.length === 0 && friendshipInvitations.length === 0) {
    return (
      <Typography variant="body1" color="var(--muted)">
        Nenhum convite encontrado.
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

      {friendshipInvitations.map((friendshipContent) => (
        <ListItem key={friendshipContent.amizadeId} disableGutters sx={{ paddingY: 1 }}>
          <FriendshipInviteCard friendshipContent={friendshipContent} />
        </ListItem>
      ))}
    </List>
  );
}
