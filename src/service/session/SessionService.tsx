import { axiosInstance } from "../api";
import { SessionResponse } from "@/types";

export class SessionService {
    async getSession() {
        const response = await axiosInstance.get<SessionResponse>("/session", { withCredentials: true });
        return response.data;
    }
}