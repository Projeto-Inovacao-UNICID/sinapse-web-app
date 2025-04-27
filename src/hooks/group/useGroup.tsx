import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GroupService } from "@/service/group/GroupService";

const groupService = new GroupService();

// QUERIES

export function useGetGroups() {
  return useQuery({
    queryKey: ["groups"],
    queryFn: () => groupService.getGroups(),
  });
}

export function useGetGroupById(id: string) {
  return useQuery({
    queryKey: ["groups", id],
    queryFn: () => groupService.getGroupById(id),
    enabled: !!id,
  });
}

export function useGetGroupMembers(id: string) {
  return useQuery({
    queryKey: ["groups", id, "members"],
    queryFn: () => groupService.getGroupMembers(id),
    enabled: !!id,
  });
}

export function useGetGroupInvites() {
  return useQuery({
    queryKey: ["group-invites"],
    queryFn: () => groupService.getGroupInvites(),
  });
}

export function useGetGroupRoles(id: string) {
  return useQuery({
    queryKey: ["groups", id, "roles"],
    queryFn: () => groupService.getGroupRoles(id),
    enabled: !!id,
  });
}

// MUTATIONS

export function usePostGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { nome: string; descricao: string; isPublic: boolean }) =>
      groupService.postGroup(data.nome, data.descricao, data.isPublic),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
}

export function usePatchGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; nome: string; descricao: string; isPublic: boolean }) =>
      groupService.patchGroup(data.id, data.nome, data.descricao, data.isPublic),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      queryClient.invalidateQueries({ queryKey: ["groups", variables.id] });
    },
  });
}

export function useDeleteGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => groupService.deleteGroup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
}

export function usePostQuitGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => groupService.postQuitGroup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
}

export function usePostChangeLeader() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; userId: string }) =>
      groupService.postChangeLeader(data.id, data.userId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["groups", variables.id, "members"] });
    },
  });
}

export function usePostGroupInvite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; userId: string }) =>
      groupService.postGroupInvite(data.id, data.userId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["groups", variables.id, "members"] });
    },
  });
}

export function usePostAcceptGroupInvite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; inviteId: string }) =>
      groupService.postAcceptGroupInvite(data.id, data.inviteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      queryClient.invalidateQueries({ queryKey: ["group-invites"] });
    },
  });
}

export function usePostCreateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; nome: string }) =>
      groupService.postCreateRole(data.id, data.nome),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["groups", variables.id, "roles"] });
    },
  });
}

export function usePathGroupRolePermission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; roleId: string; permissionId: number[] }) =>
      groupService.pathGroupRolePermission(data.id, data.roleId, data.permissionId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["groups", variables.id, "roles"] });
    },
  });
}

export function usePathGroupMemberRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; userId: string; roleId: string }) =>
      groupService.pathGroupMemberRole(data.id, data.userId, data.roleId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["groups", variables.id, "members"] });
    },
  });
}

export function usePathRemoveGroupMemberRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; userId: string }) =>
      groupService.pathRemoveGroupMemberRole(data.id, data.userId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["groups", variables.id, "members"] });
    },
  });
}

export function usePathQuitGroupRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => groupService.pathQuitGroupRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
}
