import { axiosInstance } from "@/service/api";
import { CandidateFormScoreDto, FormFullMetricsDto, FormMetricsDto } from "@/types";

export class FormsMetricsService {
  async getFormsMetrics(formId: string) {
    const response = await axiosInstance.get<FormMetricsDto>(`/forms/${formId}/metrics`, { withCredentials: true });
    return response.data;
  }

  async getFormsCandidatesMetrics(formId: string) {
    const response = await axiosInstance.get<CandidateFormScoreDto[]>(`/forms/${formId}/metrics/candidates`, { withCredentials: true });
    return response.data;
  }

  async getFormsFullMetrics(formId: string) {
    const response = await axiosInstance.get<FormFullMetricsDto>(`/forms/${formId}/metrics/full`, { withCredentials: true });
    return response.data;
  }
}