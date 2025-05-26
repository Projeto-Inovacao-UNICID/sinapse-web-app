import { CandidateFormScoreDto } from "@/types";

export const mockCandidateFormScores: CandidateFormScoreDto[] = [
  {
    submissionId: "sub-001",
    usuarioId: "user-001",
    grupoId: 101,
    totalScore: 85.6,
    categoryScores: {
      "Conhecimento Técnico": 90,
      "Habilidades Interpessoais": 82,
      "Experiência Profissional": 85,
    },
    approved: true,
    submittedAt: "2025-05-15T14:23:00",
  },
  {
    submissionId: "sub-002",
    usuarioId: "user-002",
    grupoId: 102,
    totalScore: 59.4,
    categoryScores: {
      "Conhecimento Técnico": 60,
      "Habilidades Interpessoais": 55,
      "Experiência Profissional": 63,
    },
    approved: false,
    submittedAt: "2025-05-14T10:05:00",
  },
  // ...mais candidatos se necessário
];
