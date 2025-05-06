'use client';

import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
  Paper,
  PaperProps,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState, forwardRef } from 'react';
import { usePatchChallenge } from '@/hooks/challenge/useChallenge';
import { ChallengePatchDto, ChallengeResponseDto } from '@/types';
import { challengeTypesLabels } from '@/types';

type Props = {
  challenge: ChallengeResponseDto;
  open: boolean;
  onClose: () => void;
};

const MotionDialogPaper = forwardRef<HTMLDivElement, PaperProps>((props, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 30 }}
    transition={{ duration: 0.4 }}
  >
    <Paper {...props} />
  </motion.div>
));

export function EditChallengeModal({ challenge, open, onClose }: Props) {
  const [form, setForm] = useState<ChallengePatchDto>({
    titulo: '',
    descricao: '',
    dataInicio: '',
    dataFim: '',
    interno: false,
    modalidade: 'marketing',
  });

  const { mutate: patchChallenge, isPending, isSuccess, isError } = usePatchChallenge();

  useEffect(() => {
    if (challenge) {
      setForm({
        titulo: challenge.titulo,
        descricao: challenge.descricao,
        dataInicio: challenge.dataInicio,
        dataFim: challenge.dataFim,
        interno: challenge.interno,
        modalidade: challenge.modalidade,
      });
    }
  }, [challenge]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, interno: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patchChallenge({ challengeId: challenge.id, dto: form });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperComponent={MotionDialogPaper}
      PaperProps={{
        sx: {
          backgroundColor: 'var(--card)',
          borderRadius: 'var(--radius)',
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h5" component="span" fontWeight={600} color="var(--foreground)">
          Editar Desafio
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {isError && <Alert severity="error">Erro ao atualizar o desafio.</Alert>}
            {isSuccess && <Alert severity="success">Desafio atualizado com sucesso!</Alert>}

            <TextField
              label="Título"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              fullWidth
              required
              sx={textFieldSx}
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
              sx={textFieldSx}
            />

            <Stack direction="row" spacing={2}>
              <TextField
                label="Data de Início"
                name="dataInicio"
                type="date"
                value={form.dataInicio}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
                sx={textFieldSx}
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
                sx={textFieldSx}
              />
            </Stack>

            <TextField
              select
              label="Área"
              name="area"
              value={form.modalidade}
              onChange={handleChange}
              fullWidth
              sx={textFieldSx}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    sx: {
                      backgroundColor: 'var(--card)',
                      color: 'var(--foreground)',
                      borderRadius: 'var(--radius)',
                      boxShadow: 'none',
                      padding: 0,
                    },
                  },
                },
              }}
            >
              {Object.entries(challengeTypesLabels).map(([key, label]) => (
                <MenuItem
                  key={key}
                  value={key}
                  sx={{
                    backgroundColor: 'var(--card)',
                    color: 'var(--foreground)',
                    '&:hover': {
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-foreground)',
                    },
                    '&.Mui-selected': {
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-foreground)',
                    },
                  }}
                >
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
              {isPending ? <CircularProgress size={24} /> : 'Salvar Alterações'}
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const textFieldSx = {
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
};
