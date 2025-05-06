// src/hooks/user/useUserProfile.ts
import { UserProfileService } from "@/service/profile/user/UserProfileService";
import {
  UpdateUserProfileDto,
  UserProfileResponse
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

const userProfileService = new UserProfileService();

export function useUserProfile(userId: string) {
  return useQuery<UserProfileResponse>({
    queryKey: ["user-profile", userId],
    queryFn: () => userProfileService.getUserProfile(userId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export function useUserProfileImage(userId: string, enabled = true) {
  return useQuery<string, Error>({
    queryKey: ["user-profile-image", userId],
    queryFn: () => userProfileService.getUserProfileImage(userId),
    enabled,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
}

export function useUploadUserProfileImage(userId: string) {
  return useMutation({
    mutationFn: (image: File) => userProfileService.uploadUserProfileImage(userId, image),
  });
}

export function useDeleteUserProfileImage(userId: string) {
  return useMutation({
    mutationFn: () => userProfileService.deleteUserProfileImage(userId),
  });
}

export function usePatchUserProfile() {
  return useMutation({
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: string;
      payload: UpdateUserProfileDto;
    }) => userProfileService.patchUserProfile(userId, payload),
  });
}
