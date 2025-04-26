'use client';

import { useState } from 'react';
import {
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  CircularProgress,
  Alert,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { motion } from 'framer-motion';
import { usePostChallenge } from '@/hooks/challenge/usePostChallenge';
import { challengeTypesLabels, ChallengeTypes } from '@/types/challengeTypes';
import { Challenge } from '@/types/challenge';

type Props = {
  empresaId: string;
};

export function CreationChallengeCard({ empresaId }: Props) {
  const [form, setForm] = useState<Challenge>({
    titulo: '',
    descricao: '',
    dataInicio: '',
    dataFim: '',
    interno: false,
    modalidade: 'marketing',
  });

  const postChallenge = usePostChallenge(empresaId);

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
    postChallenge.mutate(form, {
      onSuccess: () => {
        setForm({
          titulo: '',
          descricao: '',
          dataInicio: '',
          dataFim: '',
          interno: false,
          modalidade: 'marketing',
        });
      },
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Card sx={{
        maxWidth: 600,
        mx: 'auto',
        p: 2,
        borderRadius: 4,
        boxShadow: 3,
        backgroundColor: 'var(--card)'  // Aqui estamos aplicando o fundo com a variável --card
      }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} gutterBottom color='var(--foreground)'>
            Criar Novo Desafio
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {postChallenge.isError && (
                <Alert severity="error">Erro ao criar desafio. Tente novamente.</Alert>
              )}
              {postChallenge.isSuccess && (
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
                        color: 'var(--primary)', // Cor do Switch quando checked
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: 'var(--primary)', // Cor do track quando checked
                      },
                    }}
                  />
                }
                label="Desafio Interno"
              />

              <Button type="submit" variant="contained" disabled={postChallenge.isPending} sx={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', ':hover': { opacity: 0.8 }, fontWeight: 'bold' }}>
                {postChallenge.isPending ? <CircularProgress size={24} /> : 'Criar Desafio'}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
