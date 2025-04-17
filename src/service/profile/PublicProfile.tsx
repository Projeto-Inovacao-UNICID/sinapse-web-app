import { UUID } from "crypto";
import { axiosInstance } from "../api";

export class PublicProfileService {
    async getPrivateProfile(userId: UUID) {
        const response = await axiosInstance.get(`/profile/user/${userId}`, { withCredentials: true });
        return response.data;
    }
}