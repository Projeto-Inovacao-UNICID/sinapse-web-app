'use client';

import { usePostGroup } from '@/hooks/group/useGroup';
import { Alert, Box, Button, Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface CreateGroupModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateGroupModal({ open, onClose }: CreateGroupModalProps) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [publico, setPublico] = useState(false);

  const { mutate: createGroup, isPending, isSuccess, isError } = usePostGroup();

  const handleCreateGroup = () => {
    createGroup({ nome, descricao, publico }, {
      onSuccess: () => {
        setNome('');
        setDescricao('');
        setPublico(false);
        onClose(); // fecha o modal quando criar com sucesso
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      transitionDuration={300}
      aria-labelledby="create-group-dialog-title"
      slotProps={{ 
        paper: {
          sx: {
            backgroundColor: 'var(--card)',  // Customize a cor de fundo
            borderRadius: 2,
          }
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        style={{ backgroundColor: 'var(--card)', borderRadius: 16, padding: 16 }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2  }} id="create-group-dialog-title">
          <Typography sx={{ color: 'var(--foreground)', fontWeight: 'bold', fontSize: '1.2rem' }}>
            Criar Grupo
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ color: 'var(--foreground)' }} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ borderRadius: 4 }}>
          {/* Mensagens de sucesso ou erro */}
          {isError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Erro ao criar grupo. Tente novamente.
            </Alert>
          )}
          {isSuccess && (
            <Alert severity="success" sx={{ mb: 2, backgroundColor: 'var(--success-bg)', color: 'var(--success-text)' }}>
              Grupo criado com sucesso!
            </Alert>
          )}

          <TextField
            label="Nome do Grupo"
            fullWidth
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            margin="normal"
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                background: 'var(--input)',
                borderRadius: 'var(--radius)',
                color: 'var(--foreground)',
                '&:hover fieldset': {
                  borderColor: 'var(--primary)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--primary)',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'var(--muted)',
                '&.Mui-focused': {
                  color: 'var(--primary)',
                },
              },
            }}
          />

          <TextField
            label="Descrição"
            fullWidth
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            margin="normal"
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                background: 'var(--input)',
                borderRadius: 'var(--radius)',
                color: 'var(--foreground)',
                '&:hover fieldset': {
                  borderColor: 'var(--primary)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--primary)',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'var(--muted)',
                '&.Mui-focused': {
                  color: 'var(--primary)',
                },
              },
            }}
          />

          <Box display="flex" alignItems="center" className="mb-4">
            <Button
              variant={publico ? 'contained' : 'outlined'}
              onClick={() => setPublico(!publico)}
              sx={{ 
                marginRight: 2, 
                color: publico ? "white" : "var(--muted)",
                bgcolor: publico ? "var(--primary)" : "var(--cardSecondary)",
                borderRadius: 2,
                borderColor: "var(--border)",
              }}
            >
              {publico ? 'Público' : 'Privado'}
            </Button>
            <Typography variant="body2" sx={{ color: 'var(--muted)' }}>
              Visibilidade do grupo
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleCreateGroup}
              disabled={isPending || !nome || !descricao}
              sx={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                borderRadius: 2,
                '&:hover': {
                  opacity: 0.8,
                },
                '&:disabled': {
                  opacity: 0.5,
                  cursor: 'not-allowed',
                },
              }}
            >
              {isPending ? 'Criando...' : 'Criar Grupo'}
            </Button>
          </Box>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
}
