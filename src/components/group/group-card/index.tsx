import { useGetGroupById } from "@/hooks/group/useGroup";
import { Box, Card, Divider, Typography } from "@mui/material";

interface GroupCardProps {
  groupId: string;
  viewDescription?: boolean;
}

export function GroupCard({ groupId, viewDescription }: GroupCardProps) {
  const { data: group, isLoading, isError, error } = useGetGroupById(groupId);
  return (
    <Card sx={{ bgcolor: 'var(--card)', borderRadius: 2, mb: 2, overflow: 'visible', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" color="var(--foreground)" className="font-bold">
        {group?.nome}
      </Typography>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, flexDirection: 'row' }}>
        <Typography variant="body1" color="var(--muted)">
          Líder: {group?.liderId}
        </Typography>
        <Typography variant="body1" color="var(--muted)">
          {group?.publico ? 'Público' : 'Privado'}
        </Typography>
        <Typography variant="body1" color="var(--muted)">
          Criado em: {group?.createdAt}
        </Typography>
        {
          group?.updatedAt &&
          <Typography variant="body1" color="var(--muted)">
            Última atualização: {group?.updatedAt}
          </Typography>
        }
      </Box>
      {
        viewDescription &&
        <Typography variant="body1" color="var(--foreground)" sx={{ backgroundColor: 'var(--cardSecondary)', borderRadius: 2, padding: 2, maxHeight: '4rem', overflow: 'hidden' }}>
          {group?.descricao}
        </Typography>
      }
    </Card>
  );
}