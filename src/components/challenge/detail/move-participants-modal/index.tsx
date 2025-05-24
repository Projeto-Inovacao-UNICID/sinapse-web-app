import { useBatchMoveParticipants } from "@/hooks/challenge/useStageChallenge"; // Hook para mover múltiplos participantes
import { stagesChallengeService } from "@/service/challenge/StagesChallengeService";
import { ParticipantResponseDto } from "@/types";
import CloseIcon from '@mui/icons-material/Close';
import { Autocomplete, Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface MoveParticipantsModalProps {
  open: boolean;
  onClose: () => void;
  stageId: number; // Alterado para stageId, pois agora movemos entre estágios
}

export function MoveParticipantsModal({ open, onClose, stageId }: MoveParticipantsModalProps) {
  const [participants, setParticipants] = useState<ParticipantResponseDto[]>([]);
  const { mutateAsync: batchMoveParticipants, isPending } = useBatchMoveParticipants(() => fetchParticipants());
  const [selectedParticipants, setSelectedParticipants] = useState<ParticipantResponseDto[]>([]);
  const [message, setMessage] = useState<string>('');
  
  // Função para buscar os participantes da API
  const fetchParticipants = async () => {
    try {
      const res = await stagesChallengeService.getParticipants(stageId);
      setParticipants(res ?? []);
    } catch (error) {
      console.error('Erro ao buscar participantes:', error);
    }
  };

  // Carrega os participantes quando o modal abrir
  useEffect(() => {
    if (open) {
      fetchParticipants();
    }
  }, [open]);

  // Resetar seleção quando o modal fechar
  useEffect(() => {
    if (!open) {
      setSelectedParticipants([]);
      setMessage('');
    }
  }, [open]);

  const handleMoveParticipants = async () => {
    if (selectedParticipants.length > 0 && message.trim()) {
      const dto = {
        participanteIds: selectedParticipants.map(p => p.id),
        novoEstagioId: stageId,
        mensagem: message,
      };

      try {
        await batchMoveParticipants({ stageId, dto });
        setSelectedParticipants([]);
        setMessage('');
        onClose();
      } catch (error) {
        console.error("Erro ao mover participantes:", error);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      transitionDuration={300}
      slotProps={{
        paper: { sx: { backgroundColor: 'var(--card)', borderRadius: 2 } }
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        style={{ backgroundColor: 'var(--card)', borderRadius: 16, padding: 16 }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography sx={{ color: 'var(--foreground)', fontWeight: 'bold', fontSize: '1.2rem' }}>
            Mover Participantes
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ color: 'var(--foreground)' }} />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Autocomplete
            multiple
            options={participants}
            value={selectedParticipants}
            onChange={(_, newValue) => setSelectedParticipants(newValue)}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => `Participante ${option.id}`}
            loading={false}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buscar participantes"
                placeholder="Digite o nome"
                margin="normal"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isPending ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    background: 'var(--input)',
                    borderRadius: 'var(--radius)',
                    color: 'var(--foreground)',
                    '&:hover fieldset': { borderColor: 'var(--primary)' },
                    '&.Mui-focused fieldset': { borderColor: 'var(--primary)' },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'var(--muted)',
                    '&.Mui-focused': { color: 'var(--primary)' },
                  },
                }}
              />
            )}
            slotProps={{
              paper: {
                sx: {
                  backgroundColor: 'var(--card)',
                  color: 'var(--foreground)',
                  borderRadius: 'var(--radius)',
                  mt: 1,
                  '& .MuiAutocomplete-option': {
                    color: 'var(--foreground)',
                    '&[aria-selected="true"]': {
                      backgroundColor: 'var(--primary)',
                      color: '#fff',
                    },
                    '&:hover': {
                      backgroundColor: 'var(--primary)',
                      color: '#fff',
                    },
                  },
                },
              },
            }}
            sx={{
              '& .MuiChip-root': {
                backgroundColor: 'transparent',
                border: '1px solid var(--primary)',
                color: 'var(--foreground)',
              },
              '& .MuiChip-deleteIcon': {
                color: 'var(--foreground)',
              },
            }}
          />

          <TextField
            label="Mensagem"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={3}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                background: 'var(--input)',
                borderRadius: 'var(--radius)',
                color: 'var(--foreground)',
                '&:hover fieldset': { borderColor: 'var(--primary)' },
                '&.Mui-focused fieldset': { borderColor: 'var(--primary)' },
              },
            }}
          />

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleMoveParticipants}
              disabled={isPending || selectedParticipants.length === 0 || !message.trim()}
              sx={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                borderRadius: 2,
                '&:hover': { opacity: 0.9 },
                '&:disabled': {
                  opacity: 0.5,
                  cursor: 'not-allowed',
                },
              }}
            >
              {isPending ? 'Movendo participantes...' : 'Mover Participantes'}
            </Button>
          </Box>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
}
