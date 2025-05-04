import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GroupService } from "@/service/group/GroupService";
import { Group } from "@/types";

const groupService = new GroupService();

// QUERIES

export function useGetMyGroups(page: number = 0, size: number = 10) {
  return useQuery({
    queryKey: ["groups", "my", page, size],
    queryFn: ({ queryKey }) => {
      const [, , currentPage, pageSize] = queryKey;
      return groupService.getMyGroups(currentPage as number, pageSize as number);
    },
  });
}

export function useGetGroups(page: number = 0, size: number = 10) {
  return useQuery({
    queryKey: ["groups", "my", page, size],
    queryFn: ({ queryKey }) => {
      const [, , currentPage, pageSize] = queryKey;
      return groupService.getGroups(currentPage as number, pageSize as number);
    },
  });
}

export function useGetGroupById(id: number) {
  return useQuery({
    queryKey: ["groups", id],
    queryFn: () => groupService.getGroupById(id),
    enabled: !!id,
  });
}

export function useGetGroupMembers(id: number) {
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

export function useGetGroupRoles(id: number) {
  return useQuery({
    queryKey: ["groups", `${id}`, "roles"],
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
    mutationFn: (data: { id: number; nome?: string; descricao?: string; publico?: boolean }) =>
      groupService.patchGroup(data.id, data.nome, data.descricao, data.publico),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      queryClient.invalidateQueries({ queryKey: ["groups", variables.id] });
    },
  });
}

export function useDeleteGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => groupService.deleteGroup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
}

export function usePostQuitGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => groupService.postQuitGroup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
}

export function usePostChangeLeader() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: number; userId: string }) =>
      groupService.postChangeLeader(data.id, data.userId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["groups", variables.id, "members"] });
    },
  });
}

export function usePostGroupInvite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: number; convidadoId: string }) =>
      groupService.postGroupInvite(data.id, data.convidadoId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["groups", variables.id, "members"] });
    },
  });
}

export function usePostAcceptGroupInvite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: number; inviteId: number }) =>
      groupService.postAcceptGroupInvite(data.id, data.inviteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      queryClient.invalidateQueries({ queryKey: ["group-invites"] });
    },
  });
}


export function usePostRejectGroupInvite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: number; inviteId: number }) =>
      groupService.postRejectGroupInvite(data.id, data.inviteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      queryClient.invalidateQueries({ queryKey: ["group-invites"] });
    },
  });
}

export function usePostCreateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: number; nome: string }) =>
      groupService.postCreateRole(data.id, data.nome),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["groups", variables.id, "roles"] });
    },
  });
}

export function usePathGroupRolePermission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: number; roleId: string; permissionId: number[] }) =>
      groupService.pathGroupRolePermission(data.id, data.roleId, data.permissionId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["groups", variables.id, "roles"] });
    },
  });
}

export function usePathGroupMemberRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: number; userId: string; roleId: string }) =>
      groupService.pathGroupMemberRole(data.id, data.userId, data.roleId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["groups", variables.id, "members"] });
    },
  });
}

export function usePathRemoveGroupMemberRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: number; userId: string }) =>
      groupService.pathRemoveGroupMemberRole(data.id, data.userId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["groups", variables.id, "members"] });
    },
  });
}

export function usePathQuitGroupRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => groupService.pathQuitGroupRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
}
