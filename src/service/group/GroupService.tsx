import { Group, GroupInvite, GroupMember } from "@/types";
import { axiosInstance } from "../api";

export class GroupService {
  async postGroup(nome: string, descricao: string, publico: boolean = true) {
    const response = await axiosInstance.post("/grupos", {
      nome,
      descricao,
      publico,
    }, { withCredentials: true });
    return response.data;
  }

  async getMyGroups(page: number = 0, size: number = 10) {
    const response = await axiosInstance.get(`/grupos/meus?page=${page}&size=${size}`, { withCredentials: true });
    return response.data;
  }

  async getGroups(page: number = 0, size: number = 10) {
    const response = await axiosInstance.get(`/grupos?page=${page}&size=${size}`, { withCredentials: true });
    return response.data;
  }

  async getGroupById(id: number) {
    const response = await axiosInstance.get<Group>(`/grupos/${id}`, { withCredentials: true });
    return response.data;
  }

  async patchGroup(id: number, nome?: string, descricao?: string, publico?: boolean) {
    const response = await axiosInstance.patch(`/grupos/${id}`, {
      nome,
      descricao,
      publico,
    }, { withCredentials: true });
    return response.data;
  }

  async postQuitGroup(id: number) {
    const response = await axiosInstance.post(`/grupos/${id}/sair`, {}, { withCredentials: true });
    return response.data;
  }

  async deleteGroup(id: number) {
    const response = await axiosInstance.delete(`/grupos/${id}`, { withCredentials: true });
    return response.status;
  }

  async postChangeLeader(id: number, userId: string) {
    const response = await axiosInstance.post(`/grupos/${id}/transferir-lider`, { userId }, { withCredentials: true });
    return response.data;
  }

  async getGroupMembers(id: number) {
    const response = await axiosInstance.get<GroupMember[]>(`/grupos/${id}/membros`, { withCredentials: true });
    return response.data;
  }

  async postGroupInvite(id: number, convidadoId: string) {
    const response = await axiosInstance.post(`/grupos/${id}/convites`, { convidadoId }, { withCredentials: true });
    if (response.status === 201) {
      return response.data;
    }
    if (response.status === 409) {
      throw new Error('Convite já enviado');
    }
  }

  async postAcceptGroupInvite(id: number, inviteId: number) {
    const response = await axiosInstance.post(`/grupos/${id}/convites/${inviteId}/aceitar`, {}, { withCredentials: true });
    return response.status;
  }

  async postRejectGroupInvite(id: number, inviteId: number) {
    const response = await axiosInstance.post(`/grupos/${id}/convites/${inviteId}/recusar`, {}, { withCredentials: true });
    return response.status;
  }

  async getGroupInvites() {
    const response = await axiosInstance.get<GroupInvite[]>(`/grupos/convites`, { withCredentials: true });
    return response.data;
  }

  async postCreateRole(id: number, nome: string) {
    const response = await axiosInstance.post(`/grupos/${id}/cargos`, { nome }, { withCredentials: true });
    return response.data;
  }

  async getGroupRoles(id: number) {
    const response = await axiosInstance.get(`/grupos/${id}/cargos`, { withCredentials: true });
    return response.data;
  }

  async pathGroupRolePermission(id: number, roleId: string, permissionId: number[]) {
    const response = await axiosInstance.patch(`/grupos/${id}/cargos/${roleId}/permissoes`, { permissionId }, { withCredentials: true });
    return response.data;
  }

  async pathGroupMemberRole(id: number, userId: string, roleId: string) {
    const response = await axiosInstance.patch(`/grupos/${id}/cargos/membros/${userId}/atribuir`, { roleId }, { withCredentials: true });
    return response.data;
  }

  async pathRemoveGroupMemberRole(id: number, userId: string) {
    const response = await axiosInstance.patch(`/grupos/${id}/cargos/membros/${userId}/remover`, {}, { withCredentials: true });
    return response.data;
  }

  async pathQuitGroupRole(id: number) {
    const response = await axiosInstance.patch(`/grupos/${id}/cargos/sair`, {}, { withCredentials: true });
    return response.data;
  }
}