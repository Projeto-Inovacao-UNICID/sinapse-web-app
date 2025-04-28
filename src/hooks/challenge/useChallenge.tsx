import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Challenge, ChallengeStage, ChallengeToPost } from "@/types";
import { challengeService } from "@/service/challenge/ChallengeService";

// QUERIES

// Hook para obter todos os desafios
export function useGetChallenges() {
  return useQuery({
    queryKey: ["challenges"],
    queryFn: () => challengeService.getChallenges(),
  });
}

// Hook para obter um desafio por ID
export function useGetChallengeById(id: string) {
  return useQuery({
    queryKey: ["challenges", id],
    queryFn: () => challengeService.getChallenges(),
    enabled: !!id,
  });
}

// Hook para obter os estágios de um desafio
export function useGetChallengeStages(id: string) {
  return useQuery({
    queryKey: ["challenges", id, "stages"],
    queryFn: () => challengeService.getChallengeStages(id),
    enabled: !!id,
  });
}

// Hook para obter os participantes de um estágio
export function useGetChallengeStageParticipants(stageId: string) {
  return useQuery({
    queryKey: ["challengeStages", stageId, "participants"],
    queryFn: () => challengeService.getChallengeStageParticipants(stageId),
    enabled: !!stageId,
  });
}

// Hook para obter as contagens de desafios de uma empresa
export function useGetChallengeCounts(companyId: string) {
  return useQuery({
    queryKey: ["challengeCounts", companyId],
    queryFn: () => challengeService.getChallengesCountsCompany(companyId),
    enabled: !!companyId,
  });
}

// Hook para obter as contagens de desafios de um usuário
export function useGetChallengeCountsUser(userId: string) {
  return useQuery({
    queryKey: ["challengeCountsUser", userId],
    queryFn: () => challengeService.getChallengesCountsUser(userId),
    enabled: !!userId,
  });
}

// MUTATIONS

// Hook para criar um novo desafio
export function usePostChallenge(empresaId: string, form: ChallengeToPost) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { empresaId: string; desafio: ChallengeToPost }) =>
      challengeService.postChallenge(data.empresaId, data.desafio),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
    },
  });
}

// Hook para atualizar um desafio
export function usePatchChallenge() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { desafioId: string; desafio: Partial<Challenge> }) =>
      challengeService.patchChallenge(data.desafioId, data.desafio),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
      queryClient.invalidateQueries({ queryKey: ["challenges", variables.desafioId] });
    },
  });
}

// Hook para criar um novo estágio de desafio
export function usePostChallengeStage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { desafioId: string; stage: ChallengeStage }) =>
      challengeService.postChallengeStage(data.desafioId, data.stage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
    },
  });
}

// Hook para registrar um grupo em um desafio
export function usePostChallengeRegistrationGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { desafioId: string; groupId: string; mensagem?: string }) =>
      challengeService.postChallengeRegistrationGroup(data.desafioId, data.groupId, data.mensagem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
    },
  });
}
