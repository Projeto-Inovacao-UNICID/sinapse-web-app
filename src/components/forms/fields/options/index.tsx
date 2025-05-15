import { FormFieldOptionDto } from "@/types";
import { FormFieldOption } from "./form-field-option";
import { Box, Typography } from "@mui/material";

interface FormOptionsProps {
  options: FormFieldOptionDto[];
}

export function FormOptions({ options }: FormOptionsProps) {
  return (
    <>
    <Typography variant="body1" sx={{ color: "var(--foreground)" }}>
      Opções:
    </Typography>
      {options.map((opt: FormFieldOptionDto) => (
        <Box key={opt.value}>
          <FormFieldOption option={opt} />
        </Box>
      ))}
    </>
  );
}