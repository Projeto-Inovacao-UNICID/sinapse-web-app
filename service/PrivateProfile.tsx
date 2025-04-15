import { axiosInstance } from "./api";

export class GetPrivateProfile {
    async getPrivateProfile() {
        const response = await axiosInstance.get(`/profile/me`, { withCredentials: true });
        return response.data;
    }
}