import { useGetChallengeParticipants } from "@/hooks/challenge/useStageChallenge";
import { List, Typography } from "@mui/material";
import { ChallengeStageParticipantCard } from "../challenge-stage-participant-card";

interface ChallengeStageParticipantsProps {
  stageId: number;
  challengeId: number;
}

export function ChallengePrarticipantsList({ stageId, challengeId }: ChallengeStageParticipantsProps) {
  const { data: participants, isLoading } = useGetChallengeParticipants(stageId);

  if (isLoading) {
    return <Typography sx={{ color: "var(--muted)", mt: 2 }}>Carregando participantes...</Typography>;
  }

  const filtered = participants?.filter(p => p.estagioRecrutamentoId === stageId) ?? [];

  if (!filtered.length) {
    return <Typography sx={{ color: "var(--muted)", mt: 2 }}>Nenhum participante neste estágio.</Typography>;
  }

  return (
    <List sx={{ mt: 2, width: '100%' }}>
      {filtered.map((participant) => (
        <ChallengeStageParticipantCard participant={participant} challengeId={challengeId} key={participant.id} />
      ))}
    </List>
  );
}
