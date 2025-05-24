import { FormDto } from "@/types";
import { Typography, RadioGroup, FormControlLabel, Radio, Box } from "@mui/material";
import { ChallengeFormCard } from "../challenge-form-card";

interface ChallengeFormsListProps {
  forms: FormDto[];
  value?: string;
  onChange?: (formId: string | null) => void;
}

export function ChallengeFormsList({ forms, value, onChange }: ChallengeFormsListProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange?.(newValue === "" ? null : newValue);
  };

  // Formulário fictício representando "nenhum"
  const noneOption: FormDto = {
    id: "",
    nome: "Nenhum formulário",
    descricao: "Nenhum formulário será atribuído a esta etapa.",
    minScore: 0,
    fields: [],
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" sx={{ color: "var(--foreground)", fontWeight: "bold", mb: 1 }}>
        Formulários:
      </Typography>

      <RadioGroup value={value ?? ''} onChange={handleChange}>
        {[noneOption, ...forms].map((form) => (
          <FormControlLabel
            key={form.id ?? 'none'}
            value={form.id ?? ''}
            control={<Radio sx={{ display: 'none' }} />}
            label={
              <ChallengeFormCard
                form={form}
                selected={value === form.id || (!value && form.id === '')}
              />
            }
            sx={{
              width: '100%',     // container
              m: 0,
              '& .MuiFormControlLabel-label': {
                width: '100%',   // label interna
                display: 'block',
              },
            }}
          />
        ))}
      </RadioGroup>
    </Box>
  );
}
