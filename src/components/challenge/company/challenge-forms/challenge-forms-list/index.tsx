import { FormDto } from "@/types";
import { Box, Typography } from "@mui/material";
import { ChallengeFormCard } from "../challenge-form-card";

interface ChallengeFormsListProps {
  forms: FormDto[];
}

export function ChallengeFormsList({ forms }: ChallengeFormsListProps) {
  return (
    <>
      <Typography variant="h6" sx={{ color: "var(--foreground)", fontWeight: "bold" }}>
        Formulários:
      </Typography>
      {forms.map((form: FormDto) => (
        <Box key={form.id}>
          <ChallengeFormCard form={form} />
        </Box>
      ))}
    </>
  );
}