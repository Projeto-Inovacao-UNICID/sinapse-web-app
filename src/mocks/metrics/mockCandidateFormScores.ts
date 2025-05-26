import { CandidateFormScoreDto } from "@/types";

export const candidateFormScoresMock: CandidateFormScoreDto[] = [
  {
    submissionId: "a1b2c3d4-e5f6-7890-abcd-000000000001",
    usuarioId: "user-1111-aaaa-0001",
    grupoId: 101,
    totalScore: 88,
    categoryScores: {
      SOFT_SKILL: 90,
      HARD_SKILL: 85
    },
    approved: true,
    submittedAt: "2025-05-25T14:30:00"
  },
  {
    submissionId: "a1b2c3d4-e5f6-7890-abcd-000000000002",
    usuarioId: "user-2222-bbbb-0002",
    grupoId: 101,
    totalScore: 67,
    categoryScores: {
      SOFT_SKILL: 70,
      HARD_SKILL: 64
    },
    approved: false,
    submittedAt: "2025-05-25T15:45:00"
  },
  {
    submissionId: "a1b2c3d4-e5f6-7890-abcd-000000000003",
    usuarioId: "user-3333-cccc-0003",
    grupoId: 102,
    totalScore: 93,
    categoryScores: {
      SOFT_SKILL: 95,
      HARD_SKILL: 91
    },
    approved: true,
    submittedAt: "2025-05-26T09:20:00"
  },
  {
    submissionId: "a1b2c3d4-e5f6-7890-abcd-000000000004",
    usuarioId: "user-4444-dddd-0004",
    grupoId: 101,
    totalScore: 75,
    categoryScores: {
      SOFT_SKILL: 78,
      HARD_SKILL: 72
    },
    approved: true,
    submittedAt: "2025-05-26T10:15:00"
  },
  {
    submissionId: "a1b2c3d4-e5f6-7890-abcd-000000000005",
    usuarioId: "user-5555-eeee-0005",
    grupoId: 103,
    totalScore: 59,
    categoryScores: {
      SOFT_SKILL: 60,
      HARD_SKILL: 58
    },
    approved: false,
    submittedAt: "2025-05-26T11:30:00"
  },
  {
    submissionId: "a1b2c3d4-e5f6-7890-abcd-000000000006",
    usuarioId: "user-6666-ffff-0006",
    grupoId: 102,
    totalScore: 81,
    categoryScores: {
      SOFT_SKILL: 83,
      HARD_SKILL: 79
    },
    approved: true,
    submittedAt: "2025-05-26T12:00:00"
  },
  {
    submissionId: "a1b2c3d4-e5f6-7890-abcd-000000000007",
    usuarioId: "user-7777-gggg-0007",
    grupoId: 103,
    totalScore: 91,
    categoryScores: {
      SOFT_SKILL: 89,
      HARD_SKILL: 93
    },
    approved: true,
    submittedAt: "2025-05-26T13:45:00"
  },
  {
    submissionId: "a1b2c3d4-e5f6-7890-abcd-000000000008",
    usuarioId: "user-8888-hhhh-0008",
    grupoId: 101,
    totalScore: 72,
    categoryScores: {
      SOFT_SKILL: 74,
      HARD_SKILL: 70
    },
    approved: false,
    submittedAt: "2025-05-26T14:10:00"
  },
  {
    submissionId: "a1b2c3d4-e5f6-7890-abcd-000000000009",
    usuarioId: "user-9999-iiii-0009",
    grupoId: 102,
    totalScore: 86,
    categoryScores: {
      SOFT_SKILL: 87,
      HARD_SKILL: 85
    },
    approved: true,
    submittedAt: "2025-05-26T15:00:00"
  },
  {
    submissionId: "a1b2c3d4-e5f6-7890-abcd-000000000010",
    usuarioId: "user-0000-jjjj-0010",
    grupoId: 103,
    totalScore: 64,
    categoryScores: {
      SOFT_SKILL: 65,
      HARD_SKILL: 63
    },
    approved: false,
    submittedAt: "2025-05-26T16:20:00"
  }
];
