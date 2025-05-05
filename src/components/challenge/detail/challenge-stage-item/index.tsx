import {
  ParticipantResponseDto,
  RecruitmentStagePatchDto,
  RecruitmentStageResponseDto,
} from "@/types";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { StageCommentForm } from "../stage-comment-form";
import { usePatchChallengeStage } from "@/hooks/challenge/useStageChallenge";

const MotionBox = motion(Box);
const MotionIcon = motion(EditIcon);

export function ChallengeStageItem({
  stage,
  isCompleted,
  isCurrent,
  inscricao,
  isChallengeOwner,
  onSelect,
}: {
  stage: RecruitmentStageResponseDto;
  isCompleted: boolean;
  isCurrent: boolean;
  inscricao: ParticipantResponseDto | null | undefined;
  isChallengeOwner: boolean;
  onSelect?: (stage: RecruitmentStageResponseDto) => void;
}) {
  const theme = useTheme();
  const isDisabled = stage.status === "FECHADO";
  const isStageInitial = inscricao ? stage.id <= inscricao.estagioRecrutamentoId : false;

  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(stage.status);
  const [anotacoes, setAnotacoes] = useState(stage.anotacoes);
  const { mutateAsync: patchStage } = usePatchChallengeStage();
  const participantId = inscricao?.grupoId ?? inscricao?.usuarioId;
  const participanteIdStr = participantId ? participantId.toString() : "";

  const handleClick = () => {
    if (!isDisabled && !isEditing) {
      onSelect?.(stage);
    }
  };

  const handleSave = async () => {
    await patchStage({ stageId: stage.id, stage: { status, anotacoes } as RecruitmentStagePatchDto });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setStatus(stage.status);
    setAnotacoes(stage.anotacoes);
    setIsEditing(false);
  };

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
      <Box sx={{ display: "flex", alignItems: "center", mb: 1, justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CheckCircleIcon
            sx={{ color: isCompleted ? theme.palette.primary.main : "var(--muted)", mr: 1 }}
          />
          <Typography
            variant="subtitle1"
            sx={{ color: "var(--foreground)", fontWeight: "bold" }}
          >
            {stage.estagioAtual}
          </Typography>
        </Box>
        {isChallengeOwner && (
          <Box sx={{ display: "flex", gap: 1 }}>
            {isEditing && (
              <IconButton onClick={handleCancel} size="small">
                <CloseIcon sx={{ color: "var(--muted)" }} />
              </IconButton>
            )}
            <IconButton onClick={() => setIsEditing(true)} size="small" disabled={isEditing}>
              <MotionIcon
                animate={{
                  rotate: isEditing ? 90 : 0,
                  color: isEditing ? "var(--primary)" : "var(--muted)",
                }}
                transition={{ duration: 0.3 }}
              />
            </IconButton>
          </Box>
        )}
      </Box>

      {isEditing ? (
        <>
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel
              id={`status-label-${stage.id}`}
              sx={{
                color: "var(--muted)",
                "&.Mui-focused": { color: "var(--primary)" },
              }}
            >
              Status
            </InputLabel>
            <Select
              labelId={`status-label-${stage.id}`}
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
              sx={{
                backgroundColor: "var(--card)",
                color: "var(--foreground)",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--muted)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--primary)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--primary)",
                },
                "& .MuiSelect-icon": {
                  color: "var(--muted)",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "var(--card)",
                    color: "var(--foreground)",
                  },
                },
              }}
            >
              <MenuItem value="ABERTO">Aberto</MenuItem>
              <MenuItem value="EM_ANDAMENTO">Em andamento</MenuItem>
              <MenuItem value="FECHADO">Fechado</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Anotações"
            value={anotacoes}
            onChange={(e) => setAnotacoes(e.target.value)}
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            size="small"
            sx={{
              mb: 2,
              input: {
                color: "var(--foreground)",
              },
              label: {
                color: "var(--muted)",
                "&.Mui-focused": {
                  color: "var(--primary)",
                },
              },
              "& .MuiOutlinedInput-root": {
                color: "var(--foreground)",
                "& fieldset": {
                  borderColor: "var(--muted)",
                },
                "&:hover fieldset": {
                  borderColor: "var(--primary)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--primary)",
                },
              },
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{
                mt: 1,
                bgcolor: "var(--primary)",
                color: "var(--foreground)",
                "&:hover": {
                  opacity: 0.9,
                },
              }}
            >
              Salvar
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="body2" sx={{ color: "var(--muted)", mb: isCurrent ? 2 : 0 }}>
            {stage.status}
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted)", mb: isCurrent ? 2 : 0 }}>
            {stage.anotacoes}
          </Typography>
        </>
      )}

      {(isCurrent && isStageInitial && !isChallengeOwner) && (
        <StageCommentForm stageId={stage.id} participantId={participanteIdStr} />
      )}
    </MotionBox>
  );
}
