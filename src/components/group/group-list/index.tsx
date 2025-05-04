import { GroupCard } from "@/components/group/group-card";
import { List, ListItem, Typography } from "@mui/material";

interface GroupListProps {
  groupIds: number[];
  viewDescription?: boolean;
}

export function GroupList({ groupIds, viewDescription = false }: GroupListProps) {
  if (groupIds.length === 0) {
    return (
      <Typography variant="body1" color="var(--muted)">
        Nenhum grupo encontrado.
      </Typography>
    );
  }

  return (
    <List disablePadding>
      {groupIds.map((id) => (
        <ListItem key={id} disableGutters sx={{ paddingY: 1 }}>
          <GroupCard groupId={id} viewDescription={viewDescription} />
        </ListItem>
      ))}
    </List>
  );
}
