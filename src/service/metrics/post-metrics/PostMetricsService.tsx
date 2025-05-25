import { axiosInstance } from "@/service/api";
import { PostMetricsDto } from "@/types";

export class PostMetricsService {
  async getPostMetrics() {
    const response = await axiosInstance.get<PostMetricsDto>(`/postagens/metrics`, { withCredentials: true });
    return response.data;
  }
}