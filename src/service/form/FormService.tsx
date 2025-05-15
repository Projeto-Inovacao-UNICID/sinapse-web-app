import { FormDto, FormResponseDto, PageableResponse } from "@/types";
import { axiosInstance } from "../api";

export const FormService = {
  async createForms(formDto: FormDto, empresaId: string) {
    const res = await axiosInstance.post(`/forms/${empresaId}`, formDto , { withCredentials: true });
    return res.data;
  },

  async postResponseForm(estagioId: number, participantId: number, dto: FormResponseDto) {
    const res = await axiosInstance.post(`/estagios-recrutamento/${estagioId}/submit?participanteId=${participantId}`, dto, { withCredentials: true });
    return res.data;
  },

  async getForms(formId: string) {
    const res = await axiosInstance.get(`/forms/${formId}`, { withCredentials: true });
    return res.data;
  },

  async getPublicForms(formId: string) {
    const res = await axiosInstance.get(`/forms/${formId}/public`, { withCredentials: true });
    return res.data;
  },

  async getInativeForms(empresaId: string, page: number = 0, size: number = 20) {
    const res = await axiosInstance.get(`/forms/inactive?empresaId=${empresaId}&page=${page}&size=${size}`, { withCredentials: true });
    return res.data;
  },

  async getActiveForms(empresaId: string, page: number = 0, size: number = 20) {
    const res = await axiosInstance.get<PageableResponse<FormDto>>(`/forms/active?empresaId=${empresaId}&page=${page}&size=${size}`, { withCredentials: true });
    return res.data;
  },

  async inativateForm(formId: string, empresaId: string) {
    const res = await axiosInstance.patch(`/forms/${formId}/inactive?empresaId=${empresaId}`, { withCredentials: true });
    return res.data;
  },

  async activateForm(formId: string, empresaId: string) {
    const res = await axiosInstance.patch(`/forms/${formId}/active?empresaId=${empresaId}`, { withCredentials: true });
    return res.data;
  },
};