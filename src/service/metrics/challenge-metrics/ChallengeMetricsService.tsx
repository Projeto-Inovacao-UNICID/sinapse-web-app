import { axiosInstance } from "@/service/api";
import { DesafioMetricsDto } from "@/types";

export class ChallengeMetricsService {
  async getChallengeMetrics(challengeId: number) {
    const response = await axiosInstance.get<DesafioMetricsDto>(`/desafios/${challengeId}/metrics`, { withCredentials: true });
    return response.data;
  }
}