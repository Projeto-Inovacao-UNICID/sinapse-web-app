import { axiosInstance } from "../api";
import type { RegisterDto, LoginDto } from "@/types";

export class RegisterService {
    async registerService(dto: RegisterDto): Promise<number> {
        const response = await axiosInstance.post(`/auth/registrar`, dto);
        return response.status;
    }
}

export class LoginService {
    async loginService(dto: LoginDto): Promise<number> {
        const response = await axiosInstance.post(`/auth/login`, dto, { withCredentials: true });
        return response.status;
    }
}
