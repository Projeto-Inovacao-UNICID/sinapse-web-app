// mockSeguidorMetrics.ts
import { SeguidorMetricsDto } from "@/types";

export const mockSeguidorMetrics: SeguidorMetricsDto = {
  empresaId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  totalFollowers: 1500,
  newFollowersLast7d: 120,
  newFollowersLast30d: 420,
  followersParticipated: 650,
  participationRate: 0.4333, // 650 / 1500
  totalApplicationsByFollowers: 1100,
  companyApplications: 300,
  ratioCompanyApplications: 0.2727, // 300 / 1100
  avgApplicationsPerFollower: 0.73, // 1100 / 1500
  activeFollowersLast7d: 500,
  recencyRate: 0.3333, // 500 / 1500
  avgChallengesPerFollowerLast30d: 1.2,

  topChallengesByFollowers: [
    { desafioId: 1, titulo: "Hackathon de Inovação 2025", participations: 230 },
    { desafioId: 2, titulo: "Ideathon Sustentável", participations: 190 },
    { desafioId: 3, titulo: "Maratona Tech Universitária", participations: 160 },
  ],

  participationsByModalidade: [
    { modalidade: "Hackathon", participations: 500 },
    { modalidade: "Ideathon", participations: 350 },
    { modalidade: "Bootcamp", participations: 150 },
    { modalidade: "Desafio Técnico", participations: 100 },
  ],
};
