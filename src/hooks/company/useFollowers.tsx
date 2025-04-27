// src/hooks/company/useFollowers.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { followersService } from "@/service/company/FollowersService";

export const useGetFollowedCompanies = () =>
  useQuery(
    { queryKey: ["followed-companies"], queryFn: () => followersService.getFollowedCompanies() }
  );

export const useGetCompanyFollowers = () =>
  useQuery({
    queryKey: ["company-followers"],
    queryFn: () => followersService.getFollowersOfCompany(),
  });

  export const useGetFollowersCount = (empresaId: string) =>
    useQuery({
      queryKey: ["followers-count", empresaId],
      queryFn: () => followersService.getFollowersCount(empresaId),
      enabled: !!empresaId,
    });
  

export const useCheckFollowing = (empresaId: string, enabled = true) =>
  useQuery({
    queryKey: ["is-following", empresaId],
    queryFn: () => followersService.checkFollowing(empresaId),
    enabled,
  });

export const useFollowCompany = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (empresaId: string) => followersService.postFollow(empresaId),
    onSuccess: (_, empresaId: string) => {
      qc.invalidateQueries({ queryKey: ["is-following", empresaId] });
      qc.invalidateQueries({ queryKey: ["followers-count"] });
      qc.invalidateQueries({ queryKey: ["company-followers"] });
    },
  });
};

export const useUnfollowCompany = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (empresaId: string) => followersService.deleteFollow(empresaId),
    onSuccess: (_, empresaId: string) => {
      qc.invalidateQueries({ queryKey: ["is-following", empresaId] });
      qc.invalidateQueries({ queryKey: ["followers-count"] });
      qc.invalidateQueries({ queryKey: ["company-followers"] });
    },
  });
};
