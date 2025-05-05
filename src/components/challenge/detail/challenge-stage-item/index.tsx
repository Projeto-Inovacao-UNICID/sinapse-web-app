import { ParticipantResponseDto, RecruitmentStageResponseDto } from "@/types";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { StageCommentForm } from "../stage-comment-form";

const MotionBox = motion(Box);

export function ChallengeStageItem({
  stage,
  isCompleted,
  isCurrent,
  inscricao,
  isCompanyUser,
  onSelect,
}: {
  stage: RecruitmentStageResponseDto;
  isCompleted: boolean;
  isCurrent: boolean;
  inscricao: ParticipantResponseDto | null | undefined;
  isCompanyUser: boolean;
  onSelect?: (stage: RecruitmentStageResponseDto) => void;
}) {
  const theme = useTheme();
  const isDisabled = stage.status === "FECHADO";

  const handleClick = () => {
    if (!isDisabled) {
      onSelect?.(stage);
    }
  };
  
  const isStageInitial = inscricao ? stage.id <= inscricao.estagioRecrutamentoId : false;

  return (
    <MotionBox
      onClick={handleClick}
      whileHover={!isDisabled && !isCurrent ? { scale: 1.02 } : {}}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      sx={{
        bgcolor: "var(--input)",
        p: 2,
        borderRadius: 2,
        mb: 2,
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.6 : 1,
        outline: "none",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        {isCompleted ? (
          <CheckCircleIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
        ) : (
          <CheckCircleIcon sx={{ color: "var(--muted)", mr: 1 }} />
        )}
        <Typography
          variant="subtitle1"
          sx={{ color: "var(--foreground)", fontWeight: "bold" }}
        >
          {stage.estagioAtual}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        sx={{ color: "var(--muted)", mb: isCurrent ? 2 : 0 }}
      >
        {stage.anotacoes}
      </Typography> 
      {(isCurrent && isStageInitial && !isCompanyUser) && <StageCommentForm stageId={0} participantId={""} />}
    </MotionBox>
  );
}
