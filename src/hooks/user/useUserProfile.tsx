import { useMutation, useQuery } from "@tanstack/react-query";
import { UserProfileService } from "@/service/user/profile/UserProfileService";
import { UserProfileResponse } from "@/types";

const userProfileService = new UserProfileService();

export function useUserProfile(userId: string) {
  return useQuery<UserProfileResponse>({
    queryKey: ["user-profile", userId],
    queryFn: () => userProfileService.getUserProfile(userId),
    staleTime: 1000 * 60 * 5, // cache por 5 minutos
    refetchOnWindowFocus: false,
  });
}

export function useUserProfileImage(userId: string, enabled: boolean = true) {
  return useQuery<string>({
    queryKey: ["user-profile-image", userId],
    queryFn: () => userProfileService.getUserProfileImage(userId),
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false,
    enabled,
  });
}

export function usePatchUserProfile() {
  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: Partial<UserProfileResponse> }) => 
      userProfileService.patchUserProfile(userId, data),
  });
}
