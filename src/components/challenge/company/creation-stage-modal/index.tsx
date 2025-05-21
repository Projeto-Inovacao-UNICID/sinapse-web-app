'use client';

import { usePostChallengeStage } from '@/hooks/challenge/useStageChallenge';
import { RecruitmentStageCreateDto } from '@/types';
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  PaperProps,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useGetActiveForms } from '@/hooks/forms/useForms';

type Props = {
  companyId: string;
  challengeId: number;
  stageOrder: number;
  open: boolean;
  onClose: () => void;
};

const statusOptions = {
  ABERTO: 'Aberto',
  FECHADO: 'Fechado',
  EM_ANDAMENTO: 'Em andamento',
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

export function CreationStageModal({ companyId, challengeId, open, stageOrder, onClose }: Props) {
  const [form, setForm] = useState<RecruitmentStageCreateDto>({
    estagio_atual: '',
    status: '',
    anotacoes: '',
    ordem: stageOrder,
  });

  const { mutate: postStage, isPending, isError, isSuccess } = usePostChallengeStage();

  const { data: formsData, isLoading: loadingForms } = useGetActiveForms(companyId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'ordem' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postStage({ challengeId, stage: form });
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
          minWidth: 400,
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h5" component="span" fontWeight={600} color="var(--foreground)">
          Criar Nova Etapa
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {isError && <Alert severity="error">Erro ao criar etapa.</Alert>}
            {isSuccess && <Alert severity="success">Etapa criada com sucesso!</Alert>}

            <TextField
              label="Nome do Estágio"
              name="estagio_atual"
              value={form.estagio_atual}
              onChange={handleChange}
              fullWidth
              required
              sx={textFieldSx}
            />

            <TextField
              select
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              fullWidth
              required
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
              {Object.entries(statusOptions).map(([value, label]) => (
                <MenuItem
                  key={value}
                  value={value}
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

            <TextField
              label="Anotações"
              name="anotacoes"
              value={form.anotacoes}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              sx={textFieldSx}
            />

            <TextField
              label="Ordem"
              name="ordem"
              type="number"
              value={form.ordem}
              onChange={handleChange}
              fullWidth
              required
              disabled
              sx={textFieldSx}
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
              {isPending ? <CircularProgress size={24} /> : 'Criar Etapa'}
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
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
