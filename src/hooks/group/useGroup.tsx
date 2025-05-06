import { GroupService } from "@/service/group/GroupService";
import {
  CreateGroupRoleDto,
  Group,
  GroupInviteDto,
  GroupMemberDto,
  GroupRequestDto,
  GroupResponseDto,
  GroupRoleDto,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

const groupService = new GroupService();

export function useGetMyGroups() {
  return useQuery<GroupResponseDto>({
    queryKey: ["groups", "mine"],
    queryFn: () => groupService.getMyGroups(),
  });
}

export function useGetGroups() {
  return useQuery<GroupResponseDto>({
    queryKey: ["groups", "all"],
    queryFn: () => groupService.getGroups(),
  });
}

export function useGetGroupById(id: number) {
  return useQuery<Group>({
    queryKey: ["groups", id],
    queryFn: () => groupService.getGroupById(id),
    enabled: !!id,
  });
}

export function usePostGroup() {
  return useMutation<Group, unknown, GroupRequestDto>({
    mutationFn: (data) => groupService.postGroup(data),
  });
}

export function usePatchGroup(id: number) {
  return useMutation<Group, unknown, Partial<GroupRequestDto>>({
    mutationFn: (data) => groupService.patchGroup(id, data),
  });
}

export function usePostQuitGroup(id: number) {
  return useMutation<void>({
    mutationFn: () => groupService.postQuitGroup(id),
  });
}

export function useDeleteGroup(id: number) {
  return useMutation<number>({
    mutationFn: () => groupService.deleteGroup(id),
  });
}

export function usePostChangeLeader(id: number) {
  return useMutation<void, unknown, string>({
    mutationFn: (userId) => groupService.postChangeLeader(id, userId),
  });
}

export function useGetGroupMembers(id: number) {
  return useQuery<GroupMemberDto[]>({
    queryKey: ["groups", id, "members"],
    queryFn: () => groupService.getGroupMembers(id),
    enabled: !!id,
  });
}

export function usePostGroupInvite(id: number) {
  return useMutation<GroupInviteDto, Error, string>({
    mutationFn: (convidadoId) => groupService.postGroupInvite(id, convidadoId),
  });
}

export function usePostAcceptGroupInvite(id: number, inviteId: number) {
  return useMutation<void>({
    mutationFn: () => groupService.postAcceptGroupInvite(id, inviteId),
  });
}

export function usePostRejectGroupInvite(id: number, inviteId: number) {
  return useMutation<void>({
    mutationFn: () => groupService.postRejectGroupInvite(id, inviteId),
  });
}

export function useGetGroupInvites() {
  return useQuery<GroupInviteDto[]>({
    queryKey: ["groups", "invites"],
    queryFn: () => groupService.getGroupInvites(),
  });
}

export function usePostCreateRole(id: number) {
  return useMutation<GroupRoleDto, unknown, CreateGroupRoleDto>({
    mutationFn: (data) => groupService.postCreateRole(id, data),
  });
}

export function useGetGroupRoles(id: number) {
  return useQuery<GroupRoleDto[]>({
    queryKey: ["groups", id, "roles"],
    queryFn: () => groupService.getGroupRoles(id),
    enabled: !!id,
  });
}

export function usePatchGroupRolePermission(id: number, roleId: string) {
  return useMutation<void, unknown, number[]>({
    mutationFn: (permissoesIds) => groupService.pathGroupRolePermission(id, roleId, permissoesIds),
  });
}

export function usePatchGroupMemberRole(id: number, userId: string) {
  return useMutation<void, unknown, string>({
    mutationFn: (roleId) => groupService.pathGroupMemberRole(id, userId, roleId),
  });
}

export function usePatchRemoveGroupMemberRole(id: number, userId: string) {
  return useMutation<void>({
    mutationFn: () => groupService.pathRemoveGroupMemberRole(id, userId),
  });
}

export function usePatchQuitGroupRole(id: number) {
  return useMutation<void>({
    mutationFn: () => groupService.pathQuitGroupRole(id),
  });
}
