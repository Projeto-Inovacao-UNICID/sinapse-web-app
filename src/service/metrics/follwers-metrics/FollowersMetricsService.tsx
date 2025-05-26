import { axiosInstance } from "@/service/api";
import { SeguidorMetricsDto } from "@/types";

export class FollowersMetricsService {
  async getFollowersMetrics(empresaId: string) {
    const response = await axiosInstance.get<SeguidorMetricsDto>(`/metrics/seguidores`, { withCredentials: true });
    return response.data;
  }
}