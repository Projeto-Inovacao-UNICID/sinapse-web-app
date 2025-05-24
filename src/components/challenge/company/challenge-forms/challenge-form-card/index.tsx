import { FormDto } from "@/types";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface ChallengeFormCardProps {
  form: FormDto;
  selected?: boolean;
}

const MotionBox = motion(Box);

export function ChallengeFormCard({ form, selected }: ChallengeFormCardProps) {
  return (
    <MotionBox
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      role="button"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        bgcolor: selected ? "var(--primary)" : "var(--card)",
        color: selected ? "white" : "var(--foreground)",
        p: 2,
        borderRadius: 2,
        mb: 2,
        cursor: "pointer",
        outline: selected ? "2px solid var(--primary)" : "none",
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {form.nome}
      </Typography>
      {form.minScore > 0 && (
        <Typography variant="body1" sx={{ color: selected ? "white" : "var(--muted)" }}>
          Pontuação mínima: {form.minScore}
        </Typography>
      )}
      <Typography variant="body1" sx={{ color: selected ? "white" : "var(--muted)" }}>
        {form.descricao}
      </Typography>
    </MotionBox>
  );
}
