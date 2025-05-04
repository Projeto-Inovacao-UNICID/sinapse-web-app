import { FriendshipInvitationsResponse, GroupInvite } from "@/types";
import { Divider, List, ListSubheader } from "@mui/material";
import { FriendshipInvitationNotification } from "./friendship-invitation";
import { GroupInvitationNotification } from "./group-invitation";

interface NotificationsProps {
  friendshipInvitations: FriendshipInvitationsResponse;
  groupInvites: GroupInvite[];
}

export function Notifications({ friendshipInvitations, groupInvites }: NotificationsProps) {
  const isFriendshipInvitationsEmpty = friendshipInvitations?.content.length === 0;
  const isGroupInvitesEmpty = !groupInvites || groupInvites.length === 0;

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, backgroundColor: 'var(--card)', color: 'var(--card-foreground)' }}
      component="nav"
      aria-labelledby="notifications-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="notifications-subheader"
          sx={{ color: 'var(--foreground)', backgroundColor: 'var(--card)' }}
        >
          Notificações
        </ListSubheader>
      }
    >
      {!isFriendshipInvitationsEmpty &&
        friendshipInvitations.content.map((friendshipContent) => (
          <div key={`friendship-${friendshipContent.amizadeId}`}>
            <FriendshipInvitationNotification friendshipContent={friendshipContent} />
            <Divider />
          </div>
        ))}

      {!isGroupInvitesEmpty &&
        groupInvites.map((groupInvite) => (
          <div key={`group-${groupInvite.conviteId}`}>
            <GroupInvitationNotification groupInvite={groupInvite} />
            <Divider />
          </div>
        ))}
    </List>
  );
}
