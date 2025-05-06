import {
  GroupInviteDto,
  GroupMemberDto,
  GroupResponseDto,
  GroupRoleDto,
  CreateGroupRoleDto,
  GroupRequestDto,
  Group,
} from "@/types";
import { axiosInstance } from "../api";

export class GroupService {
  async postGroup(data: GroupRequestDto): Promise<Group> {
    const response = await axiosInstance.post("/grupos", data, { withCredentials: true });
    return response.data;
  }

  async getMyGroups(page = 0, size = 10): Promise<GroupResponseDto> {
    const response = await axiosInstance.get(`/grupos/meus?page=${page}&size=${size}`, { withCredentials: true });
    return response.data;
  }

  async getGroups(page = 0, size = 10): Promise<GroupResponseDto> {
    const response = await axiosInstance.get(`/grupos?page=${page}&size=${size}`, { withCredentials: true });
    return response.data;
  }

  async getGroupById(id: number): Promise<Group> {
    const response = await axiosInstance.get(`/grupos/${id}`, { withCredentials: true });
    return response.data;
  }

  async patchGroup(id: number, data: Partial<Group>): Promise<Group> {
    const response = await axiosInstance.patch(`/grupos/${id}`, data, { withCredentials: true });
    return response.data;
  }

  async postQuitGroup(id: number): Promise<void> {
    await axiosInstance.post(`/grupos/${id}/sair`, {}, { withCredentials: true });
  }

  async deleteGroup(id: number): Promise<number> {
    const response = await axiosInstance.delete(`/grupos/${id}`, { withCredentials: true });
    return response.status;
  }

  async postChangeLeader(id: number, userId: string): Promise<void> {
    await axiosInstance.post(`/grupos/${id}/transferir-lider`, { userId }, { withCredentials: true });
  }

  async getGroupMembers(id: number): Promise<GroupMemberDto[]> {
    const response = await axiosInstance.get(`/grupos/${id}/membros`, { withCredentials: true });
    return response.data;
  }

  async postGroupInvite(id: number, convidadoId: string): Promise<GroupInviteDto> {
    const response = await axiosInstance.post(`/grupos/${id}/convites`, { convidadoId }, { withCredentials: true });
    if (response.status === 201) return response.data;
    if (response.status === 409) throw new Error("Convite já enviado");
    return response.data;
  }

  async postAcceptGroupInvite(id: number, inviteId: number): Promise<void> {
    await axiosInstance.post(`/grupos/${id}/convites/${inviteId}/aceitar`, {}, { withCredentials: true });
  }

  async postRejectGroupInvite(id: number, inviteId: number): Promise<void> {
    await axiosInstance.post(`/grupos/${id}/convites/${inviteId}/recusar`, {}, { withCredentials: true });
  }

  async getGroupInvites(): Promise<GroupInviteDto[]> {
    const response = await axiosInstance.get(`/grupos/convites`, { withCredentials: true });
    return response.data;
  }

  async postCreateRole(id: number, data: CreateGroupRoleDto): Promise<GroupRoleDto> {
    const response = await axiosInstance.post(`/grupos/${id}/cargos`, data, { withCredentials: true });
    return response.data;
  }

  async getGroupRoles(id: number): Promise<GroupRoleDto[]> {
    const response = await axiosInstance.get(`/grupos/${id}/cargos`, { withCredentials: true });
    return response.data;
  }

  async pathGroupRolePermission(id: number, roleId: string, permissoesIds: number[]): Promise<void> {
    await axiosInstance.patch(`/grupos/${id}/cargos/${roleId}/permissoes`, { permissoesIds }, { withCredentials: true });
  }

  async pathGroupMemberRole(id: number, userId: string, roleId: string): Promise<void> {
    await axiosInstance.patch(`/grupos/${id}/cargos/membros/${userId}/atribuir`, { roleId }, { withCredentials: true });
  }

  async pathRemoveGroupMemberRole(id: number, userId: string): Promise<void> {
    await axiosInstance.patch(`/grupos/${id}/cargos/membros/${userId}/remover`, {}, { withCredentials: true });
  }

  async pathQuitGroupRole(id: number): Promise<void> {
    await axiosInstance.patch(`/grupos/${id}/cargos/sair`, {}, { withCredentials: true });
  }
}
