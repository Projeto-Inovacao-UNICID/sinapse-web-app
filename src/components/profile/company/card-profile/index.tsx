"use client";

import { useState } from "react";
import { useSession } from "@/hooks/session/useSession";
import { useGetCompanyProfile } from "@/hooks/company/useCompanyProfile";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { CompanyProfileImage } from "@/components/profile/company/avatar";
import { EditCompanyProfileModal } from "@/components/profile/company/profile-edit-modal";

interface CompanyProfileCardProps {
  companyId: string;
}

export function CompanyProfileCard({ companyId }: CompanyProfileCardProps) {
  const { data: companyProfile, isLoading, isError, error } = useGetCompanyProfile(companyId);
  const { session } = useSession();
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const [defaultValues, setDefaultValues] = useState({
    nome: "",
    username: "",
    email: "",
    descricao: "",
    website: "",
  });

  const isProfileOwner = session?.id === companyId;
  const isCompany = session ? session.roles.includes('ROLE_COMPANY') : false;

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
        <Typography color="error">Erro ao carregar perfil da empresa</Typography>
      </Box>
    );
  }

  const {
    nome,
    username,
    email,
    descricao,
    website,
  } = companyProfile ?? {};

  const handleMessage = () => {
    router.push(`/conversas?companyId=${companyId}`);
  };

  const handleOpenModal = () => {
    setDefaultValues({
      nome: nome || "",
      username: username || "",
      email: email || "",
      descricao: descricao || "",
      website: website || "",
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box className="flex flex-col gap-2 p-4" sx={{ backgroundColor: "var(--card)", borderRadius: 2, padding: 4 }}>
      <Grid container spacing={2}>
        <Grid size={10}>
          <Box sx={{ display: "flex", alignItems: "flex-start", flexDirection: "column", gap: 2 }}>
            <CompanyProfileImage companyId={companyId} temImagem={companyProfile?.temImagem ?? false} />
            <Box sx={{ ml: 2 }}>
              <Typography variant="h5" color="var(--foreground)" className="font-bold">{nome}</Typography>
              <Typography variant="body1" color="var(--muted)">@{username}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid size={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h6" color="var(--foreground)">
          </Typography>
        </Grid>
        <Grid size={12} sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          {isProfileOwner && isCompany && (
            <Button
              onClick={handleOpenModal}
              sx={{ border: "1px solid var(--muted)", borderRadius: 2, color: "var(--foreground)", textTransform: "none" }}
            >
              Editar Perfil
            </Button>
          )}
          {!isProfileOwner && (
            <Button
              onClick={handleMessage}
              sx={{ border: "1px solid var(--muted)", borderRadius: 2, color: "var(--foreground)", textTransform: "none" }}
            >
              Mensagem
            </Button>
          )}
        </Grid>
      </Grid>

      {/* Modal de Edição */}
      <EditCompanyProfileModal
        open={openModal}
        onClose={handleCloseModal}
        companyId={companyId}
        defaultValues={defaultValues}
      />
    </Box>
  );
}
