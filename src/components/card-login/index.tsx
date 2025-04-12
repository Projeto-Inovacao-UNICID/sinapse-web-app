"use client";

import { bgColors, colors } from "@/theme/colors";
import { buttonFormStyle, inputFormStyle, radioStyle } from "@/theme/components-styles";
import { Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { LoginService } from "../../../service/LoginService";

interface CardLoginProps {
  onOpenModal: () => void;
};

export function CardLogin({onOpenModal}: CardLoginProps) {
  const [type, setType] = useState("usuario");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const service = new LoginService();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const data = await service.loginService(type, email, password);
      console.log('Login bem-sucedido:', data);
    } catch (error) {
      setEmail('');      // limpa o campo de email
      setPassword('');   // limpa o campo de senha
      console.error('Erro ao fazer login:', error);
    }    
  };
  
  return (
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
        paddingTop:32,
        borderRadius: 32,
        width: 400,
      }}
    >

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
      id="password"
      type="password"
      label="Senha"
      autoComplete="current-password"
      variant="filled"
      sx={inputFormStyle}
      value={password}
      onChange={handleChangePassword}
    />

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
  
    <Button
      type="submit"
      sx={buttonFormStyle}
      variant="contained"
    >
      <b>Entrar</b>
    </Button>
  
    <Typography sx={{ whiteSpace: 'nowrap', fontSize: '0.9rem', color: colors.lightGray }}>
      Não tem uma conta?{' '}
      <Button
        variant='text'
        sx={{ all: 'unset', color: colors.primary, textDecoration: 'none', cursor: 'pointer' }}
        onClick={onOpenModal}>
        Cadastre-se
      </Button>
    </Typography>
  </form>
  
  );
}