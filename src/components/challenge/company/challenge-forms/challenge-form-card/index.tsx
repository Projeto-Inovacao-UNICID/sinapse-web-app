import { FormDto } from "@/types";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface ChallengeFormCardProps {
  form: FormDto;
}

const MotionBox = motion(Box);

export function ChallengeFormCard({ form }: ChallengeFormCardProps) {

  return (
    <MotionBox
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        role="button"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          bgcolor: "var(--card)",
          p: 2,
          borderRadius: 2,
          mb: 2,
          cursor: "pointer",
          opacity: 1,
          outline: "none",
          boxShadow: 3,
        }}
      >
      <Typography variant="h6" sx={{ color: "var(--foreground)", fontWeight: "bold" }}>
        {form.nome}
      </Typography>
      <Typography variant="body1" sx={{ color: "var(--muted)" }}>
        Pontuação mínima: {form.minScore}
      </Typography>
      <Typography variant="body1" sx={{ color: "var(--muted)" }}>
        {form.descricao}
      </Typography>
    </MotionBox>
  );
}