import { FormDto } from "@/types";
import { Box } from "@mui/material";
import { FormCard } from "../form-card";

interface FormListProps {
  companyId: string;
  forms: FormDto[];
  isActive: boolean;
}

export function FormList({ forms, companyId, isActive }: FormListProps) {

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

      </Box>
      {forms.map((form: FormDto) => (
        <Box key={form.id}>
          <FormCard form={form} companyId={companyId} isActive={isActive} />
        </Box>
      ))}
    </>
  );
}