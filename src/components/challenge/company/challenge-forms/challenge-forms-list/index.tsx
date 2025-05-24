import { FormDto } from "@/types";
import { Box, Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { ChallengeFormCard } from "../challenge-form-card";
import { useState } from "react";

interface ChallengeFormsListProps {
  forms: FormDto[];
  value?: string;
  onChange?: (formId: string) => void;
}

export function ChallengeFormsList({ forms, value, onChange }: ChallengeFormsListProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <>
      <Typography variant="h6" sx={{ color: "var(--foreground)", fontWeight: "bold", mb: 1 }}>
        Formulários:
      </Typography>
      <RadioGroup value={value} onChange={handleChange}>
        {forms.map((form: FormDto) => (
          <FormControlLabel
            key={form.id}
            value={form.id}
            control={<Radio sx={{ display: "none" }} />}
            label={<ChallengeFormCard form={form} selected={value === form.id} />}
            sx={{ m: 0 }}
          />
        ))}
      </RadioGroup>
    </>
  );
}
