import { ChallengeMetricsService } from "@/service/metrics/challenge-metrics/ChallengeMetricsService";
import { ChallengeMetricsDto } from "@/types";
import { useQuery } from "@tanstack/react-query";

const challengeMetricsService = new ChallengeMetricsService();

export function useGetChallengeMetrics(challengeId: number) {
  return useQuery<ChallengeMetricsDto>({
    queryKey: ["challengeMetrics", challengeId],
    queryFn: () => challengeMetricsService.getChallengeMetrics(challengeId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}