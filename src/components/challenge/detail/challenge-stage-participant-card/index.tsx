import { UserProfileImage } from "@/components/common/user-avatar";
import { useGetGroupById } from "@/hooks/group/useGroup";
import { useUserProfile } from "@/hooks/profile/user/useUserProfile";
import { ParticipantResponseDto } from "@/types";
import { Box, Divider, ListItem, Typography } from "@mui/material";

interface ChallengeStageParticipantCardProps {
  participant: ParticipantResponseDto;
}

export function ChallengeStageParticipantCard({ participant }: ChallengeStageParticipantCardProps) {
  const { data: grupo } = useGetGroupById(participant.grupoId ?? 0);
  const { data: user } = useUserProfile(participant.usuarioId);

  const isGroup = grupo !== null;
  const nome = grupo ? grupo.nome : user?.nome ?? "";

  return (
    <Box>
      <ListItem sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        bgColor: "var(--cardSecondary)",
        p: 2,
        mb: 1
      }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ width: '2rem', height: '2rem' }}>
              <UserProfileImage userId={participant.usuarioId} temImagem={user?.temImagem ?? false} />
            </Box>
            {/* <DeleteIcon sx={{ color: "var(--muted)" }} /> */}
          </Box>
          <Box>
            <Typography variant="h5" sx={{ color: "var(--foreground)", fontWeight: "bold" }}>
              {nome}
            </Typography>
            <Typography variant="body2" sx={{ color: "var(--muted)" }}>
              Status: {participant.status}
            </Typography>
            <Typography variant="body2" sx={{ color: "var(--muted)" }}>
              Avaliação: {participant.avaliacao}
            </Typography>
            <Typography variant="body2" sx={{ color: "var(--muted)" }}>
              Feedback: {participant.feedback}
            </Typography>
          </Box>
        </Box>
      </ListItem>
      <Divider sx={{ bgColor: "var(--muted)", my: 2 }} />
    </Box>
  );
}
