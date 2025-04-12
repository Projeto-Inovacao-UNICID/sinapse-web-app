import { axiosInstance } from "./api";

export class LoginService {
    async loginService(tipo: string, email: string, password: string) {
        const response = await axiosInstance.post(`/auth/login`, { tipo, email, password });
        return response.data;
    }
  }