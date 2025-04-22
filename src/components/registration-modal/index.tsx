'use client';

import { RegisterService } from "@/service/auth/RegisterService";
import { buttonFormStyle, inputFormStyle, modalStyle, radioStyle } from "@/theme/components-styles";
import { Box, Button, Fade, FormControlLabel, Modal, Radio, RadioGroup, TextField } from "@mui/material";
import { useState } from "react";

interface RegistrationModalProps {
  open: boolean;
  handleClose: () => void;
}

export function RegistrationModal({ open, handleClose }: RegistrationModalProps) {
  const [type, setType] = useState("usuario");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmation, setEmailConfirmation] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (email !== emailConfirmation) {
      alert('Os campos de email não coincidem.');
      return;
    }

    if (password !== passwordConfirmation) {
      alert('Os campos de senha não coincidem.');
      return;
    }

    try {
      const service = new RegisterService();
      const data = await service.registerService(type, name, username, email, password);
      console.log('Cadastro bem-sucedido:', data);
      handleClose();
    } catch (error) {
      console.error('Erro ao fazer cadastro:', error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Fade in={open}>
        <Box sx={modalStyle}>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              backgroundColor: "var(--bgSecondary)",
              padding: 24,
              borderRadius: 32,
              width: "fit-content",
              maxWidth: 400,
            }}
          >
            <RadioGroup
              row
              name="row-radio-buttons-group"
              onChange={(e) => setType(e.target.value)}
              value={type}
            >
              <FormControlLabel
                value="usuario"
                control={<Radio sx={radioStyle} />}
                label="Usuário"
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.9rem' } }}
              />
              <FormControlLabel
                value="empresa"
                control={<Radio sx={radioStyle} />}
                label="Empresa"
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.9rem' } }}
              />
            </RadioGroup>

            <TextField fullWidth label="Nome completo" variant="filled" sx={inputFormStyle} value={name} onChange={(e) => setName(e.target.value)} />
            <TextField fullWidth label="Nome de usuário" variant="filled" sx={inputFormStyle} value={username} onChange={(e) => setUsername(e.target.value)} />

            <div style={{ display: 'flex', gap: 12 }}>
              <TextField fullWidth label="Email" variant="filled" sx={inputFormStyle} value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField fullWidth label="Confirmar email" variant="filled" sx={inputFormStyle} value={emailConfirmation} onChange={(e) => setEmailConfirmation(e.target.value)} />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <TextField fullWidth type="password" label="Senha" autoComplete="current-password" variant="filled" sx={inputFormStyle} value={password} onChange={(e) => setPassword(e.target.value)} />
              <TextField fullWidth type="password" label="Confirmar senha" autoComplete="current-password" variant="filled" sx={inputFormStyle} value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
            </div>

            <Button type="submit" sx={buttonFormStyle} variant="contained">
              <b>Cadastrar</b>
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}
