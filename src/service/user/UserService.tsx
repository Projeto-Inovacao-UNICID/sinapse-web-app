import { User } from "@/types";
import { axiosInstance } from "../api";

interface GetUserResponse {
    data: User[];
}

export class GetUsers {
    async getUsers() {
        const response = await axiosInstance.get<GetUserResponse>(`/usuarios`, { withCredentials: true });
        return response.data;
    }
}