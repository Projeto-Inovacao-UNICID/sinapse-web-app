// CandidateFormScoreDto.ts
export interface CandidateFormScoreDto {
  submissionId: string; // UUID
  usuarioId: string;    // UUID
  grupoId: number;
  totalScore: number;
  categoryScores: Record<string, number>;
  approved: boolean;
  submittedAt: string; // ISO 8601 date string (LocalDateTime)
}

// FormFieldMetricsDto.ts
export interface FormFieldMetricsDto {
  fieldId: string; // UUID
  label: string;
  fieldType: string;

  fillRate: number;

  avgNumericAnswer?: number;
  stdDevNumericAnswer?: number;

  optionDistribution: Record<string, number>;
}

// GroupMetricsDto.ts
export interface GroupMetricsDto {
  grupoId: number;
  submissions: number;
  avgScore: number;
  passRate: number;
  share: number;
}

// TimeMetricsDto.ts
export interface TimeMetricsDto {
  avgLeadTime: string;    // ISO 8601 duration (e.g., "PT1H30M")
  medianLeadTime: string; // ISO 8601 duration
  leadTimeBuckets: Record<string, number>;
}

// FormMetricsDto.ts
export interface FormMetricsDto {
  formDefinitionId: string; // UUID
  submissionCount: number;
  avgTotalScore: number;
  avgScoreByCategory: Record<string, number>;
  passRate: number;
  scoreDistribution: Record<string, number>;
}

// FormFullMetricsDto.ts
export interface FormFullMetricsDto {
  formDefinitionId: string; // UUID
  submissionCount: number;
  avgTotalScore: number;
  medianTotalScore: number;
  p25TotalScore: number;
  p75TotalScore: number;
  stdDevTotalScore: number;
  minTotalScore: number;
  maxTotalScore: number;

  avgScoreByCategory: Record<string, number>;
  stdDevByCategory: Record<string, number>;
  categoryFillRate: Record<string, number>;

  passRate: number;
  statusDistribution: Record<string, number>;
  scoreDistribution: Record<string, number>;

  groupMetrics: GroupMetricsDto[];

  time: TimeMetricsDto;

  fieldMetrics: FormFieldMetricsDto[];

  topN: CandidateFormScoreDto[];
  bottomN: CandidateFormScoreDto[];
}
