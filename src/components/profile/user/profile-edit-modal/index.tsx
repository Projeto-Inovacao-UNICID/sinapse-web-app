"use client";

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, CircularProgress, Box } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { usePatchUserProfile } from "@/hooks/profile/user/useUserProfile";
import CloseIcon from "@mui/icons-material/Close"; // Ícone de fechar MUI
import { UpdateUserProfileDto } from "@/types";

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  defaultValues: UpdateUserProfileDto;
}

// Wrapper para integrar motion.div com o Paper do MUI
const MotionPaper = (props: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      className="bg-[var(--card)] text-[var(--card-foreground)] rounded-2xl p-4 shadow-lg"
      {...props}
    />
  );
};

export function EditProfileModal({ open, onClose, userId, defaultValues }: EditProfileModalProps) {
  const [formData, setFormData] = useState(defaultValues);
  const patchUserProfile = usePatchUserProfile();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patchUserProfile.mutate(
      { userId, payload: formData },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperComponent={MotionPaper} // Usando o wrapper motion.div
    >
      <Box sx={{ display: "flex", flexDirection: "column" , backgroundColor: "var(--card)", borderRadius: 2, padding: 4 }}>
        <DialogTitle className="flex justify-between items-center text-[var(--foreground)]">
          Editar Perfil
          <IconButton onClick={onClose} className="text-[var(--muted-foreground)]">
            <CloseIcon sx={{ color: "var(--muted-foreground)", ":hover": { scale: 1.1 } }} />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <TextField
              name="nome"
              label="Nome"
              value={formData.nome}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputProps={{
                style: {
                  backgroundColor: "var(--input)",
                  color: "var(--foreground)",
                  borderRadius: "var(--radius)",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "var(--muted)",
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--primary)', // Altera a borda para a cor primária quando o campo estiver em foco
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--primary)', // Altera a borda para a cor primária no hover
                  },
                },
              }}
            />
            <TextField
              name="username"
              label="Username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputProps={{
                style: {
                  backgroundColor: "var(--input)",
                  color: "var(--foreground)",
                  borderRadius: "var(--radius)",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "var(--muted)",
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--primary)', // Altera a borda para a cor primária quando o campo estiver em foco
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--primary)', // Altera a borda para a cor primária no hover
                  },
                },
              }}
            />
            <TextField
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputProps={{
                style: {
                  backgroundColor: "var(--input)",
                  color: "var(--foreground)",
                  borderRadius: "var(--radius)",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "var(--muted)",
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--primary)', // Altera a borda para a cor primária quando o campo estiver em foco
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--primary)', // Altera a borda para a cor primária no hover
                  },
                },
              }}
            />
          </DialogContent>

          <DialogActions className="flex justify-end gap-4 p-4">
            <Button onClick={onClose} variant="outlined" style={{
              color: "var(--foreground)",
              borderColor: "var(--muted)",
            }}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={patchUserProfile.status === 'pending'}
              sx={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
                '&:hover': {
                  opacity: 0.8,  // Ajuste o valor da opacidade conforme necessário
                  backgroundColor: "var(--primary)", // Cor de fundo no hover também para o botão
                }
              }}
              startIcon={patchUserProfile.status === 'pending' && <CircularProgress size={20} color="inherit" />} 
            >
              {patchUserProfile.status === 'pending' ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogActions>
        </form>


      </Box>
    </Dialog>
  );
}
