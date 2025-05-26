import { FormMetricsDto } from "@/types";

export const mockFormMetrics: FormMetricsDto = {
  formDefinitionId: "11111111-1111-1111-1111-111111111111",
  submissionCount: 120,
  avgTotalScore: 76.4,
  avgScoreByCategory: {
    "Conhecimento Técnico": 80.5,
    "Habilidades Interpessoais": 72.3,
    "Experiência Profissional": 76.8,
  },
  passRate: 0.65,
  scoreDistribution: {
    "0-50": 15,
    "51-70": 40,
    "71-85": 45,
    "86-100": 20,
  },
};
