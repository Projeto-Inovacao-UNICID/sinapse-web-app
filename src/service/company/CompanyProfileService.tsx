import { CompanyInfo } from "@/types";
import { axiosInstance } from "../api";

export class CompanyProfileService {
  async getCompanyProfile(empresaId: string) {
    const response = await axiosInstance.get<CompanyInfo>(`/profile/company/${empresaId}`, { withCredentials: true });
    return response.data;
  }

  async patchCompanyProfile(empresaId: string, data: Partial<CompanyInfo>) {
    const response = await axiosInstance.patch(`/profile/company/${empresaId}`, data, { withCredentials: true });
    return response.status;
  }

  async uploadCompanyProfileImage(empresaId: string, image: File) {
    const response = await axiosInstance.post(`/profile/company/${empresaId}/imagem`, image, { withCredentials: true });
    return response.status;
  }

  async deleteCompanyProfileImage(empresaId: string) {
    const response = await axiosInstance.delete(`/profile/company/${empresaId}/imagem`, { withCredentials: true });
    return response.status;
  }
}