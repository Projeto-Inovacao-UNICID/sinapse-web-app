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

  async getGroups() {
    const response = await axiosInstance.get("/grupos", { withCredentials: true });
    return response.data;
  }

  async getGroupById(id: string) {
    const response = await axiosInstance.get(`/grupos/${id}`, { withCredentials: true });
    return response.data;
  }

  async patchGroup(id: string, nome: string, descricao: string, isPublic: boolean) {
    const response = await axiosInstance.patch(`/grupos/${id}`, {
      nome,
      descricao,
      isPublic,
    }, { withCredentials: true });
    return response.data;
  }

  async postQuitGroup(id: string) {
    const response = await axiosInstance.post(`/grupos/${id}/sair`, {}, { withCredentials: true });
    return response.data;
  }

  async deleteGroup(id: string) {
    const response = await axiosInstance.delete(`/grupos/${id}`, { withCredentials: true });
    return response.status;
  }

  async postChangeLeader(id: string, userId: string) {
    const response = await axiosInstance.post(`/grupos/${id}/transferir-lider`, { userId }, { withCredentials: true });
    return response.data;
  }

  async getGroupMembers(id: string) {
    const response = await axiosInstance.get(`/grupos/${id}/membros`, { withCredentials: true });
    return response.data;
  }

  async postGroupInvite(id: string, userId: string) {
    const response = await axiosInstance.post(`/grupos/${id}/convites`, { userId }, { withCredentials: true });
    return response.data;
  }

  async postAcceptGroupInvite(id: string, inviteId: string) {
    const response = await axiosInstance.post(`/grupos/${id}/convites/${inviteId}/aceitar`, {}, { withCredentials: true });
  }

  async getGroupInvites() {
    const response = await axiosInstance.get(`/grupos/convites`, { withCredentials: true });
    return response.data;
  }

  async postCreateRole(id: string, nome: string) {
    const response = await axiosInstance.post(`/grupos/${id}/cargos`, { nome }, { withCredentials: true });
    return response.data;
  }

  async getGroupRoles(id: string) {
    const response = await axiosInstance.get(`/grupos/${id}/cargos`, { withCredentials: true });
    return response.data;
  }

  async pathGroupRolePermission(id: string, roleId: string, permissionId: number[]) {
    const response = await axiosInstance.patch(`/grupos/${id}/cargos/${roleId}/permissoes`, { permissionId }, { withCredentials: true });
    return response.data;
  }

  async pathGroupMemberRole(id: string, userId: string, roleId: string) {
    const response = await axiosInstance.patch(`/grupos/${id}/cargos/membros/${userId}/atribuir`, { roleId }, { withCredentials: true });
    return response.data;
  }

  async pathRemoveGroupMemberRole(id: string, userId: string) {
    const response = await axiosInstance.patch(`/grupos/${id}/cargos/membros/${userId}/remover`, {}, { withCredentials: true });
    return response.data;
  }

  async pathQuitGroupRole(id: string) {
    const response = await axiosInstance.patch(`/grupos/${id}/cargos/sair`, {}, { withCredentials: true });
    return response.data;
  }
}