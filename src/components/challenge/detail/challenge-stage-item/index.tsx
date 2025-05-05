import {
    Box,
    Button,
    Paper,
    Typography,
    useTheme
  } from "@mui/material";
  import CheckCircleIcon from "@mui/icons-material/CheckCircle";
  import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { StageCommentForm } from "../stage-comment-form";
  
  export function ChallengeStageItem({
    stage,
    isCompleted,
    isCurrent,
    onSubmitComment
  }: {
    stage: { id: string; titulo: string; descricao: string };
    isCompleted: boolean;
    isCurrent: boolean;
    onSubmitComment?: (text: string) => void;
  }) {
    const theme = useTheme();
    return (
      <Paper sx={{ bgcolor: "var(--input)", p: 2, borderRadius: 2, mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          {isCompleted ? (
            <CheckCircleIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
          ) : (
            <HourglassBottomIcon sx={{ color: theme.palette.warning.main, mr: 1 }} />
          )}
          <Typography variant="subtitle1" sx={{ color: "var(--foreground)", fontWeight: "bold" }}>
            {stage.titulo}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "var(--muted)", mb: isCurrent ? 2 : 0 }}>
          {stage.descricao}
        </Typography>
        {isCurrent && onSubmitComment && (
          <StageCommentForm onSubmit={onSubmitComment} />
        )}
      </Paper>
    );
  }
  