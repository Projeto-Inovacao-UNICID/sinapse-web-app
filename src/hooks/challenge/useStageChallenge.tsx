import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { stagesChallengeService } from "@/service/challenge/StagesChallengeService";
import type { RecruitmentStageCreateDto, RecruitmentStageResponseDto } from "@/types";

// Hook para buscar estágios de um desafio
export function useGetChallengeStages(challengeId: number) {
  return useQuery<RecruitmentStageResponseDto[]>({
    queryKey: ["challengeStages", challengeId],
    queryFn: () => stagesChallengeService.getStagesByChallengeId(challengeId),
    enabled: !!challengeId,
  });
}

// Hook para criar um novo estágio em um desafio
export function usePostChallengeStage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { challengeId: number; stage: RecruitmentStageCreateDto }) =>
      stagesChallengeService.postStage(data.challengeId, data.stage),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["challengeStages", variables.challengeId] });
    },
  });
}
