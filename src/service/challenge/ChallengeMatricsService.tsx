import { axiosInstance } from "../api";
import type { ChallengeMetricsDto } from "@/types";

export const challengeMetricsService = {
  getMetricsByChallengeId: async (challengeId: number): Promise<ChallengeMetricsDto> => {
    const response = await axiosInstance.get(`/desafios/${challengeId}/metrics`, { withCredentials: true });
    return response.data;
  },
};
