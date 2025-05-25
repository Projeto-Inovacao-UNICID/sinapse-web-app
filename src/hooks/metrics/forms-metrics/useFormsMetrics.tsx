import { FormsMetricsService } from "@/service/metrics/form-metrics/FormsMetricsService";
import { CandidateFormScoreDto, FormFullMetricsDto, FormMetricsDto } from "@/types";
import { useQuery } from "@tanstack/react-query";

const formsMetricsService = new FormsMetricsService();

export function useGetFormsMetrics(formId: string) {
  return useQuery<FormMetricsDto>({
    queryKey: ["forms-metrics", formId],
    queryFn: () => formsMetricsService.getFormsMetrics(formId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export function useGetFormsCandidatesMetrics(formId: string) {
  return useQuery<CandidateFormScoreDto[]>({
    queryKey: ["forms-candidates-metrics", formId],
    queryFn: () => formsMetricsService.getFormsCandidatesMetrics(formId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export function useGetFormsFullMetrics(formId: string) {
  return useQuery<FormFullMetricsDto>({
    queryKey: ["forms-full-metrics", formId],
    queryFn: () => formsMetricsService.getFormsFullMetrics(formId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}