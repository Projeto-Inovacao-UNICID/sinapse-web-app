'use client';

import { useFriendship } from "@/hooks/friendship/useFriendship";
import { useSession } from "@/hooks/session/useSession";
import { useUserProfile } from "@/hooks/user/useUserProfile";
import { Avatar, Box, Button, CircularProgress, Grid, Typography } from "@mui/material";

interface UserProfileCardProps {
  userId: string;
}

export function UserProfileCard({ userId }: UserProfileCardProps) {
  const { data: userProfile, isLoading, isError, error } = useUserProfile(userId);
  const { data: friendship, isLoading: isFriendshipLoading, isError: isFriendshipError, error: friendshipError } = useFriendship();
  const { session } = useSession();

  const isProfileOwner = session?.id === userId;
  const isUser = session ? session.roles.includes('ROLE_USER') : false;

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <CircularProgress sx={{ color: "var(--muted)" }} />
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

  const { nome, username, criadoEm, temImagem, ativo, amigos, totalPostagens, totalReacoes, podeAdicionarAmigo, atualizadoEm } = userProfile ?? {};

  let imagemSrc = "";

  return (
    <Box
      className="flex flex-col gap-2 p-4"
      sx={{ backgroundColor: "var(--card)", borderRadius: 2, padding: 4 }}
    >
      <Grid container spacing={2}>
        <Grid size={10}>
          <Box sx={{ display: "flex", alignItems: "flex-start", flexDirection: "column", gap: 2 }}>
            <Avatar
              src={imagemSrc}
              alt={nome}
              sx={{ width: 100, height: 100 }}
            />
            <Box sx={{ ml: 2 }}>
              <Typography variant="h5" color="var(--foreground)" className="font-bold">{nome}</Typography>
              <Typography variant="body1" color="var(--muted)">{username}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid size={2} sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <Box 
            sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", alignItems: "center", justifyContent: "center" }}
          >
            <Typography variant="h6" color="var(--foreground)">{isProfileOwner ? (friendship ? friendship.length : 0) : (amigos ? amigos.length : 0)} Amigos</Typography>
          </Box>
        </Grid>
        <Grid size={12} sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          {!isProfileOwner && isUser && (
            <Button 
              variant="contained" 
              sx={{ 
                backgroundColor: podeAdicionarAmigo ? "var(--primary)" : "var(--muted)", 
                fontWeight: "bold",
                ':hover': {
                  opacity: 0.8,
                }
              }}

            >
              {podeAdicionarAmigo ? "Adicionar amigo" : "Amigo já adicionado"}
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
