'use client';

import { useUserProfileImage } from "@/hooks/user/useUserProfile";
import { Avatar, CircularProgress } from "@mui/material";


interface UserProfileImageProps {
  userId: string;
  temImagem: boolean;
}

export function UserProfileImage({ userId, temImagem }: UserProfileImageProps) {
  const { data: userProfileImage, isLoading, isError } = useUserProfileImage(userId, temImagem);

  if (isLoading) {
    return <CircularProgress size={20} sx={{ color: "var(--muted)" }} />;
  }

  if (isError) {
    return <div>Erro ao carregar imagem</div>; // Pode personalizar o erro
  }

  return (
    <Avatar src={temImagem ? userProfileImage : ""} alt="Imagem do usuário" sx={{ width: 100, height: 100 }} />
  );;
}

