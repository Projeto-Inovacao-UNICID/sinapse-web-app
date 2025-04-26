'use client';

import { useGetCompanyProfileImage } from "@/hooks/company/useCompanyProfile";
import { Avatar, CircularProgress } from "@mui/material";


interface CompanyProfileProps {
  companyId: string;
  temImagem: boolean;
}

export function CompanyProfileImage({ companyId, temImagem }: CompanyProfileProps) {
  const { data: companyProfileImage, isLoading, isError } = useGetCompanyProfileImage(companyId, temImagem);

  if (isLoading) {
    return <CircularProgress size={20} sx={{ color: "var(--muted)" }} />;
  }

  if (isError) {
    return <div>Erro ao carregar imagem</div>; // Pode personalizar o erro
  }

  return (
    <Avatar src={temImagem ? companyProfileImage : ""} alt="Imagem do usuário" sx={{ width: 100, height: 100 }} />
  );;
}

