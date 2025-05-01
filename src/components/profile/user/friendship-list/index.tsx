import { List, ListItem, Typography } from "@mui/material";
import { FriendCard } from "../friend-card";

interface FriendshipListProps {
  friendshipIds: string[];
}

export function FriendshipList({ friendshipIds }: FriendshipListProps) {
  if (friendshipIds.length === 0) {
    return (
      <Typography variant="body1" color="var(--muted)">
        Nenhum aimigo encontrado.
      </Typography>
    );
  }

  return (
    <List disablePadding>
      {friendshipIds.map((id) => (
        <ListItem key={id} disableGutters sx={{ paddingY: 1 }}>
          <FriendCard friendId={id} />
        </ListItem>
      ))}
    </List>
  );
}
