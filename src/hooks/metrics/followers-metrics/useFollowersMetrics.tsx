import { FollowersMetricsService } from "@/service/metrics/follwers-metrics/FollowersMetricsService";
import { SeguidorMetricsDto } from "@/types";
import { useQuery } from "@tanstack/react-query";


const followersMetricsService = new FollowersMetricsService();

export function useGetFollowersMetrics(empresaId: string) {
  return useQuery<SeguidorMetricsDto>({
    queryKey: ["followers-metrics", empresaId],
    queryFn: () => followersMetricsService.getFollowersMetrics(empresaId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}