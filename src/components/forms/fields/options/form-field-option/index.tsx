import { FormFieldOptionDto } from "@/types";
import { Box, Divider, Typography } from "@mui/material";

interface FormFieldOptionProps {
  option: FormFieldOptionDto;
}

export function FormFieldOption({ option }: FormFieldOptionProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography variant="body2" sx={{ color: "var(--foreground" }}>
        Rótulo: {option.label}
      </Typography>
      <Divider orientation="vertical" flexItem sx={{ borderColor: "var(--muted)" }} />
      <Typography variant="body2" sx={{ color: "var(--foreground)" }}>
        Valor: {option.value}
      </Typography>
      <Divider orientation="vertical" flexItem sx={{ borderColor: "var(--muted)" }} />
      <Typography variant="body2" sx={{ color: "var(--foreground)" }}>  
        Pontuação: {option.score}
      </Typography>
    </Box>
  );
}