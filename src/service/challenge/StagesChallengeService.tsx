import { patch } from "@mui/material";
import { axiosInstance } from "../api";
import type {
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
};
