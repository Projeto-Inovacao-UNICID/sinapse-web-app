import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Challenge, ChallengeStage, ChallengeToPost } from "@/types";
import { challengeService } from "@/service/challenge/ChallengeService";

// QUERIES

export function useGetChallenges() {
  return useQuery({
    queryKey: ["challenges"],
    queryFn: () => challengeService.getChallenges(),
  });
}

export function useGetChallengeById(id: string) {
  return useQuery({
    queryKey: ["challenges", id],
    queryFn: () => challengeService.getChallengeById(id),
    enabled: !!id,
  });
}

export function useGetChallengeStages(id: string) {
  return useQuery({
    queryKey: ["challenges", id, "stages"],
    queryFn: () => challengeService.getChallengeStages(id),
    enabled: !!id,
  });
}

export function useGetChallengeStageParticipants(stageId: string) {
  return useQuery({
    queryKey: ["challengeStages", stageId, "participants"],
    queryFn: () => challengeService.getChallengeStageParticipants(stageId),
    enabled: !!stageId,
  });
}

export function useGetChallengeCounts(companyId: string) {
  return useQuery({
    queryKey: ["challengeCounts", companyId],
    queryFn: () => challengeService.getChallengesCountsCompany(companyId),
    enabled: !!companyId,
  });
}

export function useGetChallengeCountsUser(userId: string) {
  return useQuery({
    queryKey: ["challengeCountsUser", userId],
    queryFn: () => challengeService.getChallengesCountsUser(userId),
    enabled: !!userId,
  });
}

export function useGetMyChallengeRegistration(desafioId: string) {
  return useQuery({
    queryKey: ["challengeRegistration", desafioId],
    queryFn: () => challengeService.getMyChallengeRegistration(desafioId),
    enabled: !!desafioId,
  });
}

// MUTATIONS

export function usePostChallenge() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { empresaId: string; desafio: ChallengeToPost }) =>
      challengeService.postChallenge(data.empresaId, data.desafio),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
    },
  });
}

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

export function usePostChallengeStage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { desafioId: string; stage: ChallengeStage }) =>
      challengeService.postChallengeStage(data.desafioId, data.stage),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
      queryClient.invalidateQueries({ queryKey: ["challenges", variables.desafioId, "stages"] });
    },
  });
}

export function usePostChallengeRegistrationGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { desafioId: string; groupId: number; mensagem?: string }) =>
      challengeService.postChallengeRegistrationGroup(data.desafioId, data.groupId, data.mensagem),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
      queryClient.invalidateQueries({ queryKey: ["challengeRegistration", variables.desafioId] });
    },
  });
}

export function usePostChallengeRegistrationSolo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (desafioId: string) =>
      challengeService.postChallengeRegistrationSolo(desafioId),
    onSuccess: (data, desafioId) => {
      queryClient.invalidateQueries({ queryKey: ["challengeRegistration", desafioId] });
    },
  });
}

export function usePostChallengeWinner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { desafioId: string; participantId: string }) =>
      challengeService.postChallengeWinner(data.desafioId, data.participantId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["challenges", variables.desafioId] });
      // Pode adicionar mais invalidations se necessário
    },
  });
}

export function useRemoveParticipant() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { desafioId: string; participanteId: string }) =>
      challengeService.removeParticipant(data.desafioId, data.participanteId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["challenges", variables.desafioId, "participants"] });
    },
  });
}
