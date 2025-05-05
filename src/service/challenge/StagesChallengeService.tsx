import { patch } from "@mui/material";
import { axiosInstance } from "../api";
import type {
  BatchMoveDto,
  ParticipantResponseDto,
  RecruitmentStageCreateDto,
  RecruitmentStagePatchDto,
  RecruitmentStageResponseDto
} from "@/types";

export const stagesChallengeService = {
  getStagesByChallengeId: async (challengeId: number): Promise<RecruitmentStageResponseDto[]> => {
    const response = await axiosInstance.get(`/desafios/${challengeId}/estagios`, { withCredentials: true });
    return response.data;
  },

  postStage: async (challengeId: number, stage: RecruitmentStageCreateDto): Promise<RecruitmentStageResponseDto> => {
    const response = await axiosInstance.post(`/desafios/${challengeId}/estagios`, stage, { withCredentials: true });
    return response.data;
  },

  patchStage: async (stageId: number, stage: RecruitmentStagePatchDto): Promise<RecruitmentStageResponseDto> => {
    const response = await axiosInstance.patch(`/estagios-recrutamento/${stageId}`, stage, { withCredentials: true });
    return response.data;
  },

  getParticipants: async (stageId: number): Promise<ParticipantResponseDto[]> => {
    const response = await axiosInstance.get(`/estagios-recrutamento/${stageId}/participantes`, { withCredentials: true });
    return response.data;
  },

  batchMove: async (stageId: number, dto: BatchMoveDto): Promise<void> => {
    const response = await axiosInstance.post(`/estagios-recrutamento/${stageId}/participantes/mover-lote`, dto, { withCredentials: true });
    return response.data;
  },
};
