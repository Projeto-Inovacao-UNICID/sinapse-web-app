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

export const softSkillsFormMetricsMock: FormFullMetricsDto = {
  formDefinitionId: "form-softskills-0001",
  submissionCount: 35,
  avgTotalScore: 78.4,
  medianTotalScore: 80,
  p25TotalScore: 72,
  p75TotalScore: 85,
  stdDevTotalScore: 6.2,
  minTotalScore: 60,
  maxTotalScore: 92,

  avgScoreByCategory: {
    SOFT_SKILL: 78.4
  },
  stdDevByCategory: {
    SOFT_SKILL: 6.1
  },
  categoryFillRate: {
    SOFT_SKILL: 0.97
  },

  passRate: 0.74,
  statusDistribution: {
    approved: 26,
    rejected: 9
  },
  scoreDistribution: {
    "60-69": 5,
    "70-79": 14,
    "80-89": 11,
    "90-100": 5
  },

  groupMetrics: [
    {
      grupoId: 101,
      submissions: 20,
      avgScore: 76,
      passRate: 0.7,
      share: 0.57
    },
    {
      grupoId: 102,
      submissions: 15,
      avgScore: 81,
      passRate: 0.8,
      share: 0.43
    }
  ],

  time: {
    avgLeadTime: "PT1H10M",
    medianLeadTime: "PT1H",
    leadTimeBuckets: {
      "0-30min": 4,
      "30min-1h": 10,
      "1h-2h": 15,
      "2h+": 6
    }
  },

  fieldMetrics: [
    {
      fieldId: "field-001",
      label: "Você se considera uma pessoa colaborativa? Dê um exemplo.",
      fieldType: "TEXT",
      fillRate: 0.97,
      optionDistribution: {}
    },
    {
      fieldId: "field-002",
      label: "Como você lida com feedbacks negativos?",
      fieldType: "TEXT",
      fillRate: 0.94,
      optionDistribution: {}
    },
    {
      fieldId: "field-003",
      label: "Você prefere trabalhar sozinho ou em equipe?",
      fieldType: "SELECT",
      fillRate: 1.0,
      optionDistribution: {
        team: 20,
        depends: 10,
        alone: 5
      }
    },
    {
      fieldId: "field-004",
      label: "De 0 a 10, qual seu nível de resiliência em ambientes de pressão?",
      fieldType: "NUMBER",
      fillRate: 0.91,
      avgNumericAnswer: 8.2,
      stdDevNumericAnswer: 1.1,
      optionDistribution: {}
    }
  ],

  topN: [candidateFormScoresMock[5]],
  bottomN: [candidateFormScoresMock[1]],
};


export const hardSkillsFormMetricsMock: FormFullMetricsDto = {
  formDefinitionId: "form-hardskills-0002",
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
    HARD_SKILL: 0.95
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
      fieldId: "field-005",
      label: "Qual linguagem você domina mais?",
      fieldType: "SELECT",
      fillRate: 1.0,
      optionDistribution: {
        js: 10,
        python: 8,
        java: 6,
        other: 4
      }
    },
    {
      fieldId: "field-006",
      label: "Descreva um projeto técnico que você desenvolveu e se orgulha.",
      fieldType: "TEXT",
      fillRate: 0.93,
      optionDistribution: {}
    },
    {
      fieldId: "field-007",
      label: "Quantos anos de experiência você tem com desenvolvimento web?",
      fieldType: "NUMBER",
      fillRate: 0.96,
      avgNumericAnswer: 3.8,
      stdDevNumericAnswer: 1.2,
      optionDistribution: {}
    },
    {
      fieldId: "field-008",
      label: "Você sabe utilizar sistemas de controle de versão (ex: Git)?",
      fieldType: "SELECT",
      fillRate: 0.98,
      optionDistribution: {
        expert: 20,
        basic: 6,
        no: 2
      }
    }
  ],

  topN: [candidateFormScoresMock[4]],

  bottomN: [candidateFormScoresMock[7]]
};
