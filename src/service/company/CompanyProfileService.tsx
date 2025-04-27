import { CompanyInfo } from "@/types";
import { axiosInstance } from "../api";

export class CompanyProfileService {
  async getCompanyProfile(companyId: string) {
    const response = await axiosInstance.get<CompanyInfo>(`/profile/company/${companyId}`, { withCredentials: true });
    return response.data;
  }

  async patchCompanyProfile(companyId: string, data: Partial<CompanyInfo>) {
    const response = await axiosInstance.patch(`/profile/company/${companyId}`, data, { withCredentials: true });
    return response.status;
  }

  async postCompanyProfileImage(companyId: string, image: File) {
    const formData = new FormData();
    formData.append("image", image); 
    
    const response = await axiosInstance.post(
      `/profile/company/${companyId}/imagem`,
      formData,
      { withCredentials: true }
    );
    return response.status;
  }
  
  async deleteCompanyProfileImage(companyId: string) {
    const response = await axiosInstance.delete(`/profile/company/${companyId}/imagem`, { withCredentials: true });
    return response.status;
  }

  async getCompanyProfileImage(companyId: string) {
    const response = await axiosInstance.get(`/profile/company/${companyId}/imagem`, {
      responseType: 'blob', // importante para receber como arquivo binário
      withCredentials: true,
    });

    const imageBlob = response.data;
    const imageUrl = URL.createObjectURL(imageBlob); // cria uma URL utilizável

    return imageUrl;
  }
}