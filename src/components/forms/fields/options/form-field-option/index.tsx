import { FormFieldOptionDto } from "@/types";
import { Box, Typography } from "@mui/material";

interface FormFieldOptionProps {
  option: FormFieldOptionDto;
}

export function FormFieldOption({ option }: FormFieldOptionProps) {
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Typography variant="body1" sx={{ color: "var(--foreground)" }}>
        Label: {option.label}
      </Typography>
      <Typography variant="body1" sx={{ color: "var(--foreground)" }}>
        Valor: {option.value}
      </Typography>
      <Typography variant="body1" sx={{ color: "var(--foreground)" }}>  
        Pontuação: {option.score}
      </Typography>
    </Box>
  );
}