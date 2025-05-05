// services/ChallengeService.ts

import { axiosInstance } from "../api";
import {
  ChallengeCreateDto,
  ChallengePatchDto,
  ChallengeResponseDto,
  ChallengeCountDto,
  RecruitmentStageCreateDto,
  RecruitmentStageResponseDto,
  StageApplicationDto,
  ParticipantResponseDto,
  UserChallengeCountDto,
} from "@/types";

export const ChallengeService = {
  async getById(id: number): Promise<ChallengeResponseDto> {
    const res = await axiosInstance.get(`/desafios/${id}`);
    return res.data;
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
    dto: StageApplicationDto
  ): Promise<ParticipantResponseDto> {
    const res = await axiosInstance.post(`/desafios/${challengeId}/candidatar`, dto, { withCredentials: true });
    return res.data;
  },

  async applyGroup(
    challengeId: number,
    groupId: number,
    dto: StageApplicationDto
  ): Promise<ParticipantResponseDto> {
    const res = await axiosInstance.post(`/desafios/${challengeId}/candidatar/${groupId}`, dto, { withCredentials: true });
    return res.data;
  },

  async myApplication(
    challengeId: number
  ): Promise<ParticipantResponseDto> {
    const res = await axiosInstance.get(`/desafios/${challengeId}/inscricao-minha`, { withCredentials: true });
    return res.data;
  },

  async electWinner(challengeId: number, participantId: string): Promise<void> {
    await axiosInstance.post(`/desafios/${challengeId}/vencedores/${participantId}`, { withCredentials: true });
  },

  async removeParticipant(challengeId: number, participantId: string): Promise<void> {
    await axiosInstance.delete(`/desafios/${challengeId}/participantes/${participantId}`, { withCredentials: true });
  },
};
