'use client';

import { useUserProfile, useUserProfileImage } from "@/hooks/user/useUserProfile";
import { UserProfileService } from "@/service/user/profile/UserProfileService";
import { Avatar, Box, Grid, Typography, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

interface UserProfileCardProps {
  userId: string;
}

export function UserProfileCard({ userId }: UserProfileCardProps) {
  const { data: userProfile, isLoading, isError, error } = useUserProfile(userId);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    console.log(error);
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <Typography color="error">Erro ao carregar perfil</Typography>
      </Box>
    );
  }

  const { nome, username, criadoEm, temImagem, amigos, totalPostagens, totalReacoes } = userProfile ?? {};

  let imagemSrc = "";

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={8}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={imagemSrc}
              alt={nome}
              sx={{ width: 100, height: 100 }}
            />
            <Box sx={{ ml: 2 }}>
              <Typography variant="h5">{nome}</Typography>
              <Typography variant="body1" color="textSecondary">{username}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid size={4}>
          <Box>
            <Typography variant="h6">{amigos ? amigos.length : 0}</Typography>
            <Typography variant="body1" color="textSecondary">Amigos</Typography>
          </Box>
          <Box>
            <Typography variant="h6">{totalPostagens}</Typography>
            <Typography variant="body1" color="textSecondary">Postagens</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
