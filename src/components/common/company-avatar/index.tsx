'use client';

import { useGetCompanyProfileImage } from "@/hooks/profile/company/useCompanyProfile";
import { Avatar, CircularProgress } from "@mui/material";


interface CompanyProfileProps {
  companyId: string;
  temImagem: boolean;
}

export function CompanyProfileImage({ companyId, temImagem }: CompanyProfileProps) {
  const { data: companyProfileImage, isLoading, isError } = useGetCompanyProfileImage(companyId, temImagem);

  if (isLoading) {
    return <Avatar sx={{ width: "100%", height: "100%" }}></Avatar>;
  }

  if (isError) {
    return <div>Erro ao carregar imagem</div>;
  }

  return (
    <Avatar
      src={temImagem ? companyProfileImage : ""}
      alt="Imagem da empresa"
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );;
}

