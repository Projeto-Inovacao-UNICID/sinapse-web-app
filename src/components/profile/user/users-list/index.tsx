import { List, ListItem, Typography } from "@mui/material";
import { UserCard } from "../user-card";

interface UsersListProps {
  ids: string[];
}

export function UsersList({ ids }: UsersListProps) {
  if (ids.length === 0) {
    return (
      <Typography variant="body1" color="var(--muted)">
        Nenhum aimigo encontrado.
      </Typography>
    );
  }

  return (
    <List disablePadding>
      {ids.map((id) => (
        <ListItem key={id} disableGutters sx={{ paddingY: 1 }}>
          <UserCard friendId={id} />
        </ListItem>
      ))}
    </List>
  );
}
