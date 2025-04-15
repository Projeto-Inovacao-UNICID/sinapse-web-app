'use client';

import { bgColors } from "@/theme/colors";
import { buttonFormStyle, inputFormStyle, modalStyle, radioStyle } from "@/theme/components-styles";
import { Box, Button, Fade, FormControlLabel, Modal, Radio, RadioGroup, TextField } from "@mui/material";
import { useState } from "react";
import { RegisterService } from "../../../service/auth/RegisterService";

interface RegistrationModalProps {
  open: boolean;
  handleClose: () => void;
};

export function RegistrationModal({open, handleClose}: RegistrationModalProps) {
  const [type, setType] = useState("usuario");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmation, setEmailConfirmation] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }; 

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangeEmailConfirmation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailConfirmation(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangePasswordConfirmation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(event.target.value);
  };

 const service = new RegisterService();

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
      const data = await service.registerService(type, name, username, email, password);
      console.log('Cadastro bem-sucedido:', data);
      handleClose();
    } catch (error) {
      console.error('Erro ao fazer cadastro:', error);
    }    
  };
  
  return (
    <>
      <Modal open={open}
        onClose={handleClose}
        closeAfterTransition
      >
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
                backgroundColor: bgColors.darkSecondary,
                padding: 24,
                borderRadius: 32,
                width: "fit-content",
                maxWidth: 400,
              }}
              >

              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleChangeType}
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

              <TextField
                fullWidth
                id="nome"
                type="text"
                label="Nome completo"
                variant="filled"
                sx={inputFormStyle}
                value={name}
                onChange={handleChangeName}
                />

              <TextField
                fullWidth
                id="username"
                type="text"
                label="Nome de usuário"
                variant="filled"
                sx={inputFormStyle}
                value={username}
                onChange={handleChangeUsername}
                />

              <div style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
                <TextField
                  fullWidth
                  id="email"
                  type="text"
                  label="Email"
                  variant="filled"
                  sx={inputFormStyle}
                  value={email}
                  onChange={handleChangeEmail}
                  />
                <TextField
                  fullWidth
                  id="emailConfirmation"
                  type="text"
                  label="Confirmar email"
                  variant="filled"
                  sx={inputFormStyle}
                  value={emailConfirmation}
                  onChange={handleChangeEmailConfirmation}
                  />
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
                <TextField
                  fullWidth
                  id="password"
                  type="password"
                  label="Senha"
                  autoComplete="current-password"
                  variant="filled"
                  sx={inputFormStyle}
                  value={password}
                  onChange={handleChangePassword}
                  />
                <TextField
                  fullWidth
                  id="passwordConfirmation"
                  type="password"
                  label="Confirmar senha"
                  autoComplete="current-password"
                  variant="filled"
                  sx={inputFormStyle}
                  value={passwordConfirmation}
                  onChange={handleChangePasswordConfirmation}
                  />
              </div>

              <Button
                type="submit"
                sx={buttonFormStyle}
                variant="contained"
                >
                <b>Cadastrar</b>
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};