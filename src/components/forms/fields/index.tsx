import { FormFieldDto } from "@/types";
import { Box, Typography } from "@mui/material";
import { FormField } from "./form-field";

interface FormFieldsProps {
  formFields: FormFieldDto[];
}

export function FormFields({ formFields }: FormFieldsProps) {
  return (
    <>
      <Typography variant="h6" sx={{ color: "var(--foreground)", fontWeight: "600", mb: 1 }}>
        Campos:
      </Typography>
      {formFields.map((field: FormFieldDto) => (
        <Box key={field.id}>
          <FormField field={field} />
        </Box>
      ))}
    </>
  );
}
