import {
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Button,
  Alert,
  Collapse,
} from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";
import { PublicFormDto, FormAnswerDto } from "@/types";
import { usePostResponseForm } from "@/hooks/forms/useForms";


interface ChallengeStageFormProps {
  form: PublicFormDto;
  stageId: number;
  participantId: string;
  onSubmitted?: () => void;
}

export function ChallengeStageForm({
  form,
  stageId,
  participantId,
  onSubmitted,
}: ChallengeStageFormProps) {
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [alert, setAlert] = useState<{ type: "success" | "error" | "warning"; message: string } | null>(null);

  const { mutate, isPending } = usePostResponseForm(stageId, participantId);

  const handleChange = (fieldId: string, value: string | number) => {
    setAnswers((prev) => ({ ...prev, [fieldId]: value }));
    setAlert(null); // limpa alertas ao alterar campos
  };

  const validateRequired = () => {
    return form.fields.every((field) => {
      if (!field.required) return true;
      const value = answers[field.id];
      return value !== undefined && value !== "";
    });
  };

  const handleSubmit = () => {
    if (!validateRequired()) {
      setAlert({ type: "warning", message: "Preencha todos os campos obrigatórios." });
      return;
    }

    const responseAnswers: FormAnswerDto[] = form.fields.map((field) => {
      const value = answers[field.id];
      const answer: FormAnswerDto = { fieldId: field.id };
      if (field.fieldType === "TEXT" || field.fieldType === "SELECT") {
        answer.text = String(value ?? "");
      } else if (field.fieldType === "NUMBER") {
        answer.number = Number(value ?? 0);
      }
      return answer;
    });

    mutate(
      { answers: responseAnswers },
      {
        onSuccess: () => {
          setAlert({ type: "success", message: "Formulário enviado com sucesso!" });
          setAnswers({});
          onSubmitted?.();
        },
        onError: () => {
          setAlert({ type: "error", message: "Erro ao enviar formulário. Tente novamente." });
        },
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="h6" sx={{ color: "var(--foreground)", fontWeight: "bold" }}>
          {form.nome}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "var(--muted)",
            fontWeight: 400,
            backgroundColor: "var(--cardTertiary)",
            p: 1,
            borderRadius: 2,
          }}
        >
          {form.descricao}
        </Typography>

        <Collapse in={!!alert}>
          {alert && (
            <Alert severity={alert.type} onClose={() => setAlert(null)} sx={{ mb: 1 }}>
              {alert.message}
            </Alert>
          )}
        </Collapse>

        {form.fields.map((field) => (
          <Box key={field.id} display="flex" flexDirection="column" gap={1}>
            <Typography variant="subtitle1" sx={{ color: "var(--foreground)", fontWeight: 500 }}>
              {field.label} {field.required ? "*" : ""}
            </Typography>

            {field.fieldType === "TEXT" && (
              <TextField
                fullWidth
                value={answers[field.id] ?? ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                required={field.required}
                placeholder="Digite sua resposta"
                variant="outlined"
                sx={textFieldStyles}
              />
            )}

            {field.fieldType === "NUMBER" && (
              <TextField
                fullWidth
                type="number"
                value={answers[field.id] ?? ""}
                onChange={(e) => handleChange(field.id, Number(e.target.value))}
                required={field.required}
                placeholder="Digite um número"
                variant="outlined"
                sx={textFieldStyles}
              />
            )}

            {field.fieldType === "SELECT" && field.options && (
              <FormControl fullWidth required={field.required}>
                <InputLabel
                  id={`select-label-${field.id}`}
                  sx={{ color: "var(--muted)", "&.Mui-focused": { color: "var(--primary)" } }}
                >
                  Escolha uma opção
                </InputLabel>
                <Select
                  labelId={`select-label-${field.id}`}
                  value={answers[field.id] ?? ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  label="Escolha uma opção"
                  sx={selectStyles}
                  MenuProps={{
                    PaperProps: {
                      sx: { backgroundColor: "var(--card)" },
                    },
                  }}
                >
                  {field.options.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      sx={{
                        color: "var(--foreground)",
                        "&:hover": {
                          backgroundColor: "var(--cardTertiary)",
                        },
                      }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>
        ))}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isPending}
          sx={{
            mt: 2,
            alignSelf: "flex-end",
            backgroundColor: "var(--primary)",
            color: "white",
            textTransform: "none",
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "var(--primaryHover)",
            },
          }}
        >
          {isPending ? "Enviando..." : "Enviar"}
        </Button>
      </Box>
    </motion.div>
  );
}

const textFieldStyles = {
  backgroundColor: "var(--input)",
  borderRadius: 2,
  "& .MuiOutlinedInput-root": {
    color: "var(--foreground)",
    "& fieldset": { borderColor: "var(--muted)" },
    "&:hover fieldset": { borderColor: "var(--primary)" },
    "&.Mui-focused fieldset": { borderColor: "var(--primary)" },
  },
  "& input::placeholder": {
    color: "var(--muted)",
    opacity: 1,
  },
};

const selectStyles = {
  backgroundColor: "var(--input)",
  borderRadius: 2,
  color: "var(--foreground)",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--muted)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--primary)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--primary)",
  },
};
