import { UserDto } from "@/types";
import { axiosInstance } from "../api";

export class UsersService {
    async getUsers() {
        const response = await axiosInstance.get<UserDto[]>(`/usuarios`, { withCredentials: true });
        return response.data;
    }
}