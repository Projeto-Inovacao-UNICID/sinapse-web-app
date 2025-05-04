import { axiosInstance } from "../api";

export class LoginService {
    async loginService(tipo: string, username: string, senha: string) {
        const response = await axiosInstance.post(`/auth/login`, { tipo, username, senha }, { withCredentials: true });
        return response.status;
    }
  }