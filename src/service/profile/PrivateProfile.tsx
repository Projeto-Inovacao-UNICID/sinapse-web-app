import { axiosInstance } from "../api";

export class PrivateProfileService {
    async getPrivateProfile() {
        const response = await axiosInstance.get(`/profile/me`, { withCredentials: true });
        return response.data;
    }

    async patchPrivateProfile(nome: string, username: string, email: string) {
        const response = await axiosInstance.patch(`/profile/me`, { nome, username, email }, { withCredentials: true });
        return response.status;
    }

    async postPrivateProfileImage(image: any) {
        const response = await axiosInstance.post(`/profile/me/imagem`, { image }, { withCredentials: true });
        return response.status;
    }

    async deletePrivateProfileImage() {
        const response = await axiosInstance.delete(`/profile/me/image`, { withCredentials: true });
        return response.status;
    }
}
