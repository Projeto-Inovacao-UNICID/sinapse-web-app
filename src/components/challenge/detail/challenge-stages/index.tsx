import { Box, Typography } from "@mui/material";
import { ChallengeStageItem } from "../challenge-stage-item";

export function ChallengeStages({
  stages,
  completedStageIds,
  currentStageId,
  onSubmitComment
}: {
  stages: { id: string; titulo: string; descricao: string }[];
  completedStageIds: string[];
  currentStageId?: string;
  onSubmitComment(stageId: string, text: string): void;
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
          onSubmitComment={text => onSubmitComment(stage.id, text)}
        />
      ))}
    </Box>
  );
}
