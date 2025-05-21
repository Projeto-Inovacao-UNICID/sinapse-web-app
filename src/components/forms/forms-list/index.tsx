import { useGetActiveForms } from "@/hooks/forms/useForms";
import { FormDto } from "@/types";
import { Box, Typography } from "@mui/material";
import { FormCard } from "../form-card";

interface FormListProps {
  companyId: string;
}

export function FormList({ companyId }: FormListProps) {
  const { data, isLoading } = useGetActiveForms(companyId);
  const forms = data?.content ?? [];

  if (isLoading) return <Typography>Carregando…</Typography>;

  return (
    <>
      {forms.map((form: FormDto) => (
        <Box key={form.id}>
          <FormCard form={form} companyId={companyId} />
        </Box>
      ))}
    </>
  );
}