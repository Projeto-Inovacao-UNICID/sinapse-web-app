"use client";

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, CircularProgress, Box } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { usePatchCompanyProfile } from "@/hooks/profile/company/useCompanyProfile";
import CloseIcon from "@mui/icons-material/Close";
import { UpdateCompanyProfileDto } from "@/types";

interface EditCompanyProfileModalProps {
  open: boolean;
  onClose: () => void;
  companyId: string;
  defaultValues: UpdateCompanyProfileDto;
}

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

export function EditCompanyProfileModal({ open, onClose, companyId, defaultValues }: EditCompanyProfileModalProps) {
  const [formData, setFormData] = useState(defaultValues);
  const patchCompanyProfile = usePatchCompanyProfile();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patchCompanyProfile.mutate(
      { companyId, data: formData },
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
      PaperComponent={MotionPaper}
    >
      <Box sx={{ display: "flex", flexDirection: "column", backgroundColor: "var(--card)", borderRadius: 2, padding: 4 }}>
        <DialogTitle className="flex justify-between items-center text-[var(--foreground)]">
          Editar Perfil da Empresa
          <IconButton onClick={onClose} className="text-[var(--muted-foreground)]">
            <CloseIcon sx={{ fill: "var(--foreground)",color: "var(--muted-foreground)", ":hover": { scale: 1.1 } }} />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent style={{ display: "flex", flexDirection: "column", gap: 16 }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: 2,
              gap: (theme) => theme.spacing(3), // Espaçamento entre os TextFields (ex: 20px)s
              overflowY: 'auto', // Para rolagem se o conteúdo for grande
            }}
          >
            <TextField
              name="nome"
              label="Nome da Empresa"
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
                style: { color: "var(--muted)" },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: 'var(--primary)' },
                  '&:hover fieldset': { borderColor: 'var(--primary)' },
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
                style: { color: "var(--muted)" },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: 'var(--primary)' },
                  '&:hover fieldset': { borderColor: 'var(--primary)' },
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
                style: { color: "var(--muted)" },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: 'var(--primary)' },
                  '&:hover fieldset': { borderColor: 'var(--primary)' },
                },
              }}
            />

            <TextField
              name="descricao"
              label="Descrição"
              value={formData.descricao || ""}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={3}
              variant="outlined"
              InputProps={{
                style: {
                  backgroundColor: "var(--input)",
                  color: "var(--foreground)",
                  borderRadius: "var(--radius)",
                },
              }}
              InputLabelProps={{
                style: { color: "var(--muted)" },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: 'var(--primary)' },
                  '&:hover fieldset': { borderColor: 'var(--primary)' },
                },
              }}
            />

            <TextField
              name="website"
              label="Website"
              value={formData.website || ""}
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
                style: { color: "var(--muted)" },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: 'var(--primary)' },
                  '&:hover fieldset': { borderColor: 'var(--primary)' },
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
              disabled={patchCompanyProfile.status === 'pending'}
              sx={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
                '&:hover': {
                  opacity: 0.8,
                  backgroundColor: "var(--primary)",
                }
              }}
              startIcon={patchCompanyProfile.status === 'pending' && <CircularProgress size={20} color="inherit" />}
            >
              {patchCompanyProfile.status === 'pending' ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogActions>
        </form>
      </Box>
    </Dialog>
  );
}
