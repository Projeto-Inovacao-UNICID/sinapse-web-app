'use client';

import {
  Alert,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useState } from 'react';
import { FormDto, FormFieldDto } from '@/types';
import { useCreateForm } from '@/hooks/forms/useForms';

type Props = {
  empresaId: string;
};

const emptyField: FormFieldDto = {
  label: '',
  fieldType: 'TEXT',
  category: 'SOFT_SKILL',
  weight: 1,
  required: false,
  options: null,
};

export function FormCreationCard({ empresaId }: Props) {
  const [form, setForm] = useState<FormDto>({
    nome: '',
    descricao: '',
    minScore: 0,
    fields: [structuredClone(emptyField)],
  });

  const { mutate: createForm, isPending, isSuccess, isError } = useCreateForm(empresaId);

  const handleFieldChange = (index: number, key: keyof FormFieldDto, value: any) => {
    const updatedFields = [...form.fields];
    (updatedFields[index] as any)[key] = value;
    if (key === 'fieldType' && value !== 'SELECT') {
      updatedFields[index].options = null;
    }
    setForm((prev) => ({ ...prev, fields: updatedFields }));
  };

  const handleAddField = () => {
    setForm((prev) => ({ ...prev, fields: [...prev.fields, structuredClone(emptyField)] }));
  };

  const handleRemoveField = (index: number) => {
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createForm(form);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius)',
        p: 3,
        maxWidth: 1000,
        margin: '0 auto',
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'var(--foreground)' }}>
          Criar Novo Formulário
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {isError && <Alert severity="error">Erro ao criar formulário.</Alert>}
            {isSuccess && <Alert severity="success">Formulário criado com sucesso!</Alert>}

            <TextField
              label="Nome"
              name="nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              fullWidth
              required
              sx={textFieldSx}
            />

            <TextField
              label="Descrição"
              name="descricao"
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              fullWidth
              multiline
              rows={3}
              required
              sx={textFieldSx}
            />

            <TextField
              label="Pontuação mínima"
              name="minScore"
              type="number"
              value={form.minScore}
              onChange={(e) => setForm({ ...form, minScore: +e.target.value })}
              fullWidth
              required
              sx={textFieldSx}
            />

            {form.fields.map((field, index) => (
              <Stack spacing={2} key={index} sx={{ border: '1px solid var(--border)', p: 2, borderRadius: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1" sx={{ color: 'var(--foreground)' }}>Campo {index + 1}</Typography>
                  <IconButton onClick={() => handleRemoveField(index)} color="error">
                    <Delete />
                  </IconButton>
                </Stack>

                <TextField
                  label="Label"
                  value={field.label}
                  onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
                  fullWidth
                  required
                  sx={textFieldSx}
                />

                <TextField
                  select
                  label="Tipo de campo"
                  value={field.fieldType}
                  onChange={(e) => handleFieldChange(index, 'fieldType', e.target.value)}
                  sx={textFieldSx}
                >
                  <MenuItem value="TEXT">Texto</MenuItem>
                  <MenuItem value="NUMBER">Número</MenuItem>
                  <MenuItem value="SELECT">Seleção</MenuItem>
                </TextField>

                <TextField
                  select
                  label="Categoria"
                  value={field.category}
                  onChange={(e) => handleFieldChange(index, 'category', e.target.value)}
                  sx={textFieldSx}
                >
                  <MenuItem value="SOFT_SKILL">Soft Skill</MenuItem>
                  <MenuItem value="HARD_SKILL">Hard Skill</MenuItem>
                  <MenuItem value="CULTURE">Cultura</MenuItem>
                </TextField>

                <TextField
                  label="Peso"
                  type="number"
                  value={field.weight}
                  onChange={(e) => handleFieldChange(index, 'weight', +e.target.value)}
                  fullWidth
                  required
                  sx={textFieldSx}
                />

                <FormControlLabel
                  sx={{ color: 'var(--muted)' }}
                  control={
                    <Checkbox
                      sx={{ color: 'var(--muted)' }}
                      checked={field.required}
                      onChange={(e) => handleFieldChange(index, 'required', e.target.checked)}
                    />
                  }
                  label="Campo obrigatório"
                />

                {field.fieldType === 'SELECT' && (
                  <Alert severity="info">Adição de opções SELECT ainda não implementada aqui.</Alert>
                )}
              </Stack>
            ))}

            <Button
              variant="outlined"
              onClick={handleAddField}
              sx={{ color: 'var(--primary)', borderColor: 'var(--primary)' }}
              startIcon={<Add />}
            >
              Adicionar Campo
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={isPending}
              sx={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                ':hover': { opacity: 0.8 },
                fontWeight: 'bold',
              }}
            >
              {isPending ? <CircularProgress size={24} /> : 'Criar Formulário'}
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}

const textFieldSx = {
  backgroundColor: 'var(--card)',
  color: 'var(--foreground)',
  '& label': {
    color: 'var(--muted)',
  },
  '& label.Mui-focused': {
    color: 'var(--primary)',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'var(--border)',
    },
    '&:hover fieldset': {
      borderColor: 'var(--primary)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--primary)',
    },
  },
  '& .MuiInputBase-input': {
    color: 'var(--foreground)',
  },
};
