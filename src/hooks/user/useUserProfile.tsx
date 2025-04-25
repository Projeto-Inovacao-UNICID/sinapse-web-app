import { useQuery } from "@tanstack/react-query";
import { UserProfileService } from "@/service/user/profile/UserProfileService";
import { UserProfileResponse } from "@/types";

export function useUserProfile(userId: string) {
  return useQuery<UserProfileResponse>({
    queryKey: ["user-profile", userId],
    queryFn: async () => {
      const service = new UserProfileService();
      return await service.getUserProfile(userId);
    },
    staleTime: 1000 * 60 * 5, // cache por 5 minutos
    refetchOnWindowFocus: false,
  });
}

export const useUserProfileImage = (userId: string) => {
  return useQuery({
    queryKey: ["user-profile-image", userId],
    queryFn: async () => {
      const service = new UserProfileService();
      return await service.getUserProfileImage(userId);
    },
    staleTime: 1000 * 60 * 5, // cache por 5 minutos
    refetchOnWindowFocus: false,
  });
};