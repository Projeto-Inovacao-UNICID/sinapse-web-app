import { FriendshipInvitationsResponse } from "@/types";
import { Divider, List, ListSubheader } from "@mui/material";
import { FriendshipInvitationNotification } from "./friendship-invitation";

interface NotificationsProps {
  friendshipInvitations: FriendshipInvitationsResponse;
}


export function Notifications({ friendshipInvitations} : NotificationsProps) {
  const isFriendshipInvitationsEmpty = friendshipInvitations ? friendshipInvitations.content.length === 0 : true;
  console.log(friendshipInvitations);

  return (
  <List
      sx={{ width: '100%', maxWidth: 360, backgroundColor: 'var(--card)', color: 'var(--card-foreground)' }}
      component="nav"
      aria-labelledby="notifications-subheader"
      subheader={
        <ListSubheader component="div" id="notifications-subheader" sx={{ color: 'var(--foreground)', backgroundColor: 'var(--card)' }}>
          Notificações
        </ListSubheader>
      }
    > 
      {!isFriendshipInvitationsEmpty && (
        friendshipInvitations?.content.map((friendshipContent) => (
          <div key={friendshipContent.amizadeId}>
            <FriendshipInvitationNotification friendshipContent={friendshipContent} />
            <Divider />
          </div>
        ))
      )}
  </List>
  );
}