import { axiosInstance } from "./api";

export class GetCompanies {
    async getCompanies() {
        const response = await axiosInstance.get(`/empresas`, { withCredentials: true });
        return response.data;
    }
}