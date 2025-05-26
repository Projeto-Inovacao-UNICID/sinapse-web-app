// mockDesafioMetrics.ts
import { DesafioMetricsDto } from "@/types";

export const mockDesafioMetrics: DesafioMetricsDto = {
  inscritosPorEtapa: [
    { estagioRecrutamentoId: 1, totalInscritos: 120 },
    { estagioRecrutamentoId: 2, totalInscritos: 90 },
    { estagioRecrutamentoId: 3, totalInscritos: 60 },
    { estagioRecrutamentoId: 4, totalInscritos: 45 },
  ],
  tempoMedioAprovacao: [
    { estagioRecrutamentoId: 1, avgApprovalDays: 2.3 },
    { estagioRecrutamentoId: 2, avgApprovalDays: 3.1 },
    { estagioRecrutamentoId: 3, avgApprovalDays: 4.5 },
    { estagioRecrutamentoId: 4, avgApprovalDays: 5.0 },
  ],
  taxaReprovacao: [
    { estagioRecrutamentoId: 1, rejectionRate: 0.1 },
    { estagioRecrutamentoId: 2, rejectionRate: 0.25 },
    { estagioRecrutamentoId: 3, rejectionRate: 0.4 },
    { estagioRecrutamentoId: 4, rejectionRate: 0.6 },
  ],
  totalInscritos: 200,
  totalConcluidos: 80,
  totalReprovados: 60,
  taxaConclusao: 0.4,
  mediaAvaliacao: 4.2,
  inscritosSolo: 120,
  inscritosEquipe: 80,
  metricasPorLocalizacao: [
    {
      localizacao: "São Paulo",
      totalInscritos: 80,
      totalConcluidos: 30,
      totalReprovados: 20,
      taxaReprovacao: 0.25,
      tempoMedioAprovacaoDays: 3.5,
    },
    {
      localizacao: "Rio de Janeiro",
      totalInscritos: 60,
      totalConcluidos: 25,
      totalReprovados: 15,
      taxaReprovacao: 0.2,
      tempoMedioAprovacaoDays: 2.8,
    },
    {
      localizacao: "Minas Gerais",
      totalInscritos: 60,
      totalConcluidos: 25,
      totalReprovados: 25,
      taxaReprovacao: 0.42,
      tempoMedioAprovacaoDays: 4.1,
    },
  ],
  pipelineDropoff: 0.55,
  percSolo: 0.6,
  percEquipe: 0.4,
};
