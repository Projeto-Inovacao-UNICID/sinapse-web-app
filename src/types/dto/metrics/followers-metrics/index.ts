// seguidor-metrics.dto.ts

// Participações por modalidade (ex: "Hackathon", "Ideathon", etc.)
export interface ModalidadeMetricsDto {
  modalidade: string;
  participations: number;
}

// Desafios mais participados pelos seguidores
export interface TopChallengeDto {
  desafioId: number;
  titulo: string;
  participations: number;
}

// Métricas completas dos seguidores de uma empresa
export interface SeguidorMetricsDto {
  empresaId: string; // UUID como string
  totalFollowers: number;
  newFollowersLast7d: number;
  newFollowersLast30d: number;
  followersParticipated: number;
  participationRate: number;
  totalApplicationsByFollowers: number;
  companyApplications: number;
  ratioCompanyApplications: number;
  avgApplicationsPerFollower: number;
  activeFollowersLast7d: number;
  recencyRate: number;
  avgChallengesPerFollowerLast30d: number;

  topChallengesByFollowers: TopChallengeDto[];
  participationsByModalidade: ModalidadeMetricsDto[];
}
