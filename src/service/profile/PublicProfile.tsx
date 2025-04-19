import { axiosInstance } from "../api";

export class PublicProfileService {
    async getPrivateProfile(userId: string) {
        const response = await axiosInstance.get(`/profile/user/${userId}`, { withCredentials: true });
        return response.data;
    }
}