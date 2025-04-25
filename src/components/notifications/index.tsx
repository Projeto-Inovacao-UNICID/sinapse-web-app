import { useFriendship, useGetFriendshipInvitations } from "@/hooks/friendship/useFriendship";
import { List, ListItemButton, ListItemText, ListSubheader } from "@mui/material";
import { FriendshipInvitationNotification } from "./friendship-invitation";


export function Notifications() {
  const { data: friendshipInvitations, isLoading: isFriendshipInvitationsLoading } = useGetFriendshipInvitations('recebidos');

  if (isFriendshipInvitationsLoading) {
    return (
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="notifications-subheader"
        subheader={
          <ListSubheader component="div" id="notifications-subheader">
            Notificações
          </ListSubheader>
        }
      >
        <ListItemButton>
          <ListItemText primary="Carregando..." />
        </ListItemButton>
      </List>
    );
  }

  const isFriendshipInvitationsEmpty = friendshipInvitations ? friendshipInvitations.content.length === 0 : true;

  return (
  <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="notifications-subheader"
      subheader={
        <ListSubheader component="div" id="notifications-subheader">
          Notificações
        </ListSubheader>
      }
    > 
      {!isFriendshipInvitationsEmpty && (
        friendshipInvitations?.content.map((friendshipContent) => (
          <FriendshipInvitationNotification friendshipContent={friendshipContent} />
        ))
      )}
  </List>
  );
}