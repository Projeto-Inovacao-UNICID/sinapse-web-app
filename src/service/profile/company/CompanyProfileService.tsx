import {
  CompanyPrivateProfileDto,
  CompanyPublicProfileDto,
  UpdateCompanyProfileDto,
} from "@/types";
import { axiosInstance } from "../../api";

export class CompanyProfileService {
  async getCompanyProfile(companyId: string): Promise<CompanyPrivateProfileDto> {
    const response = await axiosInstance.get(`/profile/company/${companyId}`, {
      withCredentials: true,
    });
    return response.data;
  }

  async patchCompanyProfile(companyId: string, data: UpdateCompanyProfileDto): Promise<number> {
    const response = await axiosInstance.patch(`/profile/company/${companyId}`, data, {
      withCredentials: true,
    });
    return response.status;
  }

  async postCompanyProfileImage(companyId: string, image: File): Promise<number> {
    const formData = new FormData();
    formData.append("arquivo", image);

    const response = await axiosInstance.post(
      `/profile/company/${companyId}/imagem`,
      formData,
      { withCredentials: true }
    );
    return response.status;
  }

  async deleteCompanyProfileImage(companyId: string): Promise<number> {
    const response = await axiosInstance.delete(
      `/profile/company/${companyId}/imagem`,
      { withCredentials: true }
    );
    return response.status;
  }

  async getCompanyProfileImage(companyId: string): Promise<string> {
    const response = await axiosInstance.get(`/profile/company/${companyId}/imagem`, {
      responseType: "blob",
      withCredentials: true,
    });

    const imageBlob = response.data;
    const imageUrl = URL.createObjectURL(imageBlob);

    return imageUrl;
  }
}
