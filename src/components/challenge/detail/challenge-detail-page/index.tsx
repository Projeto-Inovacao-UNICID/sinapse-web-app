'use client';

import { useGetChallengeById, useGetMyInscriptions } from "@/hooks/challenge/useChallenge";
import { useGetCompanyProfile } from "@/hooks/profile/company/useCompanyProfile";
import { useSession } from "@/hooks/session/useSession";
import { Box, Button, Container, useTheme } from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";

import { useGetChallengeStages } from "@/hooks/challenge/useStageChallenge";
import { ChallengeDescription } from "../challenge-description.tsx";
import { ChallengeDetailHeader } from "../challenge-detail-header";
import { ChallengeDetailInfo } from "../challenge-detail-info";
import { ChallengeStages } from "../challenge-stages";

interface ChallengeDetailPageProps { id: number; }

export default function ChallengeDetailPage({ id }: ChallengeDetailPageProps) {
  const { session } = useSession();
  const theme = useTheme();

  const { data: stages, isLoading: loadingStages } = useGetChallengeStages(id);
  const contStages = stages?.length ?? 0;
  const haveStages = stages && contStages > 0;
  const completedStageIds = stages?.filter(s => s.status === 'FECHADO').map(s => s.id) ?? [];

  const { data: inscricao } = useGetMyInscriptions(id);

  const currentId = inscricao?.estagioRecrutamentoId;

  const [currentStageId, setCurrentStageId] = useState<number | undefined>(currentId);

  const isCompanyUser = session?.roles.includes("ROLE_COMPANY") ?? false;

  const {
    data: challenge,
    isLoading: loadingChallenge,
    isError: errorChallenge
  } = useGetChallengeById(id);

  const empresaId = challenge?.empresaId ?? "";
  const {
    data: company,
    isLoading: loadingCompany,
    isError: errorCompany
  } = useGetCompanyProfile(empresaId);

  if (loadingChallenge) return <div>Carregando desafio…</div>;
  if (errorChallenge || !challenge) return <div>Erro ao carregar desafio.</div>;
  if (loadingCompany) return <div>Carregando empresa…</div>;
  if (errorCompany || !company) return <div>Erro ao carregar empresa.</div>;

  const status = !haveStages ? 'EM ESPERA' : challenge.status;
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
          avatarUrl: company.temImagem ? `/api/empresa/avatar/${company.id}` : undefined,
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
        end={format(new Date(challenge.dataFim), "dd/MM/yyyy")}
        status={status}
        statusColor={statusColor}
        statusBg={statusBg}
      />

      <ChallengeDescription text={challenge.descricao} />

      {haveStages &&
        <ChallengeStages
        stages={stages ?? []}
        completedStageIds={completedStageIds}
        currentStageId={currentStageId}
        onSelect={stage => setCurrentStageId(stage.id)}
      />
      }

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
