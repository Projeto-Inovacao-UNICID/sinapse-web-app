import { Box, Typography } from "@mui/material";

export function ChallengeDescription({ text }: { text: string }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={{ color: "var(--foreground)", fontWeight: "bold", mb: 1 }}>
        Descrição do Desafio
      </Typography>
      <Typography variant="body2" sx={{ color: "var(--muted)", whiteSpace: "pre-wrap" }}>
        {text}
      </Typography>
    </Box>
  );
}
