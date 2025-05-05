import { ChallengeService } from "@/service/challenge/ChallengeService";
import {
  ChallengeCountDto,
  ChallengeCreateDto,
  ChallengePatchDto,
  ChallengeResponseDto,
  ParticipantResponseDto,
  RecruitmentStageCreateDto,
  RecruitmentStageResponseDto,
  UserChallengeCountDto
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// QUERIES

export function useGetChallenges(params?: {
  companyId?: string;
  modality?: string;
  status?: string;
  internal?: boolean;
}) {
  return useQuery<ChallengeResponseDto[]>({
    queryKey: ["challenges", params],
    queryFn: () => ChallengeService.list(params),
  });
}

export function useGetChallengeById(id: number) {
  return useQuery<ChallengeResponseDto>({
    queryKey: ["challenges", id],
    queryFn: () => ChallengeService.getById(id),
    enabled: !!id,
  });
}

export function useGetChallengeStages(id: number) {
  return useQuery<RecruitmentStageResponseDto[]>({
    queryKey: ["challenges", id, "stages"],
    queryFn: () => ChallengeService.listStages(id),
    enabled: !!id,
  });
}

export function useGetChallengeCounts(companyId: string) {
  return useQuery<ChallengeCountDto>({
    queryKey: ["challengeCounts", companyId],
    queryFn: () => ChallengeService.countByCompany(companyId),
    enabled: !!companyId,
  });
}

export function useGetChallengeCountsUser(userId: string) {
  return useQuery<UserChallengeCountDto>({
    queryKey: ["challengeCountsUser", userId],
    queryFn: () => ChallengeService.countByUser(userId),
    enabled: !!userId,
  });
}

export function useGetMyChallengeRegistration(challengeId: number) {
  return useQuery<ParticipantResponseDto>({
    queryKey: ["challengeRegistration", challengeId],
    queryFn: () => ChallengeService.myApplication(challengeId),
    enabled: !!challengeId,
  });
}

// MUTATIONS

export function usePostChallenge() {
  const queryClient = useQueryClient();
  return useMutation<ChallengeResponseDto, Error, { companyId: string; dto: ChallengeCreateDto }>({
    mutationFn: ({ companyId, dto }) => ChallengeService.create(companyId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
    },
  });
}

export function usePatchChallenge() {
  const queryClient = useQueryClient();
  return useMutation<ChallengeResponseDto, Error, { challengeId: number; dto: ChallengePatchDto }>({
    mutationFn: ({ challengeId, dto }) => ChallengeService.update(challengeId, dto),
    onSuccess: (_, { challengeId }) => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
      queryClient.invalidateQueries({ queryKey: ["challenges", challengeId] });
    },
  });
}

export function usePostChallengeStage() {
  const queryClient = useQueryClient();
  return useMutation<RecruitmentStageResponseDto, Error, { challengeId: number; dto: RecruitmentStageCreateDto }>({
    mutationFn: ({ challengeId, dto }) => ChallengeService.createStage(challengeId, dto),
    onSuccess: (_, { challengeId }) => {
      queryClient.invalidateQueries({ queryKey: ["challenges", challengeId, "stages"] });
    },
  });
}

export function usePostChallengeRegistrationGroup() {
  const queryClient = useQueryClient();
  return useMutation<ParticipantResponseDto, Error, { challengeId: number; groupId: number; message: string }>({
    mutationFn: ({ challengeId, groupId, message }) =>
      ChallengeService.applyGroup(challengeId, groupId, { mensagem: message }),
    onSuccess: (_, { challengeId }) => {
      queryClient.invalidateQueries({ queryKey: ["challengeRegistration", challengeId] });
    },
  });
}

export function usePostChallengeRegistrationSolo() {
  const queryClient = useQueryClient();
  return useMutation<ParticipantResponseDto, Error, { challengeId: number; message: string }>({
    mutationFn: ({ challengeId, message }) =>
      ChallengeService.applySolo(challengeId, { mensagem: message }),
    onSuccess: (_, { challengeId }) => {
      queryClient.invalidateQueries({ queryKey: ["challengeRegistration", challengeId] });
    },
  });
}

export function usePostChallengeWinner() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { challengeId: number; participantId: string }>({
    mutationFn: ({ challengeId, participantId }) =>
      ChallengeService.electWinner(challengeId, participantId),
    onSuccess: (_, { challengeId }) => {
      queryClient.invalidateQueries({ queryKey: ["challenges", challengeId] });
    },
  });
}

export function useRemoveParticipant() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { challengeId: number; participantId: string }>({
    mutationFn: ({ challengeId, participantId }) =>
      ChallengeService.removeParticipant(challengeId, participantId),
    onSuccess: (_, { challengeId }) => {
      queryClient.invalidateQueries({ queryKey: ["challenges", challengeId, "participants"] });
    },
  });
}
