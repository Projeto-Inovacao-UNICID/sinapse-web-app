import { FormFieldOptionDto } from "@/types";
import { Box, Divider, Typography } from "@mui/material";

interface FormFieldOptionProps {
  option: FormFieldOptionDto;
}

export function FormFieldOption({ option }: FormFieldOptionProps) {
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Typography variant="body1" sx={{ color: "var(--foreground)" }}>
        Label: {option.label}
      </Typography>
      <Divider orientation="vertical" flexItem color="var(--muted)" />
      <Typography variant="body1" sx={{ color: "var(--foreground)" }}>
        Valor: {option.value}
      </Typography>
      <Divider orientation="vertical" flexItem color="var(--muted)" />
      <Typography variant="body1" sx={{ color: "var(--foreground)" }}>  
        Pontuação: {option.score}
      </Typography>
    </Box>
  );
}