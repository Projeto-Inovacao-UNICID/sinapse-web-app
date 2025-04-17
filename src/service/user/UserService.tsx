import { User } from "@/types";
import { axiosInstance } from "../api";

export class UsersService {
    async getUsers() {
        const response = await axiosInstance.get<User[]>(`/usuarios`, { withCredentials: true });
        return response.data;
    }
}