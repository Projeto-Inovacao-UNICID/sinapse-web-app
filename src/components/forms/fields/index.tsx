import { FormFieldDto } from "@/types";
import { Box } from "@mui/material";
import { FormField } from "./form-field";

interface FormFieldsProps {
  formFields: FormFieldDto[];
}

export function FormFields({ formFields }: FormFieldsProps) {
  return (
    <>
      {formFields.map((field: FormFieldDto) => (
        <Box key={field.id}>
          <FormField field={field} />
        </Box>
      ))}
    </>
  );
}
