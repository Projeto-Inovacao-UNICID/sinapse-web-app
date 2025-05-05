// src/components/challenge/company/creation-challenge-card/index.tsx
'use client';

import { usePostChallenge } from '@/hooks/challenge/useChallenge';
import { ChallengeCreateDto } from '@/types';
import { challengeTypesLabels } from '@/types';
import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';

type Props = {
  empresaId: string;
};

export function CreationChallengeCard({ empresaId }: Props) {
  const [form, setForm] = useState<ChallengeCreateDto>({
    titulo: '',
    descricao: '',
    dataInicio: '',
    dataFim: '',
    interno: false,
    modalidade: 'marketing',
  });

const { mutate: postChallenge, isPending, isSuccess, isError } = usePostChallenge();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, interno: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postChallenge({ companyId: empresaId, dto: form });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Card sx={{
        maxWidth: 600,
        mx: 'auto',
        p: 2,
        borderRadius: 4,
        boxShadow: 3,
        backgroundColor: 'var(--card)'
      }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} gutterBottom color='var(--foreground)'>
            Criar Novo Desafio
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {isError && (
                <Alert severity="error">Erro ao criar desafio. Tente novamente.</Alert>
              )}
              {isSuccess && (
                <Alert severity="success">Desafio criado com sucesso!</Alert>
              )}

              <TextField
                label="Título"
                name="titulo"
                value={form.titulo}
                onChange={handleChange}
                fullWidth
                required
                sx={{
                  backgroundColor: 'var(--input)',
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
                }}
              />

              <TextField
                label="Descrição"
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={4}
                sx={{
                  backgroundColor: 'var(--input)',
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
                }}
              />

              <Stack direction="row" spacing={3}>
                <TextField
                  label="Data de Início"
                  name="dataInicio"
                  type="date"
                  value={form.dataInicio}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                  sx={{
                    backgroundColor: 'var(--input)',
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
                  }}
                />

                <TextField
                  label="Data de Fim"
                  name="dataFim"
                  type="date"
                  value={form.dataFim}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                  sx={{
                    backgroundColor: 'var(--input)',
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
                  }}
                />
              </Stack>

              <TextField
                select
                label="Modalidade"
                name="modalidade"
                value={form.modalidade}
                onChange={handleChange}
                fullWidth
                sx={{
                  backgroundColor: 'var(--input)',
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
                }}
              >
                {Object.entries(challengeTypesLabels).map(([key, label]) => (
                  <MenuItem key={key} value={key}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>

              <FormControlLabel
                sx={{ color: 'var(--foreground)' }}
                control={
                  <Switch
                    checked={form.interno}
                    onChange={handleSwitch}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: 'var(--primary)', 
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: 'var(--primary)', 
                      },
                    }}
                  />
                }
                label="Desafio Interno"
              />

              <Button type="submit" variant="contained" disabled={isPending} sx={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', ':hover': { opacity: 0.8 }, fontWeight: 'bold' }}>
                {isPending ? <CircularProgress size={24} /> : 'Criar Desafio'}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
