import { UserProfileCard } from "@/components/profile/user/card-profile";
import { UsersList } from "@/components/profile/user/users-list";
import { useGetGroupById, useGetGroupMembers } from "@/hooks/group/useGroup";
import { useUserProfile } from "@/hooks/user/useUserProfile";
import { Box, Card, Divider, Typography } from "@mui/material";

interface GroupCardProps {
  groupId: string;
  viewDescription?: boolean;
}

export function GroupCard({ groupId, viewDescription }: GroupCardProps) {
  const { data: group, isLoading, isError, error } = useGetGroupById(groupId);
  const leaderId = group ? group.liderId : '';
  const { data: leaderProfile } = useUserProfile(leaderId);
  const { data: groupMembers } = useGetGroupMembers(groupId);

  const membersIds = groupMembers?.map(member => member.usuarioId);

  const members = <UsersList ids={membersIds ?? []} />;

  return (
    <Card sx={{ bgcolor: 'var(--cardSecondary)', borderRadius: 2, p: 2, overflow: 'visible', display: 'flex', flexDirection: 'column',minWidth: "100%" }}>
      <Typography variant="h6" color="var(--foreground)" className="font-bold">
        {group?.nome}
      </Typography>
      <Divider sx={{ bgcolor: 'var(--muted)', my: 2 }} />
      <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
        <Typography variant="body1" color="var(--muted)">
          Líder: {leaderProfile?.nome}
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
        viewDescription && (
        <>
          <Box sx={{ display: 'flex', gap: 2, mt: 2, flexDirection: 'column' }}>
            <Typography variant="body1" color="var(--foreground)">
              Descrição:
            </Typography>
            <Typography variant="body1" color="var(--foreground)" sx={{ backgroundColor: 'var(--bgTertiary)', borderRadius: 2, padding: 2, maxHeight: '4rem', overflow: 'hidden' }}>
              {group?.descricao}
            </Typography>
          </Box>
          <Divider sx={{ bgcolor: 'var(--muted)', my: 2 }} />
          <Box sx={{ display: 'flex', gap: 2, mt: 2, flexDirection: 'column' }}>
            <Typography variant="body1" color="var(--foreground)">
              Membros:
            </Typography>
            <Box sx={{ width: "100%" }}>
              {members}
            </Box>
          </Box>
        </>
        )
      }
    </Card>
  );
}