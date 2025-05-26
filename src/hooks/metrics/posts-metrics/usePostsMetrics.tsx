import { PostMetricsService } from "@/service/metrics/post-metrics/PostMetricsService";
import { PostMetricsDto } from "@/types";
import { useQuery } from "@tanstack/react-query";

const postMetricsService = new PostMetricsService();

export function useGetPostMetrics() {
  return useQuery<PostMetricsDto>({
    queryKey: ["post-metrics"],
    queryFn: () => postMetricsService.getPostMetrics(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}