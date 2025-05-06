import { Box, Typography } from "@mui/material";
import { ChallengeStageItem } from "../challenge-stage-item";
import { ParticipantResponseDto, RecruitmentStageResponseDto } from "@/types";

export function ChallengeStages({
  stages,
  completedStageIds,
  currentStageId,
  inscricao,
  isChallengeOwner,
  onSelect
}: {
  stages: RecruitmentStageResponseDto[];
  completedStageIds: number[];
  currentStageId?: number;
  inscricao: ParticipantResponseDto | null | undefined;
  isChallengeOwner: boolean;
  onSelect?: (stage: RecruitmentStageResponseDto) => void;
}) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="subtitle1" sx={{ color: "var(--foreground)", fontWeight: "bold", mb: 2 }}>
        Estágios
      </Typography>
      {stages.map(stage => (
        <ChallengeStageItem
          key={stage.id}
          stage={stage}
          isCompleted={completedStageIds.includes(stage.id)}
          isCurrent={stage.id === currentStageId}
          inscricao={inscricao}
          isChallengeOwner={isChallengeOwner}
          onSelect={onSelect}
        />
      ))}
    </Box>
  );
}
