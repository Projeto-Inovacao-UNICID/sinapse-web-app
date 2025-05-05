// src/hooks/challenge/useStageChallenge.ts
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { stagesChallengeService } from "@/service/challenge/StagesChallengeService";
import type {
  RecruitmentStageCreateDto,
  RecruitmentStageResponseDto,
} from "@/types";

// 1) Buscar estágios de um desafio
export function useGetChallengeStages(challengeId: number) {
  return useQuery<RecruitmentStageResponseDto[]>({
    queryKey: ["challengeStages", challengeId],
    queryFn: () =>
      stagesChallengeService.getStagesByChallengeId(challengeId),
    enabled: !!challengeId,
  });
}

// 2) Criar um novo estágio em um desafio
export function usePostChallengeStage() {
  const queryClient = useQueryClient();
  return useMutation<
    RecruitmentStageResponseDto,
    Error,
    { challengeId: number; stage: RecruitmentStageCreateDto }
  >({
    mutationFn: (data) =>
      stagesChallengeService.postStage(data.challengeId, data.stage),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["challengeStages", variables.challengeId],
      });
    },
  });
}

// 3) Upload de arquivo em um estágio (novo hook)
export function useUploadStageFile(stageId: number, participantId: string) {
  const queryClient = useQueryClient();
  return useMutation<any, Error, File>({
    mutationFn: async (file) => {
      const form = new FormData();
      form.append("file", file);
      const resp = await axios.post(
        `/desafios/${stageId}/participantes/${participantId}/arquivos`,
        form,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return resp.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["challengeStages", stageId],
      });
    },
  });
}
