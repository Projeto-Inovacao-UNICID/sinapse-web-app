import { axiosInstance } from "../api";

export class GetUsers {
    async getUsers() {
        const response = await axiosInstance.get(`/usuarios`, { withCredentials: true });
        return response.data;
    }
}