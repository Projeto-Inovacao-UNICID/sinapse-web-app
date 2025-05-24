import { FormFieldOptionDto } from "@/types";
import { FormFieldOption } from "./form-field-option";
import { Box, Typography } from "@mui/material";

interface FormOptionsProps {
  options: FormFieldOptionDto[];
}

export function FormOptions({ options }: FormOptionsProps) {
  return (
    <>
    <Typography variant="body1" sx={{ color: "var(--foreground)", fontWeight: 600 }}>
      Opções:
    </Typography>
      {options.map((opt: FormFieldOptionDto) => (
        <Box key={opt.value} sx={{ display: "flex", flexDirection: "column", mt: 1, backgroundColor: "var(--cardSecondary)", p: 1, borderRadius: 2 }}>
          <FormFieldOption option={opt} />
        </Box>
      ))}
    </>
  );
}