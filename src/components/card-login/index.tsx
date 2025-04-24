'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextField, Button, RadioGroup, FormControlLabel,
  Radio, Typography
} from "@mui/material";

import { LoginService } from "@/service/auth/LoginService";
import { SessionService } from "@/service/session/SessionService";
import { ModalError } from "../modal-error";
import {
  buttonFormStyle, inputFormStyle, radioStyle
} from "@/theme/components-styles";
import { useSession } from "@/hooks/session/useSession";
import { useQueryClient } from "@tanstack/react-query";

interface CardLoginProps {
  onOpenModal: () => void;
};

export function CardLogin({ onOpenModal }: CardLoginProps) {
  const [type, setType] = useState("usuario");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorStatus, setErrorStatus] = useState("");

  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const loginService = new LoginService();
      await loginService.loginService(type, username, password);

      // Revalida a sessão
      const sessionService = new SessionService();
      const updatedSession = await queryClient.fetchQuery({
        queryKey: ["session"],
        queryFn: () => sessionService.getSession(),
      });

      const userId = updatedSession?.id;
      if (!userId) throw new Error("Sessão inválida");

      // Redireciona com o ID
      if (type === "usuario") {
        router.push(`/profile/me/${userId}`);
      } else {
        router.push(`/empresa/me/${userId}`);
      }
    } catch (err: any) {
      setUsername('');
      setPassword('');
      setErrorMsg(err?.response?.data?.message || 'Email ou senha inválidos');
      setErrorStatus(err?.response?.data?.status || '400');
      setModalOpen(true);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          backgroundColor: 'var(--bgSecondary)',
          padding: 24,
          paddingTop: 32,
          borderRadius: 32,
          width: 400,
        }}
      >
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
          name="tipo"
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

        <Typography sx={{ whiteSpace: 'nowrap', fontSize: '0.9rem', color: 'var(--lightGray)' }}>
          Não tem uma conta?{' '}
          <Button
            variant='text'
            sx={{ all: 'unset', color: 'var(--primary)', textDecoration: 'none', cursor: 'pointer' }}
            onClick={onOpenModal}>
            Cadastre-se
          </Button>
        </Typography>
      </form>

      <ModalError open={modalOpen} onClose={() => setModalOpen(false)} error={errorMsg} msg={errorStatus} />
    </>
  );
}
