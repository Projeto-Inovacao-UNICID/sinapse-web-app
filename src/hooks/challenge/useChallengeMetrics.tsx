import { useQuery } from "@tanstack/react-query";
import { challengeMetricsService } from "@/service/challenge/ChallengeMatricsService";
import type { ChallengeMetricsDto } from "@/types";

// Hook para obter as métricas de um desafio
export function useGetChallengeMetrics(challengeId: number) {
  return useQuery<ChallengeMetricsDto>({
    queryKey: ["challengeMetrics", challengeId],
    queryFn: () => challengeMetricsService.getMetricsByChallengeId(challengeId),
    enabled: !!challengeId,
  });
}
