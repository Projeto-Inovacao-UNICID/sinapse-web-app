import { RejectionRateDto, StageApplicantCountDto } from "@/types";


// AvgApprovalTimeDto.ts
export interface AvgApprovalTimeDto {
  estagioRecrutamentoId: number;
  avgApprovalDays: number;
}

// LocationMetricsDto.ts
export interface LocationMetricsDto {
  localizacao: string;
  totalInscritos: number;
  totalConcluidos: number;
  totalReprovados: number;
  taxaReprovacao: number;
  tempoMedioAprovacaoDays: number;
}

// DesafioMetricsDto.ts
export interface DesafioMetricsDto {
  inscritosPorEtapa: StageApplicantCountDto[];
  tempoMedioAprovacao: AvgApprovalTimeDto[];
  taxaReprovacao: RejectionRateDto[];

  totalInscritos: number;
  totalConcluidos: number;
  totalReprovados: number;
  taxaConclusao: number;

  mediaAvaliacao: number;
  inscritosSolo: number;
  inscritosEquipe: number;

  metricasPorLocalizacao: LocationMetricsDto[];

  pipelineDropoff: number;
  percSolo: number;
  percEquipe: number;
}
