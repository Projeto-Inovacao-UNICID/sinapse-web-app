import { FormFullMetricsDto } from "@/types";
import { candidateFormScoresMock } from "./mockCandidateFormScores";

export const softSkillsFormMetricsMock: FormFullMetricsDto = {
  formDefinitionId: "form-softskills-0001",
  submissionCount: 35,
  avgTotalScore: 79.2,
  medianTotalScore: 80,
  p25TotalScore: 74,
  p75TotalScore: 86,
  stdDevTotalScore: 5.8,
  minTotalScore: 62,
  maxTotalScore: 91,

  avgScoreByCategory: {
    SOFT_SKILL: 79.2
  },
  stdDevByCategory: {
    SOFT_SKILL: 5.8
  },
  categoryFillRate: {
    SOFT_SKILL: 0.96
  },

  passRate: 0.77,
  statusDistribution: {
    approved: 27,
    rejected: 8
  },
  scoreDistribution: {
    "60-69": 6,
    "70-79": 12,
    "80-89": 13,
    "90-100": 4
  },

  groupMetrics: [
    {
      grupoId: 201,
      submissions: 18,
      avgScore: 77,
      passRate: 0.72,
      share: 0.51
    },
    {
      grupoId: 202,
      submissions: 17,
      avgScore: 81.5,
      passRate: 0.82,
      share: 0.49
    }
  ],

  time: {
    avgLeadTime: "PT1H5M",
    medianLeadTime: "PT1H",
    leadTimeBuckets: {
      "0-30min": 5,
      "30min-1h": 9,
      "1h-2h": 16,
      "2h+": 5
    }
  },

  fieldMetrics: [
    {
      fieldId: "589534ad-4e24-4540-9dc8-277dd7af99d4",
      label: "Qual das opções melhor descreve seu estilo de liderança?",
      fieldType: "SELECT",
      fillRate: 0.97,
      optionDistribution: {
        authoritative: 10,
        collaborative: 20,
        avoidant: 5
      }
    },
    {
      fieldId: "67100293-db35-46fd-8b78-6952b7041cdb",
      label: "Descreva uma situação em que você precisou lidar com um conflito em equipe. Como agiu?",
      fieldType: "TEXT",
      fillRate: 0.94,
      optionDistribution: {}
    },
    {
      fieldId: "a21d2da8-e542-4b82-bf8c-b8da86072121",
      label: "De 0 a 10, como você avalia sua capacidade de se comunicar com clareza?",
      fieldType: "NUMBER",
      fillRate: 0.89,
      avgNumericAnswer: 8.1,
      stdDevNumericAnswer: 1.2,
      optionDistribution: {}
    },
    {
      fieldId: "ed5f849a-60fd-4191-bdc4-d32058e2ed0c",
      label: "Como você avalia sua empatia ao lidar com colegas de trabalho?",
      fieldType: "SELECT",
      fillRate: 0.95,
      optionDistribution: {
        high: 18,
        medium: 12,
        low: 5
      }
    }
  ],

  topN: [candidateFormScoresMock[0]],
  bottomN: [candidateFormScoresMock[1]]
};

export const hardSkillsFormMetricsMock: FormFullMetricsDto = {
  formDefinitionId: "form-hardskills-0001",
  submissionCount: 28,
  avgTotalScore: 82.3,
  medianTotalScore: 83,
  p25TotalScore: 78,
  p75TotalScore: 87,
  stdDevTotalScore: 4.5,
  minTotalScore: 70,
  maxTotalScore: 92,

  avgScoreByCategory: {
    HARD_SKILL: 82.3
  },
  stdDevByCategory: {
    HARD_SKILL: 4.5
  },
  categoryFillRate: {
    HARD_SKILL: 0.97
  },

  passRate: 0.82,
  statusDistribution: {
    approved: 23,
    rejected: 5
  },
  scoreDistribution: {
    "70-79": 6,
    "80-89": 15,
    "90-100": 7
  },

  groupMetrics: [
    {
      grupoId: 101,
      submissions: 18,
      avgScore: 80,
      passRate: 0.78,
      share: 0.64
    },
    {
      grupoId: 103,
      submissions: 10,
      avgScore: 85.5,
      passRate: 0.9,
      share: 0.36
    }
  ],

  time: {
    avgLeadTime: "PT50M",
    medianLeadTime: "PT45M",
    leadTimeBuckets: {
      "0-30min": 5,
      "30min-1h": 18,
      "1h-2h": 5
    }
  },

  fieldMetrics: [
    {
      fieldId: "31bb1900-9ca2-4a06-bf32-ea69182242eb",
      label: "Com qual linguagem de programação você tem mais familiaridade? Explique sua experiência com ela.",
      fieldType: "TEXT",
      fillRate: 0.96,
      optionDistribution: {}
    },
    {
      fieldId: "3b59d891-9895-49d6-a200-bcc5e59d5ae7",
      label: "Descreva um desafio técnico que você enfrentou recentemente e como resolveu.",
      fieldType: "TEXT",
      fillRate: 0.93,
      optionDistribution: {}
    },
    {
      fieldId: "454f3210-b341-45f7-abcd-4cead32d05b9",
      label: "Como você classificaria seu conhecimento sobre estruturas de dados (listas, árvores, grafos, etc)?",
      fieldType: "SELECT",
      fillRate: 1.0,
      optionDistribution: {
        advanced: 12,
        intermediate: 10,
        basic: 6
      }
    },
    {
      fieldId: "7eefc7a6-42b7-4231-a253-51bc846052ae",
      label: "De 0 a 10, como você avalia sua habilidade de resolver problemas com lógica de programação?",
      fieldType: "NUMBER",
      fillRate: 0.96,
      avgNumericAnswer: 8.4,
      stdDevNumericAnswer: 1.1,
      optionDistribution: {}
    },
    {
      fieldId: "c199abac-0258-4b11-bf82-92568a4f5af5",
      label: "Qual seu nível de experiência com controle de versão (ex: Git)?",
      fieldType: "SELECT",
      fillRate: 0.98,
      optionDistribution: {
        advanced: 16,
        intermediate: 8,
        basic: 4
      }
    }
  ],

  topN: [candidateFormScoresMock[6], candidateFormScoresMock[7]],
  bottomN: [candidateFormScoresMock[8], candidateFormScoresMock[9]]
};
