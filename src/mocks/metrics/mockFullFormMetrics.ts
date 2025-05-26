import { FormFullMetricsDto } from "@/types";
import { candidateFormScoresMock } from "./mockCandidateFormScores";

export const formFullMetricsMock: FormFullMetricsDto = {
  formDefinitionId: "form-soft-hard-001",
  submissionCount: 3,
  avgTotalScore: 82.7,
  medianTotalScore: 88,
  p25TotalScore: 67,
  p75TotalScore: 93,
  stdDevTotalScore: 13,
  minTotalScore: 67,
  maxTotalScore: 93,

  avgScoreByCategory: {
    SOFT_SKILL: 85,
    HARD_SKILL: 80
  },
  stdDevByCategory: {
    SOFT_SKILL: 12,
    HARD_SKILL: 10
  },
  categoryFillRate: {
    SOFT_SKILL: 1.0,
    HARD_SKILL: 1.0
  },

  passRate: 0.6667,
  statusDistribution: {
    APPROVED: 2,
    REJECTED: 1
  },
  scoreDistribution: {
    "60-69": 1,
    "80-89": 1,
    "90-100": 1
  },

  groupMetrics: [
    {
      grupoId: 101,
      submissions: 2,
      avgScore: 77.5,
      passRate: 0.5,
      share: 0.6667
    },
    {
      grupoId: 102,
      submissions: 1,
      avgScore: 93,
      passRate: 1,
      share: 0.3333
    }
  ],

  time: {
    avgLeadTime: "PT1H5M",
    medianLeadTime: "PT1H",
    leadTimeBuckets: {
      "0-30min": 0,
      "30min-1h": 1,
      "1h-2h": 2
    }
  },

  fieldMetrics: [
    {
      fieldId: "field-1",
      label: "Descreva uma situação em que você precisou lidar com um conflito em equipe. Como agiu?",
      fieldType: "TEXT",
      fillRate: 1.0,
      optionDistribution: {}
    },
    {
      fieldId: "field-2",
      label: "Como você avalia sua empatia ao lidar com colegas de trabalho?",
      fieldType: "SELECT",
      fillRate: 1.0,
      optionDistribution: {
        high: 2,
        medium: 1
      }
    },
    {
      fieldId: "field-3",
      label: "De 0 a 10, como você avalia sua capacidade de se comunicar com clareza?",
      fieldType: "NUMBER",
      fillRate: 1.0,
      avgNumericAnswer: 8.3,
      stdDevNumericAnswer: 1.2,
      optionDistribution: {}
    },
    {
      fieldId: "field-6",
      label: "Qual seu nível de experiência com controle de versão (ex: Git)?",
      fieldType: "SELECT",
      fillRate: 1.0,
      optionDistribution: {
        advanced: 2,
        intermediate: 1
      }
    }
  ],

  topN: [candidateFormScoresMock[2], candidateFormScoresMock[0]],
  bottomN: [candidateFormScoresMock[1]]
};
