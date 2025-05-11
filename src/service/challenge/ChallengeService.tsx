// services/ChallengeService.ts

import {
  ChallengeCountDto,
  ChallengeCreateDto,
  ChallengePatchDto,
  ChallengeResponseDto,
  ParticipantResponseDto,
  RecruitmentStageCreateDto,
  RecruitmentStageResponseDto,
  UserChallengeCountDto
} from "@/types";
import axios from "axios";
import { axiosInstance } from "../api";

export const ChallengeService = {
  async getById(id: number): Promise<ChallengeResponseDto> {
    const res = await axiosInstance.get(`/desafios/${id}`, { withCredentials: true });
    return res.data;
  },

  async getMyInscriptions(desafioId: number): Promise<ParticipantResponseDto | null> {
    try {
      const res = await axiosInstance.get(`/desafios/${desafioId}/inscricao-minha`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },
  
  async list(params?: {
    companyId?: string;
    modality?: string;
    status?: string;
    internal?: boolean;
  }): Promise<ChallengeResponseDto[]> {
    const res = await axiosInstance.get("/desafios", { withCredentials: true, params: { ...params } });
    return res.data;
  },

  async create(
    companyId: string,
    dto: ChallengeCreateDto
  ): Promise<ChallengeResponseDto> {
    const res = await axiosInstance.post(`/desafios/${companyId}/criar`, dto, { withCredentials: true });
    return res.data;
  },

  async update(
    id: number,
    dto: ChallengePatchDto
  ): Promise<ChallengeResponseDto> {
    const res = await axiosInstance.patch(`/desafios/${id}/editar`, dto, { withCredentials: true });
    return res.data;
  },

  async countByCompany(companyId: string): Promise<ChallengeCountDto> {
    const res = await axiosInstance.get("/desafios/contagem", { params: { empresaId: companyId }, withCredentials: true });
    return res.data;
  },

  async countByUser(userId: string): Promise<UserChallengeCountDto> {
    const res = await axiosInstance.get("/desafios/contagem/usuario", { params: { usuarioId: userId }, withCredentials: true });
    return res.data;
  },

  async listStages(challengeId: number): Promise<RecruitmentStageResponseDto[]> {
    const res = await axiosInstance.get(`/desafios/${challengeId}/estagios`, { withCredentials: true });
    return res.data;
  },

  async createStage(
    challengeId: number,
    dto: RecruitmentStageCreateDto
  ): Promise<RecruitmentStageResponseDto> {
    const res = await axiosInstance.post(`/desafios/${challengeId}/estagios`, dto, { withCredentials: true });
    return res.data;
  },

  async applySolo(
    challengeId: number,
    mensagem: string
  ): Promise<ParticipantResponseDto> {
    const res = await axiosInstance.post(`/desafios/${challengeId}/candidatar`, { mensagem }, { withCredentials: true });
    return res.data;
  },

  async applyGroup(
    challengeId: number,
    groupId: number,
    mensagem: string
  ): Promise<ParticipantResponseDto> {
    const res = await axiosInstance.post(`/desafios/${challengeId}/candidatar/${groupId}`, { mensagem }, { withCredentials: true });
    return res.data;
  },

  async myApplication(
    challengeId: number
  ): Promise<ParticipantResponseDto> {
    const res = await axiosInstance.get(`/desafios/${challengeId}/inscricao-minha`, { withCredentials: true });
    return res.data;
  },

  async electWinner(challengeId: number, participantId: number): Promise<void> {
    await axiosInstance.post(`/desafios/${challengeId}/vencedores/${participantId}`, { withCredentials: true });
  },

  async removeParticipant(challengeId: number, participantId: number): Promise<void> {
    await axiosInstance.delete(`/desafios/${challengeId}/participantes/${participantId}`, { withCredentials: true });
  },
};
