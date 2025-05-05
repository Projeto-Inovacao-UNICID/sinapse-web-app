// src/hooks/user/useUserProfile.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  UpdateUserProfileDto,
  UserPrivateProfileDto,
  UserProfileResponse,
  UserPublicProfileDto,
} from "@/types";
import { UserProfileService } from "@/service/profile/user/UserProfileService";

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
