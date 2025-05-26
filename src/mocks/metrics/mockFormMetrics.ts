import { FormMetricsDto } from "@/types";

export const formMetricsMock: FormMetricsDto = {
  formDefinitionId: "form-soft-hard-001",
  submissionCount: 3,
  avgTotalScore: 82.7,
  avgScoreByCategory: {
    SOFT_SKILL: 85.0,
    HARD_SKILL: 80.0
  },
  passRate: 0.6667,
  scoreDistribution: {
    "60-69": 1,
    "80-89": 1,
    "90-100": 1
  }
};
