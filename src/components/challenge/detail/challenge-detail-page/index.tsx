// src/components/challenge/detail/challenge-detail-page/index.tsx
'use client';

import React from "react";
import { Box, Container, Button } from "@mui/material";
import { useSession } from "@/hooks/session/useSession";
import { useGetChallengeById } from "@/hooks/challenge/useChallenge";
import { useGetCompanyProfile } from "@/hooks/profile/company/useCompanyProfile";
import { format } from "date-fns";
import { useTheme } from "@mui/material";

import { ChallengeDetailHeader } from "../challenge-detail-header";
import { ChallengeDetailInfo }   from "../challenge-detail-info";
import { ChallengeDescription } from "../challenge-description.tsx";
import { useGetChallengeStages } from "@/hooks/challenge/useStageChallenge";

interface ChallengeDetailPageProps { id: number; }

export default function ChallengeDetailPage({ id }: ChallengeDetailPageProps) {
  const { session } = useSession();
  const { data: stages, isLoading: loadingStages } = useGetChallengeStages(id);

  const contStages = stages?.length ?? 0;
  const haveStages = contStages > 0;

  const isCompanyUser = session?.roles.includes("ROLE_COMPANY") ?? false;
  const theme = useTheme();

  // 1) Carrega o desafio
  const {
    data: challenge,
    isLoading: loadingChallenge,
    isError:   errorChallenge
  } = useGetChallengeById(id);

  // 2) Sempre chamamos o hook de empresa, mas só executamos quando tivermos challenge.empresaId
  const empresaId = challenge?.empresaId ?? "";
  const {
    data: company,
    isLoading: loadingCompany,
    isError:   errorCompany
  } = useGetCompanyProfile(empresaId);

  // 3) Controle de loading / error
  if (loadingChallenge)   return <div>Carregando desafio…</div>;
  if (errorChallenge || !challenge)
                           return <div>Erro ao carregar desafio.</div>;
  if (loadingCompany)     return <div>Carregando empresa…</div>;
  if (errorCompany || !company)
                           return <div>Erro ao carregar empresa.</div>;

  const status = !haveStages ? 'EM ESPERA' : challenge.status;

  // cores do status
  const statusColor = status === "ABERTO"
    ? theme.palette.success.main
    : status === "FECHADO"
      ? theme.palette.error.main
      : theme.palette.warning.main;
  const statusBg = status === "ABERTO"
    ? theme.palette.success.light
    : status === "FECHADO"
      ? theme.palette.error.light
      : theme.palette.warning.light;

  return (
    <Container maxWidth="md" sx={{ pt: 4, pb: 6 }}>
      <ChallengeDetailHeader
        company={{
          id: company.id,
          nome: company.nome,
          avatarUrl: company.temImagem
            ? `/api/empresa/avatar/${company.id}`
            : undefined,
          username: company.username
        }}
        onFollow={() => {}}
        isFollowing={false}
        isCompanyUser={isCompanyUser}
      />

      <ChallengeDetailInfo
        title={challenge.titulo}
        area={challenge.modalidade}
        location="—"
        start={format(new Date(challenge.dataInicio), "dd/MM/yyyy")}
        end={format(new Date(challenge.dataFim),   "dd/MM/yyyy")}
        status={status}
        statusColor={statusColor}
        statusBg={statusBg}
      />

      <ChallengeDescription text={challenge.descricao} />

      {/* 
      <ChallengeStages
        stages={challenge.stages}
        completedStageIds={challenge.completedStageIds}
        currentStageId={challenge.currentStageId}
        onSubmitComment={(stageId, text) => {}}
      /> 
      */}

      {isCompanyUser && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
          <Button variant="outlined">Salvar</Button>
          <Button variant="contained" sx={{ bgcolor: "var(--primary)", textTransform: "none" }}>
            Bora pro Desafio!
          </Button>
        </Box>
      )}
    </Container>
  );
}
