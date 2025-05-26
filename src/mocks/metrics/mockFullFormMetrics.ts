import { FormFullMetricsDto } from "@/types";
import { mockCandidateFormScores } from "./mockCandidateFormScores";


export const mockFormFullMetrics: FormFullMetricsDto = {
  formDefinitionId: "11111111-1111-1111-1111-111111111111",
  submissionCount: 120,
  avgTotalScore: 76.4,
  medianTotalScore: 77,
  p25TotalScore: 65,
  p75TotalScore: 89,
  stdDevTotalScore: 10.3,
  minTotalScore: 42,
  maxTotalScore: 98,

  avgScoreByCategory: {
    "Conhecimento Técnico": 80.5,
    "Habilidades Interpessoais": 72.3,
    "Experiência Profissional": 76.8,
  },
  stdDevByCategory: {
    "Conhecimento Técnico": 8.1,
    "Habilidades Interpessoais": 9.2,
    "Experiência Profissional": 7.6,
  },
  categoryFillRate: {
    "Conhecimento Técnico": 1.0,
    "Habilidades Interpessoais": 0.98,
    "Experiência Profissional": 0.95,
  },

  passRate: 0.65,
  statusDistribution: {
    aprovado: 78,
    reprovado: 42,
  },
  scoreDistribution: {
    "0-50": 15,
    "51-70": 40,
    "71-85": 45,
    "86-100": 20,
  },

  groupMetrics: [
    {
      grupoId: 101,
      submissions: 40,
      avgScore: 79.1,
      passRate: 0.7,
      share: 0.33,
    },
    {
      grupoId: 102,
      submissions: 30,
      avgScore: 74.3,
      passRate: 0.6,
      share: 0.25,
    },
    {
      grupoId: 103,
      submissions: 50,
      avgScore: 75.5,
      passRate: 0.64,
      share: 0.42,
    },
  ],

  time: {
    avgLeadTime: "PT1H45M",
    medianLeadTime: "PT1H30M",
    leadTimeBuckets: {
      "0-30min": 10,
      "31-60min": 25,
      "61-90min": 40,
      "91-120min": 30,
      "120min+": 15,
    },
  },

  fieldMetrics: [
    {
      fieldId: "field-001",
      label: "Quanto tempo de experiência você tem com React?",
      fieldType: "number",
      fillRate: 0.98,
      avgNumericAnswer: 2.3,
      stdDevNumericAnswer: 0.8,
      optionDistribution: {},
    },
    {
      fieldId: "field-002",
      label: "Você já trabalhou com metodologias ágeis?",
      fieldType: "select",
      fillRate: 1.0,
      optionDistribution: {
        "Sim": 100,
        "Não": 20,
      },
    },
    {
      fieldId: "field-003",
      label: "Nível de proficiência em comunicação",
      fieldType: "radio",
      fillRate: 0.95,
      optionDistribution: {
        "Alta": 70,
        "Média": 40,
        "Baixa": 10,
      },
    },
  ],

  topN: mockCandidateFormScores.slice(0, 1),
  bottomN: mockCandidateFormScores.slice(1, 2),
};
