// Arquivo enviado ou visualizado em um desafio
export interface GroupFileResponseDto {
  id: number;
  nomeArquivo: string;
  tipoArquivo: string;
  tamanhoArquivo: number;
  uploadedAt: string;
  urlDownload: string;
  urlView: string;
  mimeDetectado: string;
  checksum: string;
}

// Tempo médio de aprovação por etapa
export interface AverageApprovalTimeDto {
  estagioRecrutamentoId: number;
  avgApprovalDays: number;
}

// DTO de aplicação para uma etapa de recrutamento
export interface StageApplicationDto {
  mensagem: string;
}

// Contagem agregada de desafios por status
export interface ChallengeCountDto {
  criados: number;
  ativos: number;
  encerrados: number;
}

// Criação de um desafio
export interface ChallengeCreateDto {
  titulo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  interno?: boolean;
  modalidade: string;
}

// Métricas de um desafio (etapas, tempo, taxa de reprovação)
export interface ChallengeMetricsDto {
  inscritosPorEtapa: StageApplicantCountDto[];
  tempoMedioAprovacao: AverageApprovalTimeDto[];
  taxaReprovacao: RejectionRateDto[];
}

// Atualização parcial de um desafio
export interface ChallengePatchDto {
  titulo?: string;
  descricao?: string;
  dataInicio?: string;
  dataFim?: string;
  status?: string;
  interno?: boolean;
  modalidade?: string;
}

// Detalhes de um desafio
export interface ChallengeResponseDto {
  id: number;
  empresaId: string;
  funcionarioId: string | null;
  titulo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  status: string;
  interno: boolean;
  modalidade: string;
  createdAt: string;
  updatedAt: string;
}

// Contagem de desafios por usuário
export interface UserChallengeCountDto {
  participados: number;
  ativos: number;
  concluidos: number;
}

// Grupo vencedor do desafio
export interface ChallengeWinnerDto {
  id: number;
  grupoId: number;
  createdAt: string;
}

// Criação de etapa de recrutamento
export interface RecruitmentStageCreateDto {
  estagio_atual: string;
  status: string;
  anotacoes: string;
  ordem: number;
  formDefinitionId?: string;
}

// Atualização parcial de uma etapa
export interface RecruitmentStagePatchDto {
  estagio_atual?: string;
  status?: string;
  anotacoes?: string;
}

// Detalhes da etapa de recrutamento
export interface RecruitmentStageResponseDto {
  id: number;
  desafioId: number;
  empresaId: string;
  estagioAtual: string;
  status: string;
  anotacoes: string;
  formDefinitionId: string | null;
  createdAt: string;
  updatedAt: string;
}

// DTO para mover participantes de forma coletiva
export interface BatchMoveDto {
  participanteIds: number[]|string[];
  novoEstagioId: number;
  mensagem: string;
}

// Interface de resposta paginada
export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// Criação de participante
export interface ParticipantCreateDto {
  grupo_id: number;
  estagio_recrutamento_id: number;
  status: string;
  avaliacao: number;
  feedback: string;
  created_at: string;
  updated_at: string;
}

// Participante retornado
export interface ParticipantResponseDto {
  id: number;
  grupoId: number | null;
  usuarioId: string;
  estagioRecrutamentoId: number;
  status: string;
  avaliacao: number;
  feedback: string;
  createdAt: string;
  updatedAt: string;
}

// Participante no grid da interface
export interface ParticipantGridDto {
  participanteId: number;
  grupoId: number;
  grupoNome: string;
  status: string;
  avaliacao: number;
  feedback: string;
  ordemEtapa: number;
  nomeEtapa: string;
  estagioId: number;
  createdAt: string;
}

// Taxa de reprovação por etapa
export interface RejectionRateDto {
  estagioRecrutamentoId: number;
  rejectionRate: number;
}

// Reprovação em lote
export interface BatchRejectionDto {
  participanteIds: number[];
  motivo: string;
}

// Total de inscritos por etapa
export interface StageApplicantCountDto {
  estagioRecrutamentoId: number;
  totalInscritos: number;
}

export type ChallengeTypes =
  | 'marketing'
  | 'desenvolvimento'
  | 'processos'
  | 'analise_de_dados'
  | 'design'
  | 'produto'
  | 'financas'
  | 'rh'
  | 'vendas'
  | 'estrategia';

export const challengeTypesLabels: Record<ChallengeTypes, string> = {
  marketing: 'Marketing',
  desenvolvimento: 'Desenvolvimento',
  processos: 'Processos',
  analise_de_dados: 'Análise de Dados',
  design: 'Design',
  produto: 'Produto',
  financas: 'Finanças',
  rh: 'Recursos Humanos',
  vendas: 'Vendas',
  estrategia: 'Estratégia',
};
